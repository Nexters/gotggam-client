import "server-only";

import { serverEnv } from "@/shared/config/server-env";

import {
  TERMS_DOCUMENT_IDS,
  type TermsDocument,
  type TermsDocumentId,
} from "../model/documents";

const NOTION_API_URL = "https://api.notion.com/v1";
const NOTION_VERSION = "2025-09-03";

// 프로덕션은 1시간 캐시로 노션 rate limit(초당 3회)을 피하고, 개발 중엔 노션 수정이 즉시 보이게 한다.
const REVALIDATE_SECONDS =
  process.env.NODE_ENV === "development" ? 0 : 3600;

type NotionRichText = { plain_text: string };

type NotionPage = {
  id: string;
  properties: Record<string, { rich_text?: NotionRichText[] }>;
};

type NotionBlock = {
  type: string;
  code?: { rich_text: NotionRichText[] };
};

async function notionFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${NOTION_API_URL}${path}`, {
    ...init,
    next: { revalidate: REVALIDATE_SECONDS },
    headers: {
      Authorization: `Bearer ${serverEnv.notionApiKey}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`노션 API 호출 실패 (${path}): HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function readRichText(richText: NotionRichText[] | undefined): string {
  return (richText ?? []).map((text) => text.plain_text).join("");
}

/**
 * 노션 "약관" DB에서 약관 문서 전체를 읽는다. 각 행은 `slug`(문서 식별자)와
 * `version` 속성을 갖고, 본문 마크다운은 페이지의 첫 코드 블록에 통짜로 들어 있다.
 */
export async function fetchTermsDocumentsFromNotion(): Promise<
  Record<TermsDocumentId, TermsDocument>
> {
  const { results: pages } = await notionFetch<{ results: NotionPage[] }>(
    `/data_sources/${serverEnv.notionTermsDataSourceId}/query`,
    { method: "POST" },
  );

  const entries = await Promise.all(
    TERMS_DOCUMENT_IDS.map(async (documentId) => {
      const page = pages.find(
        (candidate) =>
          readRichText(candidate.properties.slug?.rich_text) === documentId,
      );

      if (!page) {
        throw new Error(`노션 약관 DB에 slug "${documentId}" 행이 없습니다.`);
      }

      const version = readRichText(page.properties.version?.rich_text);

      if (!version) {
        throw new Error(`노션 약관 "${documentId}" 의 version 이 비어 있습니다.`);
      }

      const { results: blocks } = await notionFetch<{ results: NotionBlock[] }>(
        `/blocks/${page.id}/children?page_size=100`,
      );

      const markdown = readRichText(
        blocks.find((block) => block.type === "code")?.code?.rich_text,
      );

      if (!markdown) {
        throw new Error(
          `노션 약관 "${documentId}" 페이지에서 본문 코드 블록을 찾지 못했습니다.`,
        );
      }

      return [documentId, { version, markdown }] as const;
    }),
  );

  return Object.fromEntries(entries) as Record<TermsDocumentId, TermsDocument>;
}
