import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import {
  getTypographyClassName,
  type TypographyClassNameOptions,
} from "@/shared/styles/typography";

type TypographyOwnProps<E extends ElementType> = TypographyClassNameOptions & {
  as?: E;
  children?: ReactNode;
};

type TypographyProps<E extends ElementType> = TypographyOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof TypographyOwnProps<E>>;

const defaultElement = "span";

export function Typography<E extends ElementType = typeof defaultElement>({
  as,
  family,
  size,
  weight,
  color,
  className,
  ...props
}: TypographyProps<E>) {
  const Component = as ?? defaultElement;

  return (
    <Component
      className={getTypographyClassName({ family, size, weight, color, className })}
      {...props}
    />
  );
}
