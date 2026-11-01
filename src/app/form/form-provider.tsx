"use client";

import { type ReactNode } from "react";
import { FormProvider as HookFormProvider, useForm } from "react-hook-form";

import { FORM_DEFAULT_VALUES, type FormValues } from "@/features/form";

export function FormProvider({ children }: { children: ReactNode }) {
  const methods = useForm<FormValues>({ defaultValues: FORM_DEFAULT_VALUES });
  return <HookFormProvider {...methods}>{children}</HookFormProvider>;
}
