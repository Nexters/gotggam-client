import * as styles from "./spotlight-backdrop.css";

/** 곧감이 등장 씬 뒤에 깔리는 보라색 스포트라이트. 부모가 position 기준이 되어야 한다. */
export function SpotlightBackdrop() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.beam} />
    </div>
  );
}
