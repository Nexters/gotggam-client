import { NextResponse } from "next/server";

import { fetchTermsDocumentsFromNotion } from "@/entities/terms/api/notion-terms";

export async function GET() {
  return NextResponse.json(await fetchTermsDocumentsFromNotion());
}
