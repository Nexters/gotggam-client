/** ms 뒤에 resolve되는 Promise. 최소 로딩 연출 등 타이밍 조합에 쓴다. */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
