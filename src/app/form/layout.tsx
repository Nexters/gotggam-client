"use client";

import { type ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FORM_DEFAULT_VALUES, type FormValues } from "@/features/form";

// /form 하위 페이지들이 클라이언트 내비게이션 동안 같은 폼 인스턴스를 공유한다.
export default function FormLayout({ children }: { children: ReactNode }) {
  const methods = useForm<FormValues>({ defaultValues: FORM_DEFAULT_VALUES });
  return <FormProvider {...methods}>{children}</FormProvider>;
}
