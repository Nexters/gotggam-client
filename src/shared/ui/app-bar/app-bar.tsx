import Link from "next/link";

import * as styles from "./app-bar.css";
import { IconButton, IconButtonBack, IconButtonHome } from "..";

type AppBarProps = {
  /** 생략하면 뒤로 가기 버튼 자리를 비워두고 레이아웃만 유지한다. */
  onBack?: () => void;
};

export function AppBar({ onBack }: AppBarProps) {
  return (
    <div className={styles.appBar}>
      {onBack ? (
        <IconButton aria-label="뒤로 가기" onClick={onBack}>
          <IconButtonBack />
        </IconButton>
      ) : (
        <span className={styles.spacer} />
      )}
      <Link href="/" aria-label="홈으로" className={styles.homeLink}>
        <IconButtonHome />
      </Link>
    </div>
  );
}
