import { motion } from "motion/react";
import { Sprout, RotateCcw } from "lucide-react";

type Props = {
  score: number;
  total: number;
  rewardEligible: boolean;
  onClaim: () => void;
  onPlayAgain: () => void;
};

const COPY: Record<number, { headline: string; message: string }> = {
  2: {
    headline: "You made an impact!",
    message: "Congratulations! You've earned a sustainable plant.",
  },
  1: {
    headline: "Good job!",
    message: "Every action counts. Keep making sustainable choices.",
  },
  0: {
    headline: "Keep going!",
    message: "Every ESG journey starts with one small action.",
  },
};

export function ResultScreen({ score, total, rewardEligible, onClaim, onPlayAgain }: Props) {
  const copy = COPY[score] ?? COPY[0]!;

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto flex min-h-[72vh] w-full max-w-lg flex-col justify-center px-5 text-center"
    >
      <div className="glass rounded-4xl p-8 sm:p-10">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/40"
        >
          <Sprout className="h-9 w-9 text-primary" />
        </motion.div>

        <h1 className="text-gradient mt-6 text-[clamp(1.9rem,8vw,3rem)] font-black uppercase leading-tight">
          {copy.headline}
        </h1>
        <p className="mt-3 font-display text-lg font-black tracking-[0.24em] text-foreground">
          {score} / {total} CORRECT
        </p>
        <p className="mt-4 text-balance text-sm text-muted-foreground sm:text-base">{copy.message}</p>

        <div className="mt-8 space-y-3">
          {rewardEligible && (
            <button type="button" onClick={onClaim} className="btn-game w-full py-5">
              Collect your plant
            </button>
          )}
          <button type="button" onClick={onPlayAgain} className="btn-ghost-game w-full py-4">
            <RotateCcw className="h-4 w-4" /> Play again
          </button>
        </div>
      </div>
    </motion.section>
  );
}
