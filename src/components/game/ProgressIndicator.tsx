import { motion } from "motion/react";

type Props = { current: number; total: number };

export function ProgressIndicator({ current, total }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-display text-xs font-bold uppercase tracking-[0.32em] text-muted-foreground">
        Question {current} / {total}
      </p>
      <div className="flex items-center gap-2.5">
        {Array.from({ length: total }).map((_, i) => (
          <motion.span
            key={i}
            layout
            animate={{
              scale: i === current - 1 ? 1.15 : 1,
              backgroundColor:
                i < current ? "var(--primary)" : "color-mix(in oklab, var(--foreground) 18%, transparent)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="h-3 w-3 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
