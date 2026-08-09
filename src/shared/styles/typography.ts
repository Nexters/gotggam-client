import { cn } from "@/shared/lib";

import * as styles from "./typography.css";
import { vars } from "./theme.css";

export type FontFamilyToken = keyof typeof vars.font;
export type FontSizeToken = keyof typeof vars.fontSize;
export type FontWeightToken = keyof typeof vars.fontWeight;
export type ColorToken = keyof typeof styles.color;

export type TypographyClassNameOptions = {
  family: FontFamilyToken;
  size: FontSizeToken;
  weight?: FontWeightToken;
  color?: ColorToken;
  className?: string;
};

export function getTypographyClassName({
  family,
  size,
  weight = "regular",
  color,
  className,
}: TypographyClassNameOptions) {
  return cn(
    styles.base,
    styles.family[family],
    styles.size[size],
    styles.weight[weight],
    color && styles.color[color],
    className,
  );
}
