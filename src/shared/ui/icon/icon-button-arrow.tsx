import type { SVGProps } from "react";

import { cn } from "@/shared/lib";

import ButtonArrowSvg from "./assets/button-arrow.svg";
import * as styles from "./icon.css";

type IconProps = SVGProps<SVGSVGElement>;

// button-arrow.svg 원본이 왼쪽 방향
function ArrowRight({ className, ...props }: IconProps) {
  return <ButtonArrowSvg className={cn(styles.arrowRight, className)} {...props} />;
}

export const IconButtonArrow = {
  Left: ButtonArrowSvg,
  Right: ArrowRight,
};
