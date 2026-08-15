"use client";

import {
  FACE_BODY_IMAGE_SRC,
  FACE_PART_CATEGORIES,
  getFacePartImageSrc,
  type FaceSelection,
} from "@/entities/character";

import {
  getLedgerCardImageSrc,
  type LedgerResult,
  type LedgerVariant,
} from "../model/ledger";

/**
 * 명부 앞/뒷장을 600×1050 PNG 두 장으로 저장한다.
 *
 * DOM 캡처(html-to-image 등)는 모바일 사파리에서 폰트·이미지가 누락되는 일이
 * 잦아, 카드와 같은 스펙(ledger-card.css.ts의 252 스케일 × 600/252)으로
 * 캔버스에 직접 그린다. 터치 기기는 공유 시트(사진 저장 가능), 그 외는
 * 파일 다운로드로 저장한다.
 */

const EXPORT_WIDTH = 600;
const EXPORT_HEIGHT = 1050;
// ledger-card.css.ts 좌표(카드 252px 기준) → 내보내기(600px) 배율
const SCALE = EXPORT_WIDTH / 252;

const FRONT_LABEL_COLOR = "#d8c5ef";
const BACK_LABEL_COLOR = "#d6c0ff";
const WHITE = "#ffffff";

const GENDER_MARKS: Record<string, string> = {
  MALE: "男",
  FEMALE: "女",
};

type Ctx = CanvasRenderingContext2D;

const imageCache = new Map<string, Promise<HTMLImageElement>>();

function loadImage(src: string) {
  let cached = imageCache.get(src);
  if (!cached) {
    cached = new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () =>
        reject(new Error(`이미지를 불러오지 못했습니다: ${src}`));
      image.src = src;
    });
    imageCache.set(src, cached);
  }
  return cached;
}

async function ensureFontsLoaded() {
  const fonts = [
    `400 ${13.4 * SCALE}px Galmuri9`,
    `400 ${13.4 * SCALE}px Galmuri11`,
    `700 ${13.4 * SCALE}px Galmuri11`,
  ];
  await Promise.all(fonts.map((font) => document.fonts.load(font)));
  await document.fonts.ready;
}

type TextSpec = {
  text: string;
  /** 카드(252px) 기준 좌표·크기 — ledger-card.css.ts와 동일 값 */
  x: number;
  top: number;
  fontSize: number;
  lineHeight: number;
  color: string;
  family?: "Galmuri9" | "Galmuri11";
  weight?: 400 | 700;
  align?: CanvasTextAlign;
  letterSpacing?: number;
};

function setFont(
  ctx: Ctx,
  fontSize: number,
  family: string,
  weight: number,
  letterSpacing?: number,
) {
  ctx.font = `${weight} ${fontSize * SCALE}px ${family}, Galmuri11, sans-serif`;
  if ("letterSpacing" in ctx) {
    ctx.letterSpacing = `${(letterSpacing ?? 0) * SCALE}px`;
  }
}

/** CSS의 line-height 박스처럼, 줄 상자 상단 기준으로 글리프 시작 y를 계산한다. */
function lineTopOffset(fontSize: number, lineHeight: number) {
  return (fontSize * (lineHeight - 1)) / 2;
}

function drawTextLine(ctx: Ctx, spec: TextSpec) {
  const {
    text,
    x,
    top,
    fontSize,
    lineHeight,
    color,
    family = "Galmuri9",
    weight = 400,
    align = "left",
    letterSpacing,
  } = spec;

  setFont(ctx, fontSize, family, weight, letterSpacing);
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "top";
  ctx.fillText(
    text,
    x * SCALE,
    (top + lineTopOffset(fontSize, lineHeight)) * SCALE,
  );
}

