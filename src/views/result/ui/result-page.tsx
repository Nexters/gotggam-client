"use client";

import { ErrorBoundary, Suspense } from "@suspensive/react";
import {
  useQuery,
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { toFaceSelection } from "@/entities/character";
import { resultQueries } from "@/entities/result";
import { termsQueries } from "@/entities/terms";
import type { FormValues } from "@/features/form";
import { ApiError } from "@/shared/api";
import { cn } from "@/shared/lib";
import { Typography } from "@/shared/ui";
import {
  GOTGGAM_WITH_CHARACTER_SRC,
  GotggamDialogue,
  SpotlightBackdrop,
} from "@/widgets/gotggam-dialogue";

import { copyTextToClipboard } from "../lib/copy-text";
import {
  renderLedgerImages,
  saveLedgerImageFiles,
} from "../lib/save-ledger-images";
import {
  buildMockLedgerResult,
  buildSurveyResultRequest,
  pickRandomLedgerVariant,
  toLedgerResult,
  type LedgerVariant,
} from "../model/ledger";
import { LedgerCard } from "./ledger-card";
import { LedgerDrawer } from "./ledger-drawer";
import { DRAWER_PEEK } from "./ledger-drawer.css";
import { LedgerMenu, type LedgerMenuAction } from "./ledger-menu";
import { LedgerPreviewModal } from "./ledger-preview-modal";
import { LinkCopiedModal } from "./link-copied-modal";
import * as styles from "./result-page.css";
import { useCardFlip } from "./use-card-flip";

const INTRO_LINES = [
  "확인 끝났다냥!",
  "아직은 때가 아니지만, 네 명부는 확실히 만들어 줬다냥.",
  "대신 오늘의 기록은 명부에 남겨줬다냥.",
];

const ENDING_LINES = ["다시 올 때까지 잘 참고해서 운명을 바꿔보라냥!"];

const SUBMIT_PENDING_LINES = ["명부를 확인하는 중이다냥.."];

const SUBMIT_ERROR_LINES = [
  "명부를 불러오지 못했다냥.. 다시 한번 확인해보겠냥.",
];

// 카드가 뜬 뒤 바텀시트가 저절로 올라오기까지의 시간
const SHEET_AUTO_OPEN_MS = 3000;

// 힌트 줄 높이 + 카드와의 간격 — 카드 스테이지 세로 가운데 정렬 계산에 쓴다.
const HINT_BLOCK_HEIGHT = 50;

// Figma [card_drawer]: 시트 닫힘 300px / 열림 220px, 카드 원본 252px.
// 좁거나 낮은 화면에서는 카드가 힌트·시트와 겹치지 않도록 상한을 낮춘다.
// stageTop은 힌트+카드 묶음을 시트(peek) 위 공간에 가운데 정렬하는 상단 여백.
function getCardScales() {
  if (typeof window === "undefined") {
    return { closed: 300 / 252, open: 220 / 252, stageTop: 116 };
  }
  const { innerWidth: width, innerHeight: height } = window;
  const closed = Math.min(300 / 252, (width - 40) / 252, (height - 224) / 441);
  const open = Math.min(220 / 252, (width - 40) / 252, (height - 400) / 441);
  const cardVisualHeight = closed * 441;
  const stageTop = Math.max(
    24,
    (height - DRAWER_PEEK - HINT_BLOCK_HEIGHT - cardVisualHeight) / 2,
  );
  return { closed, open, stageTop };
}

type ResultStep = "intro" | "card" | "ending";

// 약관 버전 조회가 실패하면 제출 자체가 불가능하므로 페이지 단위로 막고 재시도한다.
// 정상 흐름에선 동의 화면에서 이미 받아 캐시돼 있어 추가 요청 없이 통과한다.
export function ResultPage() {
  const { reset: resetQueryErrors } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      shouldCatch={ApiError.isApiError}
      onReset={resetQueryErrors}
      fallback={({ reset }) => (
        <div className={styles.page}>
          <SpotlightBackdrop />
          <GotggamDialogue
            lines={SUBMIT_ERROR_LINES}
            characterSrc={GOTGGAM_WITH_CHARACTER_SRC}
            onComplete={reset}
          />
        </div>
      )}
    >
      <Suspense
        clientOnly
        fallback={
          <div className={styles.page}>
            <SpotlightBackdrop />
          </div>
        }
      >
        <ResultContent />
      </Suspense>
    </ErrorBoundary>
  );
}

