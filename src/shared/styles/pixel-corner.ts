/** 계단형 모서리 한 칸의 크기(px)를 받아 픽셀 코너 polygon 좌표를 만든다. 모서리는 2칸(2 * step)만큼 잘려나간다. */
export function getPixelCornerClipPath(step: number) {
  const s1 = `${step}px`;
  const s2 = `${step * 2}px`;

  return [
    `0 ${s2}`,
    `${s1} ${s2}`,
    `${s1} ${s1}`,
    `${s2} ${s1}`,
    `${s2} 0`,
    `calc(100% - ${s2}) 0`,
    `calc(100% - ${s2}) ${s1}`,
    `calc(100% - ${s1}) ${s1}`,
    `calc(100% - ${s1}) ${s2}`,
    `100% ${s2}`,
    `100% calc(100% - ${s2})`,
    `calc(100% - ${s1}) calc(100% - ${s2})`,
    `calc(100% - ${s1}) calc(100% - ${s1})`,
    `calc(100% - ${s2}) calc(100% - ${s1})`,
    `calc(100% - ${s2}) 100%`,
    `${s2} 100%`,
    `${s2} calc(100% - ${s1})`,
    `${s1} calc(100% - ${s1})`,
    `${s1} calc(100% - ${s2})`,
    `0 calc(100% - ${s2})`,
  ].join(", ");
}