/** 글자 단위 greedy 줄바꿈 (공백 위치 우선). 브라우저의 한글 줄바꿈과 근사. */
function wrapText(ctx: Ctx, text: string, maxWidthPx: number): string[] {
  const lines: string[] = [];
  let line = "";
  let lastSpaceIndex = -1;

  for (const char of text) {
    const candidate = line + char;
    if (ctx.measureText(candidate).width <= maxWidthPx || line.length === 0) {
      line = candidate;
      if (char === " ") {
        lastSpaceIndex = line.length - 1;
      }
      continue;
    }

    if (char !== " " && lastSpaceIndex > 0) {
      lines.push(line.slice(0, lastSpaceIndex));
      line = line.slice(lastSpaceIndex + 1) + char;
    } else {
      lines.push(line);
      line = char === " " ? "" : char;
    }
    lastSpaceIndex = line.lastIndexOf(" ");
  }

  if (line.trim().length > 0) {
    lines.push(line);
  }
  return lines;
}

type FitBoxSpec = {
  text: string;
  x: number;
  top: number;
  width: number;
  height: number;
  maxFontSize: number;
  minFontSize?: number;
  lineHeight: number;
  color: string;
  family?: "Galmuri9" | "Galmuri11";
  align?: "left" | "center";
  letterSpacing?: number;
};

/** FitText와 동일하게, 박스에 들어갈 때까지 폰트를 줄여가며 여러 줄로 그린다. */
function drawFitText(ctx: Ctx, spec: FitBoxSpec) {
  const {
    text,
    x,
    top,
    width,
    height,
    maxFontSize,
    minFontSize = 7,
    lineHeight,
    color,
    family = "Galmuri9",
    align = "left",
    letterSpacing,
  } = spec;

  let fontSize = maxFontSize;
  let lines: string[] = [];

  for (; fontSize >= minFontSize; fontSize -= 0.5) {
    setFont(ctx, fontSize, family, 400, letterSpacing);
    lines = wrapText(ctx, text, width * SCALE);
    if (lines.length * fontSize * lineHeight <= height) {
      break;
    }
  }

  ctx.save();
  // 최소 폰트로도 넘치는 극단 입력이 와도 박스(칸) 밖으로는 그리지 않는다.
  ctx.beginPath();
  ctx.rect(x * SCALE, top * SCALE, width * SCALE, height * SCALE);
  ctx.clip();

  ctx.fillStyle = color;
  ctx.textAlign = align === "center" ? "center" : "left";
  ctx.textBaseline = "top";

  const drawX = (align === "center" ? x + width / 2 : x) * SCALE;
  lines.forEach((line, index) => {
    const lineTop =
      top + index * fontSize * lineHeight + lineTopOffset(fontSize, lineHeight);
    ctx.fillText(line, drawX, lineTop * SCALE);
  });
  ctx.restore();
}

/** 한 칸짜리 픽셀 코너 클리핑 패스 (카드 252 기준 step 2px = 프로필 마스크와 동일). */
function clipPixelCorner(
  ctx: Ctx,
  x: number,
  y: number,
  width: number,
  height: number,
  step: number,
) {
  const [px, py, pw, ph, s] = [x, y, width, height, step].map(
    (value) => value * SCALE,
  );
  ctx.beginPath();
  ctx.moveTo(px, py + s);
  ctx.lineTo(px + s, py + s);
  ctx.lineTo(px + s, py);
  ctx.lineTo(px + pw - s, py);
  ctx.lineTo(px + pw - s, py + s);
  ctx.lineTo(px + pw, py + s);
  ctx.lineTo(px + pw, py + ph - s);
  ctx.lineTo(px + pw - s, py + ph - s);
  ctx.lineTo(px + pw - s, py + ph);
  ctx.lineTo(px + s, py + ph);
  ctx.lineTo(px + s, py + ph - s);
  ctx.lineTo(px, py + ph - s);
  ctx.closePath();
  ctx.clip();
}

