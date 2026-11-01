"use client";

import { type ComponentProps, useLayoutEffect, useRef } from "react";

type FitTextProps = ComponentProps<"div"> & {
  /** 디자인 기준 폰트 크기(px). 넘치면 여기서부터 줄여 나간다. */
  maxFontSize: number;
  minFontSize?: number;
};

/**
 * 고정 크기 박스 안에 텍스트가 들어가도록 폰트 크기를 자동으로 줄인다.
 * AI가 생성하는 가변 길이 문구(오늘의 한 마디, 경고문구, 준수사항)용.
 * `className` 은 박스 크기(width/height)만 지정한다. overflow는 컴포넌트가 관리한다.
 */
export function FitText({
  maxFontSize,
  minFontSize = 7,
  className,
  children,
  ...props
}: FitTextProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  // 렌더마다 다시 맞춘다(측정은 멱등이고 박스가 작아 비용이 미미하다).
  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!box) {
      return;
    }

    const fit = () => {
      let fontSize = maxFontSize;
      box.style.fontSize = `${fontSize}px`;
      while (
        fontSize > minFontSize &&
        (box.scrollHeight > box.clientHeight + 1 ||
          box.scrollWidth > box.clientWidth + 1)
      ) {
        fontSize -= 0.5;
        box.style.fontSize = `${fontSize}px`;
      }
    };

    fit();
    // 웹폰트가 늦게 로드되면 글자 폭이 달라지므로 다시 맞춘다. fonts.ready는
    // 폰트 요청 전에 이미 resolve됐을 수 있어, 이후 로드 완료(loadingdone)에도 반응한다.
    document.fonts?.ready.then(fit).catch(() => {});
    document.fonts?.addEventListener?.("loadingdone", fit);
    return () => document.fonts?.removeEventListener?.("loadingdone", fit);
  });

  return (
    <div ref={boxRef} className={className} {...props}>
      {children}
    </div>
  );
}
