import { internalHttpClient } from "@/shared/api";

import type { TermsDocument, TermsDocumentId } from "../model/documents";

type RequestOptions = { signal?: AbortSignal };

export function fetchTermsDocuments(
  options?: RequestOptions,
): Promise<Record<TermsDocumentId, TermsDocument>> {
  return internalHttpClient
    .get("/terms", options)
    .json<Record<TermsDocumentId, TermsDocument>>();
}
