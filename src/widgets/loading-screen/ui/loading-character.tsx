"use client";

import { Lottie } from "@/shared/ui";

import * as styles from "./loading-character.css";

export function LoadingCharacter() {
  return (
    <Lottie
      autoplay
      loop
      src="/lottie/loading_01.lottie"
      className={styles.character}
    />
  );
}
