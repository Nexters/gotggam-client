import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import "@/shared/styles/global.css";

import * as styles from "./layout.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "death-client",
  description: "death-client 웹 애플리케이션",
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
