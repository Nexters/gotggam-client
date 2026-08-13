import { Typography } from "@/shared/ui";

import * as styles from "./question-prompt.css";

type QuestionPromptProps = {
  current: number;
  total: number;
  question: string;
};

export function QuestionPrompt({
  current,
  total,
  question,
}: QuestionPromptProps) {
  return (
    <div className={styles.prompt}>
      <Typography family="galmuri9" size="20" color="gray-11">
        {current}/{total}
      </Typography>
      <Typography
        as="p"
        family="galmuri9"
        size="28"
        color="white"
        className={styles.question}
      >
        {question}
      </Typography>
    </div>
  );
}