async function drawFront(
  ctx: Ctx,
  result: LedgerResult,
  face: FaceSelection,
  variant: LedgerVariant,
) {
  const [frame, backdrop, body, ...parts] = await Promise.all([
    loadImage(getLedgerCardImageSrc(variant, "front")),
    loadImage("/images/result/profile-backdrop.jpg"),
    loadImage(FACE_BODY_IMAGE_SRC),
    ...FACE_PART_CATEGORIES.map((category) =>
      loadImage(getFacePartImageSrc(face[category])),
    ),
  ]);

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(frame, 0, 0, EXPORT_WIDTH, EXPORT_HEIGHT);

  // 프로필 — ledger-card.css.ts의 profile(19.7, 68.9, 98.3×110.5) 스펙
  const profile = { x: 19.7, y: 68.9, width: 98.3, height: 110.5 };
  ctx.save();
  clipPixelCorner(
    ctx,
    profile.x,
    profile.y,
    profile.width,
    profile.height,
    2,
  );

  // backdrop: object-fit cover / object-position 50% 0%
  const boxW = profile.width * SCALE;
  const boxH = profile.height * SCALE;
  const coverScale = Math.max(
    boxW / backdrop.naturalWidth,
    boxH / backdrop.naturalHeight,
  );
  const backdropW = backdrop.naturalWidth * coverScale;
  const backdropH = backdrop.naturalHeight * coverScale;
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(
    backdrop,
    profile.x * SCALE + (boxW - backdropW) / 2,
    profile.y * SCALE,
    backdropW,
    backdropH,
  );

  // 캐릭터 — profileFace(left 5.1%, width 89.7%, 캔버스 비율 240:300)
  ctx.imageSmoothingEnabled = false;
  const faceX = (profile.x + profile.width * 0.051) * SCALE;
  const faceW = profile.width * 0.897 * SCALE;
  const faceH = (faceW * 300) / 240;
  for (const layer of [body, ...parts]) {
    ctx.drawImage(layer, faceX, profile.y * SCALE, faceW, faceH);
  }
  ctx.restore();

  const genderMark = GENDER_MARKS[result.gender];
  const birthText = genderMark
    ? `${result.birthDate} (${genderMark})`
    : result.birthDate;

  drawTextLine(ctx, { text: "GOTGGAM", x: 126, top: 28, fontSize: 13.4, lineHeight: 1.5, color: WHITE, align: "center", letterSpacing: -0.15 });
  drawTextLine(ctx, { text: "NAME", x: 133.5, top: 72, fontSize: 10.1, lineHeight: 1.5, color: FRONT_LABEL_COLOR, family: "Galmuri11", weight: 700, letterSpacing: -0.11 });
  drawTextLine(ctx, { text: result.name, x: 133.5, top: 83.5, fontSize: 25.6, lineHeight: 1.6, color: WHITE, letterSpacing: -0.28 });
  drawTextLine(ctx, { text: "BIRTH", x: 133.5, top: 139, fontSize: 10.1, lineHeight: 1.5, color: FRONT_LABEL_COLOR, family: "Galmuri11", weight: 700, letterSpacing: -0.11 });
  drawTextLine(ctx, { text: birthText, x: 133.5, top: 158.3, fontSize: 13.9, lineHeight: 1.6, color: WHITE, letterSpacing: -0.15 });
  drawTextLine(ctx, { text: "예상수명", x: 50, top: 205, fontSize: 10.1, lineHeight: 1.2, color: FRONT_LABEL_COLOR, align: "center", letterSpacing: 1.2 });
  drawTextLine(ctx, { text: "오늘의 한 마디", x: 178, top: 204, fontSize: 10.1, lineHeight: 1.2, color: FRONT_LABEL_COLOR, align: "center", letterSpacing: 1.2 });
  drawTextLine(ctx, { text: "WARNING", x: 51, top: 314, fontSize: 10.1, lineHeight: 1.2, color: FRONT_LABEL_COLOR, align: "center", letterSpacing: 1.2 });
  drawTextLine(ctx, { text: "Too Early to Go.", x: 158.1, top: 403.6, fontSize: 8, lineHeight: 1.6, color: WHITE, align: "right", letterSpacing: -0.09 });

  // 예상수명 값 — "88"(Galmuri11 Bold) + "세"(Galmuri9)
  const ageTop = 225.5 + lineTopOffset(30.2, 1.2);
  setFont(ctx, 30.2, "Galmuri11", 700, 3);
  ctx.fillStyle = WHITE;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const ageNumber = String(result.expectedAge);
  ctx.fillText(ageNumber, 30.2 * SCALE, ageTop * SCALE);
  const ageNumberWidth = ctx.measureText(ageNumber).width;
  setFont(ctx, 30.2, "Galmuri9", 400, 3);
  ctx.fillText("세", 30.2 * SCALE + ageNumberWidth, ageTop * SCALE);

  drawFitText(ctx, { text: result.todayMessage, x: 130.8, top: 224.7, width: 100, height: 48, maxFontSize: 13.4, lineHeight: 1.6, color: WHITE, align: "center", letterSpacing: -0.15 });
  drawFitText(ctx, { text: result.warning, x: 26.9, top: 330.5, width: 198, height: 58, maxFontSize: 16.8, lineHeight: 1.6, color: WHITE, letterSpacing: -0.18 });
}

