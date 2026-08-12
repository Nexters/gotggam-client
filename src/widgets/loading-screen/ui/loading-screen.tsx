"use client";

import { Typography } from "@/shared/ui";

import { LoadingCharacter } from "./loading-character";
import * as styles from "./loading-screen.css";

type LoadingScreenProps = {
  text: string;
};
export function LoadingScreen({ text }: LoadingScreenProps) {
  return (
    <div className={styles.screen}>
      <LoadingCharacter />
      <Typography as="p" family="galmuri9" size="22" color="white">
        {text}
      </Typography>
    </div>
  );
}
