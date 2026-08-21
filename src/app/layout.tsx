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
        {/* 로컬 개발 세션이 리플레이·히트맵에 섞이지 않도록 프로덕션 빌드에서만 심는다. */}
        {process.env.NODE_ENV === "production" && (
          // 태그 파일이 첫 줄부터 window.clarity 를 호출하므로, 큐 스텁을 만드는
          // 공식 스니펫을 그대로 둔다. 태그 URL만 로드하면 TypeError 로 죽는다.
          // id 를 "clarity" 로 주면 그 script 엘리먼트가 window.clarity 를 선점해
          // 스텁이 설치되지 않으니(DOM clobbering) 다른 이름을 쓴다.
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "y5wk998k18");`}
          </Script>
        )}
      </body>
    </html>
  );
}
