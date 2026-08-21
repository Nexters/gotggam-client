import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { type ReactNode } from "react";

import { termsQueries } from "@/entities/terms";
import { fetchTermsDocumentsFromNotion } from "@/entities/terms/api/notion-terms";
import { getServerQueryClient } from "@/shared/api/server-query-client";

import { FormProvider } from "./form-provider";

export const revalidate = 3600;

export default async function FormLayout({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = getServerQueryClient();

  await queryClient.prefetchQuery({
    ...termsQueries.documents(),
    queryFn: () => fetchTermsDocumentsFromNotion(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FormProvider>{children}</FormProvider>
    </HydrationBoundary>
  );
}
