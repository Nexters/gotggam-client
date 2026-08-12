"use client";

import { Lottie } from "@/shared/ui";

import * as styles from "./character.css";

export function Character() {
  return (
    <Lottie
      autoplay
      loop
      src="/lottie/question_normal.lottie"
      className={styles.character}
    />
  );
}
