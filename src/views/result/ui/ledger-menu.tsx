"use client";

import { useState } from "react";

import { CLICK_SFX_SRC, GOTGGAM_INSTAGRAM_URL } from "@/shared/config";
import { cn, playSfx, useBgmEnabled } from "@/shared/lib";
import { Typography } from "@/shared/ui";

import * as styles from "./ledger-menu.css";

export type LedgerMenuAction = "save" | "visit-room" | "share" | "finish";

const MENU_ITEMS: { action: LedgerMenuAction; label: string; href?: string }[] =
  [
    { action: "save", label: "명부 저장하기" },
    {
      action: "visit-room",
      label: "곧감이의 방 방문하기",
      // 곧감이의 방 = 곧감 인스타그램. window.open은 모바일에서 앱이 네비게이션을
      // 가로채 about:blank 탭이 남으므로 실제 앵커 네비게이션으로 연다.
      href: GOTGGAM_INSTAGRAM_URL,
    },
    { action: "share", label: "테스트 공유하기" },
    { action: "finish", label: "끝내기" },
  ];

const HIGHLIGHT_RESET_MS = 600;

type LedgerMenuProps = {
  onSelect: (action: LedgerMenuAction) => void;
};

export function LedgerMenu({ onSelect }: LedgerMenuProps) {
  const [selectedAction, setSelectedAction] = useState<LedgerMenuAction | null>(
    null,
  );
  const [isSoundOn] = useBgmEnabled();

  const handleSelect = (action: LedgerMenuAction) => {
    // 끝내기를 고른 뒤에는 화면 전환 대기 중이므로 추가 입력을 막는다.
    if (selectedAction === "finish") {
      return;
    }

    if (isSoundOn) {
      playSfx(CLICK_SFX_SRC);
    }
    setSelectedAction(action);
    onSelect(action);

    if (action !== "finish") {
      // 이동하지 않는 항목은 깜빡임 연출 후 하이라이트를 되돌린다.
      window.setTimeout(() => {
        setSelectedAction((current) => (current === action ? null : current));
      }, HIGHLIGHT_RESET_MS);
    }
  };

  return (
    <div className={styles.panel}>
      {MENU_ITEMS.map(({ action, label, href }) => {
        const className = cn(
          styles.item,
          action === selectedAction && styles.itemSelected,
        );
        const content = (
          <Typography family="galmuri9" size="22" color="gray-12">
            {"> "}
            {label}
          </Typography>
        );

        return href ? (
          <a
            key={action}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            onClick={() => handleSelect(action)}
          >
            {content}
          </a>
        ) : (
          <button
            key={action}
            type="button"
            aria-pressed={action === selectedAction}
            className={className}
            onClick={() => handleSelect(action)}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
