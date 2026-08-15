import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import "@/shared/styles/global.css";

import * as styles from "./layout.css";
import { Providers } from "./providers";

const SITE_TITLE = "곧감 - 고양이 사신의 수명 테스트";
const SITE_DESCRIPTION =
  "저승사자 고양이 곧감이가 하루 습관을 보고 예상 수명을 계산해준다냥. 간단한 테스트로 나만의 명부를 받아가라냥!";

export const metadata: Metadata = {
  metadataBase: new URL("https://gotggam.com"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "곧감",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "google-adsense-account": "ca-pub-5618775983696868",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#121212",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className={styles.shell}>
          <div className={styles.screen}>
            <Providers>{children}</Providers>
          </div>
        </div>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5618775983696868"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
