import Image from "next/image";

import { CharacterFace, type FaceSelection } from "@/entities/character";
import { cn } from "@/shared/lib";

import { FitText } from "./fit-text";
import {
  getLedgerCardImageSrc,
  type LedgerResult,
  type LedgerVariant,
} from "../model/ledger";
import * as styles from "./ledger-card.css";
import type { CardFlipHandlers } from "./use-card-flip";

const GENDER_MARKS: Record<string, string> = {
  남성: "男",
  여성: "女",
};

// TODO: 게이지 채움량(-n년 → %) 환산 규칙 기획 확정 필요. 임시로 30년 감소를 최저로 본다.
function getGaugeFillRatio(years: number) {
  const ratio = 1 - Math.min(Math.abs(Math.min(years, 0)), 30) / 30;
  return Math.max(ratio, 0.12);
}

function formatYears(years: number) {
  return years > 0 ? `+${years}년` : `${years}년`;
}

function LedgerCardFront({
  result,
  face,
  variant,
}: {
  result: LedgerResult;
  face: FaceSelection;
  variant: LedgerVariant;
}) {
  const genderMark = GENDER_MARKS[result.gender];
  const birthText = genderMark
    ? `${result.birthDate} (${genderMark})`
    : result.birthDate;

  return (
    <>
      <Image
        src={getLedgerCardImageSrc(variant, "front")}
        alt=""
        fill
        unoptimized
        className={styles.frameLayer}
      />
      <div className={styles.profile}>
        <Image
          src="/images/result/profile-backdrop.jpg"
          alt=""
          fill
          unoptimized
          className={styles.profileBackdrop}
        />
        <CharacterFace selection={face} className={styles.profileFace} />
      </div>
      <span className={styles.logo}>GOTGGAM</span>
      <span className={styles.nameLabel}>NAME</span>
      <span className={styles.nameValue}>{result.name}</span>
      <span className={styles.birthLabel}>BIRTH</span>
      <span className={styles.birthValue}>{birthText}</span>
      <span className={styles.ageLabel}>예상수명</span>
      <span className={styles.ageValue}>
        <span className={styles.ageNumber}>{result.expectedAge}</span>세
      </span>
      <span className={styles.commentLabel}>오늘의 한 마디</span>
      <FitText maxFontSize={13.4} className={styles.commentValue}>
        {result.todayComment}
      </FitText>
      <span className={styles.warningLabel}>WARNING</span>
      <FitText maxFontSize={16.8} className={styles.warningValue}>
        {result.warning}
      </FitText>
      <span className={styles.footer}>Too Early to Go.</span>
    </>
  );
}

function LedgerCardBack({
  result,
  variant,
}: {
  result: LedgerResult;
  variant: LedgerVariant;
}) {
  return (
    <>
      <Image
        src={getLedgerCardImageSrc(variant, "back")}
        alt=""
        fill
        unoptimized
        className={styles.frameLayer}
      />
      <span className={styles.logo}>GOTGGAM</span>
      <span className={styles.detailsLabel}>상세내역</span>
      <div className={styles.detailRows}>
        {result.details.map((detail) => (
          <div key={detail.category} className={styles.detailRow}>
            <span className={styles.detailCategory}>{detail.category} :</span>
            <span className={styles.gauge}>
              <Image
                src="/images/result/ledger/gauge-area.png"
                alt=""
                fill
                unoptimized
                className={styles.frameLayer}
              />
              <span
                className={styles.gaugeFill}
                style={{ width: `${getGaugeFillRatio(detail.years) * 100}%` }}
              >
                <Image
                  src="/images/result/ledger/gauge-bar.png"
                  alt=""
                  width={900}
                  height={135}
                  unoptimized
                  className={styles.gaugeBarImage}
                />
              </span>
              <Image
                src="/images/result/ledger/gauge-heart.png"
                alt=""
                fill
                unoptimized
                className={styles.frameLayer}
              />
            </span>
            <span className={styles.detailYears}>
              {formatYears(detail.years)}
            </span>
          </div>
        ))}
      </div>
      <span className={styles.directivesLabel}>특별준수사항</span>
      <FitText maxFontSize={13.4} className={styles.directives}>
        <ul className={styles.directiveList}>
          {result.specialDirectives.map((directive) => (
            <li key={directive} className={styles.directiveItem}>
              {directive}
            </li>
          ))}
        </ul>
      </FitText>
      <span className={styles.footer}>Too Early to Go.</span>
    </>
  );
}

type LedgerCardProps = {
  result: LedgerResult;
  face: FaceSelection;
  variant: LedgerVariant;
  /** 카드 회전 각도(deg). use-card-flip이 관리한다. */
  rotation: number;
  isDragging: boolean;
  /** 드래그·탭 뒤집기 허용 여부 (메뉴 스텝에서만 켠다) */
  interactive: boolean;
  handlers: CardFlipHandlers;
  className?: string;
};

/** 명부 카드. 앞/뒷면을 가진 3D 카드로, 드래그하거나 탭해서 돌려볼 수 있다. */
export function LedgerCard({
  result,
  face,
  variant,
  rotation,
  isDragging,
  interactive,
  handlers,
  className,
}: LedgerCardProps) {
  return (
    <div className={cn(styles.scene, className)}>
      <div
        className={cn(
          styles.card3d,
          isDragging && styles.card3dDragging,
          interactive && styles.card3dInteractive,
        )}
        style={{ transform: `rotateY(${rotation}deg)` }}
        {...(interactive ? handlers : {})}
      >
        <div className={styles.face}>
          <LedgerCardFront result={result} face={face} variant={variant} />
          <div className={styles.sheen} aria-hidden />
        </div>
        <div className={cn(styles.face, styles.backFace)}>
          <LedgerCardBack result={result} variant={variant} />
        </div>
      </div>
    </div>
  );
}
