import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/shared/styles/global.css";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "death-client",
  description: "death-client 웹 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
