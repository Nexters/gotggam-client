import { type ReactNode } from "react";

import { FormProvider } from "./form-provider";

export default function FormLayout({ children }: { children: ReactNode }) {
  return <FormProvider>{children}</FormProvider>;
}
