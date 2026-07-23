# views (FSD pages 레이어)

라우트 단위의 페이지 컴포넌트를 두는 레이어입니다.

- FSD의 `pages` 레이어에 해당하지만, Next.js `pages` 라우터 디렉토리와의 충돌을
  피하기 위해 `views`로 명명했습니다.
- 실제 라우팅은 `src/app`의 라우트 파일이 담당하며, 각 라우트는 이 레이어의
  페이지를 re-export 합니다.

예시: `views/home` → `src/app/page.tsx`
