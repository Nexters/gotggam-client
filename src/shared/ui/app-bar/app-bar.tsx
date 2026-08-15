import * as styles from "./app-bar.css";
import { IconButton, IconButtonBack } from "..";

type AppBarProps = {
  /** 생략하면 뒤로 가기 버튼 자리를 비워두고 레이아웃만 유지한다. */
  onBack?: () => void;
  /** 홈 버튼 노출 여부. 얼굴 확인 이후 화면은 디자인상 홈 버튼이 없다. */
  showHome?: boolean;
};

export function AppBar({ onBack, showHome = true }: AppBarProps) {
  return (
    <div className={styles.appBar}>
      {onBack ? (
        <IconButton aria-label="뒤로 가기" onClick={onBack}>
          <IconButtonBack />
        </IconButton>
      ) : (
        <span className={styles.spacer} />
      )}
    </div>
  );
}
