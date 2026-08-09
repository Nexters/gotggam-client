import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib";

import * as styles from "./icon-button.css";

// 아이콘만 있는 버튼은 스크린리더가 읽을 이름이 없으므로 aria-label을 강제한다.
type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  "aria-label": string;
};

export function IconButton({
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(styles.iconButton, className)}
      {...props}
    />
  );
}
