import Image from "next/image";

import { CharacterFace, type FaceSelection } from "@/entities/character";
import { cn } from "@/shared/lib";

import type { LedgerResult } from "../model/ledger";
import * as styles from "./ledger-card.css";

const FRAME_LAYER_SRCS = [
  "/images/result/ledger-front-1.png",
  "/images/result/ledger-front-2.png",
  "/images/result/ledger-front-3.png",
];

const GENDER_MARKS: Record<string, string> = {
  남성: "男",
  여성: "女",
};

type LedgerCardProps = {
  result: LedgerResult;
  face: FaceSelection;
  className?: string;
};

/** 명부 카드 앞면. */
export function LedgerCard({ result, face, className }: LedgerCardProps) {
  const genderMark = GENDER_MARKS[result.gender];
  const birthText = genderMark
    ? `${result.birthDate} (${genderMark})`
    : result.birthDate;

  return (
    <div className={cn(styles.card, className)}>
      {FRAME_LAYER_SRCS.map((src) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          unoptimized
          className={styles.frameLayer}
        />
      ))}
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
      <span className={styles.commentValue}>{result.todayComment}</span>
      <span className={styles.warningLabel}>WARNING</span>
      <span className={styles.warningValue}>{result.warning}</span>
      <span className={styles.footer}>Too Early to Go.</span>
    </div>
  );
}