async function drawBack(
  ctx: Ctx,
  result: LedgerResult,
  variant: LedgerVariant,
) {
  const [frame, gaugeArea, gaugeBar, gaugeHeart] = await Promise.all([
    loadImage(getLedgerCardImageSrc(variant, "back")),
    loadImage("/images/result/ledger/gauge-area.png"),
    loadImage("/images/result/ledger/gauge-bar.png"),
    loadImage("/images/result/ledger/gauge-heart.png"),
  ]);

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(frame, 0, 0, EXPORT_WIDTH, EXPORT_HEIGHT);

  drawTextLine(ctx, { text: "GOTGGAM", x: 126, top: 28, fontSize: 13.4, lineHeight: 1.5, color: WHITE, align: "center", letterSpacing: -0.15 });
  drawTextLine(ctx, { text: "상세내역", x: 52.3, top: 60.5, fontSize: 10.1, lineHeight: 1.2, color: BACK_LABEL_COLOR, align: "center", letterSpacing: 1.2 });
  drawTextLine(ctx, { text: "특별준수사항", x: 62.4, top: 212.2, fontSize: 11.8, lineHeight: 1.2, color: BACK_LABEL_COLOR, align: "center", letterSpacing: 1.4 });
  drawTextLine(ctx, { text: "Too Early to Go.", x: 158.1, top: 403.6, fontSize: 8, lineHeight: 1.6, color: WHITE, align: "right", letterSpacing: -0.09 });

  // 상세내역 게이지 — ledger-card.css.ts detailRows(28.6, 84.4, w199, gap 15.1) 스펙.
  // 게이지 시작점은 카드와 같은 규칙(가장 긴 라벨 + columnGap 8)으로 모든 행 정렬.
  const rows = { x: 28.6, top: 84.4, width: 199, gaugeWidth: 112, gaugeHeight: 16.8, gap: 15.1 };
  setFont(ctx, 10.1, "Galmuri9", 400, 1.2);
  const maxLabelWidth = Math.max(
    ...result.details.map(
      (detail) => ctx.measureText(`${detail.category} :`).width,
    ),
  );
  result.details.forEach((detail, index) => {
    const rowTop = rows.top + index * (rows.gaugeHeight + rows.gap);
    const centerY = (rowTop + rows.gaugeHeight / 2) * SCALE;

    setFont(ctx, 10.1, "Galmuri9", 400, 1.2);
    ctx.fillStyle = WHITE;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const label = `${detail.category} :`;
    ctx.fillText(label, rows.x * SCALE, centerY);

    const gaugeX = rows.x * SCALE + maxLabelWidth + 8 * SCALE;
    const gaugeW = rows.gaugeWidth * SCALE;
    const gaugeH = rows.gaugeHeight * SCALE;
    ctx.drawImage(gaugeArea, gaugeX, rowTop * SCALE, gaugeW, gaugeH);

    // 채움량 — ledger-card.tsx getGaugeFillRatio와 동일한 임시 규칙
    const ratio = Math.max(
      1 - Math.min(Math.abs(Math.min(detail.years, 0)), 30) / 30,
      0.12,
    );
    ctx.save();
    ctx.beginPath();
    ctx.rect(gaugeX, rowTop * SCALE, gaugeW * ratio, gaugeH);
    ctx.clip();
    ctx.drawImage(gaugeBar, gaugeX, rowTop * SCALE, gaugeW, gaugeH);
    ctx.restore();
    ctx.drawImage(gaugeHeart, gaugeX, rowTop * SCALE, gaugeW, gaugeH);

    ctx.textAlign = "right";
    const years = detail.years > 0 ? `+${detail.years}년` : `${detail.years}년`;
    ctx.fillText(years, (rows.x + rows.width) * SCALE, centerY);
  });

  // 특별준수사항 불릿 리스트 — directives(19.7, 232, 213×150) 스펙
  const list = { x: 19.7, top: 232, width: 213, height: 150, indent: 20, itemGap: 6 };
  let fontSize = 13.4;
  let wrapped: string[][] = [];

  for (; fontSize >= 7; fontSize -= 0.5) {
    setFont(ctx, fontSize, "Galmuri11", 400, -0.15);
    wrapped = result.specialDirectives.map((directive) =>
      wrapText(ctx, directive, (list.width - list.indent) * SCALE),
    );
    const totalHeight =
      wrapped.reduce((sum, lines) => sum + lines.length, 0) *
        fontSize *
        1.6 +
      (wrapped.length - 1) * list.itemGap;
    if (totalHeight <= list.height) {
      break;
    }
  }

  ctx.fillStyle = WHITE;
  ctx.textBaseline = "top";
  let cursorTop = list.top;
  for (const lines of wrapped) {
    lines.forEach((line, lineIndex) => {
      const lineTop =
        cursorTop + lineTopOffset(fontSize, 1.6) + lineIndex * fontSize * 1.6;
      if (lineIndex === 0) {
        ctx.textAlign = "center";
        ctx.fillText(
          "•",
          (list.x + list.indent / 2) * SCALE,
          lineTop * SCALE,
        );
      }
      ctx.textAlign = "left";
      ctx.fillText(line, (list.x + list.indent) * SCALE, lineTop * SCALE);
    });
    cursorTop += lines.length * fontSize * 1.6 + list.itemGap;
  }
}

function createCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = EXPORT_WIDTH;
  canvas.height = EXPORT_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("캔버스 컨텍스트를 만들 수 없습니다.");
  }
  return { canvas, ctx };
}

function toBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("이미지 생성에 실패했습니다."));
      }
    }, "image/png");
  });
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

type SaveLedgerImagesOptions = {
  result: LedgerResult;
  face: FaceSelection;
  variant: LedgerVariant;
};

/** 명부 앞/뒷장을 PNG 두 장으로 저장한다. 터치 기기는 공유 시트, 그 외는 다운로드. */
export async function saveLedgerImages({
  result,
  face,
  variant,
}: SaveLedgerImagesOptions) {
  await ensureFontsLoaded();

  const front = createCanvas();
  const back = createCanvas();
  await drawFront(front.ctx, result, face, variant);
  await drawBack(back.ctx, result, variant);

  const [frontBlob, backBlob] = await Promise.all([
    toBlob(front.canvas),
    toBlob(back.canvas),
  ]);

  const files = [
    new File([frontBlob], "gotggam-ledger-front.png", { type: "image/png" }),
    new File([backBlob], "gotggam-ledger-back.png", { type: "image/png" }),
  ];

  // 터치 기기(모바일)는 공유 시트로 — '이미지 저장'으로 사진첩에 담을 수 있다.
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice && navigator.canShare?.({ files })) {
    try {
      await navigator.share({ files });
      return;
    } catch (error) {
      // 사용자가 시트를 닫은 경우는 그대로 끝낸다. 그 외 실패는 다운로드로 폴백.
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
    }
  }

  downloadBlob(frontBlob, files[0].name);
  downloadBlob(backBlob, files[1].name);
}
