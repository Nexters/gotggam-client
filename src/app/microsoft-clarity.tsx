import Script from "next/script";

const PROJECT_ID = "y5wk998k18";

/**
 * Microsoft Clarity 행태 분석 태그. 로컬 개발 세션이 리플레이·히트맵에 섞이지
 * 않도록 프로덕션 빌드에서만 심는다.
 */
export function MicrosoftClarity() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  // 태그 파일이 첫 줄부터 window.clarity 를 호출하므로, 큐 스텁을 만드는 공식
  // 스니펫을 그대로 둔다. 태그 URL만 로드하면 TypeError 로 죽는다.
  // id 를 "clarity" 로 주면 그 script 엘리먼트가 window.clarity 를 선점해
  // 스텁이 설치되지 않으니(DOM clobbering) 다른 이름을 쓴다.
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${PROJECT_ID}");`}
    </Script>
  );
}
