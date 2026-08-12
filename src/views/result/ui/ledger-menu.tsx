"use client";

import { useState } from "react";

import { cn } from "@/shared/lib";
import { Typography } from "@/shared/ui";

import * as styles from "./ledger-menu.css";

export type LedgerMenuAction = "save" | "visit-room" | "finish";

const MENU_ITEMS: { action: LedgerMenuAction; label: string }[] = [
  { action: "save", label: "명부 저장하기" },
  { action: "visit-room", label: "곧감이의 방 방문하기" },
  { action: "finish", label: "끝내기" },
];

type LedgerMenuProps = {
  onSelect: (action: LedgerMenuAction) => void;
};

export function LedgerMenu({ onSelect }: LedgerMenuProps) {
  const [selectedAction, setSelectedAction] = useState<LedgerMenuAction | null>(
    null,
  );

  return (
    <div className={styles.panel}>
      {MENU_ITEMS.map(({ action, label }) => (
        <button
          key={action}
          type="button"
          aria-pressed={action === selectedAction}
          className={cn(
            styles.item,
            action === selectedAction && styles.itemSelected,
          )}
          onClick={() => {
            setSelectedAction(action);
            onSelect(action);
          }}
        >
          <Typography family="galmuri11" size="22" color="gray-12">
            {"> "}
            {label}
          </Typography>
        </button>
      ))}
      <div className={styles.bottomFade} aria-hidden />
    </div>
  );
}
