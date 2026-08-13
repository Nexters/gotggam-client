import type { InputHTMLAttributes } from "react";

import { cn } from "@/shared/lib";

import * as styles from "./input.css";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return <input className={cn(styles.input, className)} {...props} />;
}
