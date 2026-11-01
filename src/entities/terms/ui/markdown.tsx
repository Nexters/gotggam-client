import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/shared/lib";

import * as styles from "./markdown.css";

type MarkdownProps = {
  children: string;
  className?: string;
};

/** 약관 본문용 마크다운 렌더러. 스타일은 markdown.css.ts 의 전역 선택자가 맡는다. */
export function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={cn(styles.markdown, className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
