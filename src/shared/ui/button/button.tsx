import type { ButtonHTMLAttributes } from "react";

import * as styles from "./button.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, type = "button", ...props }: ButtonProps) {
  const mergedClassName = className
    ? `${styles.button} ${className}`
    : styles.button;

  return <button type={type} className={mergedClassName} {...props} />;
}
