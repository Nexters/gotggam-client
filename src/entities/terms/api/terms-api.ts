import { ApiError } from "@/shared/api";
import { getLatestDocuments } from "@/shared/api/generated/consent-api/consent-api";
import type { ConsentDocumentResponseType } from "@/shared/api/generated/models";

import { TERMS_DOCUMENT_IDS, type TermsDocument, type TermsDocumentId } from "../model/documents";

type RequestOptions = { signal?: AbortSignal };

const DOCUMENT_TYPES: Record<TermsDocumentId, ConsentDocumentResponseType> = {
  "privacy-policy": "PRIVACY_POLICY",
  "terms-of-service": "TERMS_OF_SERVICE",
};

export async function fetchTermsDocuments(
  options?: RequestOptions,
): Promise<Record<TermsDocumentId, TermsDocument>> {
  const response = await getLatestDocuments(options);
  const entries = TERMS_DOCUMENT_IDS.map((id) => {
    const document = response.data.find((item) => item.type === DOCUMENT_TYPES[id]);

    if (!document?.version?.trim() || !document.content?.trim()) {
      throw new ApiError({
        code: "INVALID_RESPONSE",
        status: null,
        message: "약관 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.",
      });
    }

    return [id, { version: document.version, markdown: document.content }] as const;
  });

  return Object.fromEntries(entries) as Record<TermsDocumentId, TermsDocument>;
}
