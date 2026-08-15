"use client";

import { useState } from "react";

import { BGM_STORAGE_KEY, CLICK_SFX_SRC } from "@/shared/config";
import { cn, playSfx, useLocalStorage } from "@/shared/lib";
import { Typography } from "@/shared/ui";

import * as styles from "./ledger-menu.css";

export type LedgerMenuAction = "save" | "visit-room" | "share" | "finish";

const MENU_ITEMS: { action: LedgerMenuAction; label: string }[] = [
  { action: "save", label: "명부 저장하기" },
  { action: "visit-room", label: "곧감이의 방 방문하기" },
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
  const [isSoundOn] = useLocalStorage(BGM_STORAGE_KEY, true);

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
      <div className={styles.bottomFade} aria-hidden />
      {MENU_ITEMS.map(({ action, label }) => (
        <button
          key={action}
          type="button"
          aria-pressed={action === selectedAction}
          className={cn(
            styles.item,
            action === selectedAction && styles.itemSelected,
          )}
          onClick={() => handleSelect(action)}
        >
          <Typography family="galmuri9" size="22" color="gray-12">
            {"> "}
            {label}
          </Typography>
        </button>
      ))}
    </div>
  );
}
