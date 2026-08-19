import { Sprout } from "lucide-react";
import { SoundToggle } from "./SoundToggle";

type Props = { soundEnabled: boolean; onToggleSound: () => void };

export function GameHeader({ soundEnabled, onToggleSound }: Props) {
  return (
    <header className="relative z-20 mx-auto grid w-full max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/15 ring-1 ring-primary/40">
          <Sprout className="h-5 w-5 text-primary" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-extrabold uppercase tracking-[0.18em]">
            Spin for Impact
          </p>
          <p className="truncate text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            DUPHAT 2026 · ESG
          </p>
        </div>
      </div>
      <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
    </header>
  );
}
