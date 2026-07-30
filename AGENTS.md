<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 커밋 컨벤션

- 형식: `<type>: <설명>` (예: `feat: 랜딩 페이지 구현`)
- 타입: `feat`, `fix`, `refactor`, `docs`, `design`, `style`, `misc`, `chore`, `deps`, `test`, `hotfix` — 첫 글자 대문자(`Feat:` 등)도 허용
- `commit-msg` 훅(commitlint)이 타입을 강제함 — `commitlint.config.mjs`
- 브랜치명: `<type>/<subject>` (예: `feat/landing-page`) — `pre-push` 훅이 검증함
