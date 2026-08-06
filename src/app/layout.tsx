import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@/shared/styles/global.css";

import * as styles from "./layout.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "death-client",
  description: "death-client 웹 애플리케이션",
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
      </body>
    </html>
  );
}
