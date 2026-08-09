import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/lib";

import * as styles from "./button.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(styles.button, className)}
      {...props}
    />
  );
}
