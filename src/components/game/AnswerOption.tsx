import { motion } from "motion/react";
import { Check, X } from "lucide-react";

type Props = {
  index: number;
  label: string;
  locked: boolean;
  selected: boolean;
  isCorrect: boolean;
  revealCorrect: boolean;
  onSelect: () => void;
};

const LETTERS = ["A", "B", "C", "D"];

export function AnswerOption({
  index,
  label,
  locked,
  selected,
  isCorrect,
  revealCorrect,
  onSelect,
}: Props) {
  const showSuccess = locked && revealCorrect && isCorrect;
  const showError = locked && selected && !isCorrect;

  const tone = showSuccess
    ? "border-success bg-success/15"
    : showError
      ? "border-destructive bg-destructive/15"
      : "border-border bg-card/55 hover:border-primary/60";

  return (
    <motion.button
      type="button"
      disabled={locked}
      onClick={onSelect}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 * index, duration: 0.3 }}
      whileTap={locked ? undefined : { scale: 0.98 }}
      className={`flex w-full items-center gap-4 rounded-3xl border px-5 py-4 text-left backdrop-blur transition-colors disabled:cursor-default ${tone}`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl font-display text-sm font-black ${
          showSuccess
            ? "bg-success text-success-foreground"
            : showError
              ? "bg-destructive text-destructive-foreground"
              : "bg-secondary text-foreground/80"
        }`}
      >
        {showSuccess ? <Check className="h-5 w-5" /> : showError ? <X className="h-5 w-5" /> : LETTERS[index]}
      </span>
      <span className="min-w-0 text-[0.95rem] font-medium leading-snug sm:text-base">{label}</span>
    </motion.button>
  );
}