function ResultContent() {
  const router = useRouter();
  const { getValues } = useFormContext<FormValues>();
  const [step, setStep] = useState<ResultStep>("intro");
  const [isLeaving, setIsLeaving] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [variant] = useState<LedgerVariant>(() => pickRandomLedgerVariant());

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetDragProgress, setSheetDragProgress] = useState<number | null>(
    null,
  );
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState<{
    files: File[];
    urls: string[];
  } | null>(null);
  const [cardScales, setCardScales] = useState(() => getCardScales());
  const hasSheetInteractedRef = useRef(false);

  const { data: termsDocuments } = useSuspenseQuery(termsQueries.documents());

  // 폼이 완성돼 있으면 제출 요청을, 아니면(개발 중 직접 진입) 목업을 쓴다.
  const [request] = useState(() =>
    buildSurveyResultRequest(getValues(), termsDocuments),
  );
  const [mockLedger] = useState(() =>
    request ? null : buildMockLedgerResult(getValues()),
  );
  const [mockFace] = useState(() => getValues("face"));

  // 인트로 대사가 나가는 동안 백그라운드로 제출된다 (resultQueries.submission 참고).
  const {
    data: surveyResult,
    isError: isSubmitError,
    refetch: retrySubmit,
  } = useQuery({
    ...resultQueries.submission(request),
    enabled: request !== null,
  });

  // TODO: 공유 조회 API가 생기면 surveyResult.resultId / shareToken 링크로 교체한다.
  const ledger = surveyResult ? toLedgerResult(surveyResult) : mockLedger;
  const face = surveyResult
    ? toFaceSelection(surveyResult.character)
    : mockFace;

  const cardFlip = useCardFlip();
  const isCardPhase = step === "card";
  const isCardVisible = isCardPhase && !!ledger && !!face;

  // 카드가 뜨고 3초 뒤, 사용자가 먼저 시트를 만지지 않았다면 자동으로 올린다.
  useEffect(() => {
    if (!isCardVisible) {
      return;
    }
    const timerId = window.setTimeout(() => {
      if (!hasSheetInteractedRef.current) {
        setIsSheetOpen(true);
      }
    }, SHEET_AUTO_OPEN_MS);
    return () => window.clearTimeout(timerId);
  }, [isCardVisible]);

  useEffect(() => {
    const handleResize = () => setCardScales(getCardScales());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSheetOpenChange = (nextOpen: boolean) => {
    hasSheetInteractedRef.current = true;
    setSheetDragProgress(null);
    setIsSheetOpen(nextOpen);
  };

  const handleSheetDragProgress = (progress: number | null) => {
    hasSheetInteractedRef.current = true;
    setSheetDragProgress(progress);
  };

  const handleMenuSelect = (action: LedgerMenuAction) => {
    if (action === "finish") {
      // 선택 깜빡임 연출이 끝난 뒤 엔딩으로 넘어간다.
      window.setTimeout(() => setStep("ending"), 400);
      return;
    }

    if (action === "share") {
      // TODO: 공유 조회 API 연동 시 개인 결과 링크로 교체한다. 지금은 서비스 링크.
      copyTextToClipboard(window.location.origin).then((isCopied) => {
        if (isCopied) {
          setIsShareModalOpen(true);
        }
      });
      return;
    }

    if (action === "save" && ledger && face && !isSaving && !previewImages) {
      // 명부 앞/뒷장을 600×1050 PNG 두 장으로 만들어 미리보기부터 띄운다.
      setIsSaving(true);
      renderLedgerImages({ result: ledger, face, variant })
        .then((files) => {
          setPreviewImages({
            files,
            urls: files.map((file) => URL.createObjectURL(file)),
          });
        })
        .catch((error) => console.error("명부 저장 실패:", error))
        .finally(() => setIsSaving(false));
    }
  };

  const closePreview = () => {
    previewImages?.urls.forEach((url) => URL.revokeObjectURL(url));
    setPreviewImages(null);
  };

  // 엔딩 대사를 탭하면 그 자리에서 화면만 깜빡이며 암전하고 홈으로 돌아간다.
  // (페이지를 옮기면 캐릭터 크기·위치가 튄다)
  const handleEndingComplete = () => {
    if (isLeaving) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.replace("/");
      return;
    }
    setIsLeaving(true);
  };

  const sheetProgress = sheetDragProgress ?? (isSheetOpen ? 1 : 0);
  const cardScale =
    cardScales.closed + (cardScales.open - cardScales.closed) * sheetProgress;
  // 시트가 열리면 가운데 정렬돼 있던 카드 묶음을 화면 위쪽(힌트 y≈24)까지 올린다.
  const stageShift = Math.max(0, cardScales.stageTop - 24) * sheetProgress;

  return (
    <div className={styles.page}>
      {(step === "intro" || (isCardPhase && !ledger)) && <SpotlightBackdrop />}
      {step === "ending" && (
        <div className={styles.endingBackground}>
          <Image
            src="/images/result/ending-bg.png"
            alt=""
            fill
            unoptimized
            sizes="(min-width: 480px) 480px, 100vw"
            className={styles.endingBackgroundImage}
          />
        </div>
      )}
      {step === "intro" && (
        <GotggamDialogue
          lines={INTRO_LINES}
          characterSrc={GOTGGAM_WITH_CHARACTER_SRC}
          onComplete={() => setStep("card")}
        />
      )}
      {isCardPhase &&
        !ledger &&
        (isSubmitError ? (
          <GotggamDialogue
            key="submit-error"
            lines={SUBMIT_ERROR_LINES}
            characterSrc={GOTGGAM_WITH_CHARACTER_SRC}
            onComplete={() => retrySubmit()}
          />
        ) : (
          <GotggamDialogue
            key="submit-pending"
            lines={SUBMIT_PENDING_LINES}
            characterSrc={GOTGGAM_WITH_CHARACTER_SRC}
          />
        ))}
      {isCardVisible && ledger && face && (
        <>
          <div
            className={cn(
              styles.cardStage,
              sheetDragProgress !== null && styles.cardStageDragging,
            )}
            style={{
              paddingTop: cardScales.stageTop,
              transform: `translateY(${-stageShift}px)`,
            }}
          >
            <button
              type="button"
              className={styles.flipHint}
              onClick={cardFlip.flip}
            >
              <Typography family="galmuri9" size="14" color="gray-11">
                {"<카드를 돌려서 뒷면을 확인하라냥!>"}
              </Typography>
            </button>
            <div
              className={cn(
                styles.cardScaleBox,
                sheetDragProgress !== null && styles.cardScaleBoxDragging,
              )}
              style={{ transform: `scale(${cardScale})` }}
            >
              <LedgerCard
                result={ledger}
                face={face}
                variant={variant}
                rotation={cardFlip.rotation}
                isDragging={cardFlip.isDragging}
                interactive
                handlers={cardFlip.handlers}
                className={styles.card}
              />
            </div>
          </div>
          <LedgerDrawer
            isOpen={isSheetOpen}
            onOpenChange={handleSheetOpenChange}
            onDragProgress={handleSheetDragProgress}
          >
            <LedgerMenu onSelect={handleMenuSelect} />
          </LedgerDrawer>
        </>
      )}
      {step === "ending" && (
        <GotggamDialogue
          lines={ENDING_LINES}
          characterSrc={GOTGGAM_WITH_CHARACTER_SRC}
          onComplete={handleEndingComplete}
        />
      )}
      {previewImages && (
        <LedgerPreviewModal
          imageUrls={previewImages.urls}
          onSave={() => {
            saveLedgerImageFiles(previewImages.files).catch((error) =>
              console.error("명부 저장 실패:", error),
            );
          }}
          onClose={closePreview}
        />
      )}
      {isShareModalOpen && (
        <LinkCopiedModal onClose={() => setIsShareModalOpen(false)} />
      )}
      {isLeaving && (
        <div
          className={styles.blackout}
          onAnimationEnd={() => router.replace("/")}
        />
      )}
    </div>
  );
}
