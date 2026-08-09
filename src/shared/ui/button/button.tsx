import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib";

import * as styles from "./button.css";
import { getTypographyClassName } from "@/shared/styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(getTypographyClassName({ family: 'spoqa', size: "14", weight: 'semibold' }), styles.button, className)}
      {...props}
    />
  );
}
