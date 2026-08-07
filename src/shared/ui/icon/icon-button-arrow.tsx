import type { SVGProps } from "react";

import ButtonArrowSvg from "./assets/button-arrow.svg";
import * as styles from "./icon.css";

type IconProps = SVGProps<SVGSVGElement>;

// button-arrow.svg 원본이 왼쪽 방향
function ArrowRight({ className, ...props }: IconProps) {
  const mergedClassName = className
    ? `${styles.arrowRight} ${className}`
    : styles.arrowRight;

  return <ButtonArrowSvg className={mergedClassName} {...props} />;
}

export const IconButtonArrow = {
  Left: ButtonArrowSvg,
  Right: ArrowRight,
};
