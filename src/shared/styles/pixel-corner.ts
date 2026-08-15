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

/** 모서리를 한 칸(size)만 정사각으로 도려낸 픽셀 코너 polygon 좌표. 계단이 2칸인 getPixelCornerClipPath보다 덜 깎여서 작은 요소에 쓴다. */
export function getPixelNotchClipPath(size: number) {
  const s = `${size}px`;

  return [
    `0 ${s}`,
    `${s} ${s}`,
    `${s} 0`,
    `calc(100% - ${s}) 0`,
    `calc(100% - ${s}) ${s}`,
    `100% ${s}`,
    `100% calc(100% - ${s})`,
    `calc(100% - ${s}) calc(100% - ${s})`,
    `calc(100% - ${s}) 100%`,
    `${s} 100%`,
    `${s} calc(100% - ${s})`,
    `0 calc(100% - ${s})`,
  ].join(", ");
}
