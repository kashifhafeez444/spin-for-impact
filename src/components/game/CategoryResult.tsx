import { motion } from "motion/react";
import type { Category } from "@/data/esgCategories";

type Props = { category: Category; onContinue: () => void };

export function CategoryResult({ category, onContinue }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="fixed inset-0 z-30 flex items-center justify-center bg-background/70 px-5 backdrop-blur-md"
    >
      <div className="glass relative w-full max-w-md overflow-hidden rounded-4xl p-8 text-center">
        <motion.span
          aria-hidden
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: category.color, opacity: 0.25 }}
          animate={{ scale: [0.8, 2.2], opacity: [0.35, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <p className="relative text-xs font-bold uppercase tracking-[0.32em] text-muted-foreground">
          You landed on
        </p>
        <h2
          className="relative mt-4 text-[clamp(2rem,9vw,3rem)] font-black uppercase leading-tight"
          style={{ color: category.color }}
        >
          {category.name}
        </h2>
        <p className="relative mt-4 text-sm text-muted-foreground">
          Two questions. Answer well and grow your impact.
        </p>
        <button type="button" onClick={onContinue} className="btn-game relative mt-8 w-full py-5">
          Take the challenge
        </button>
      </div>
    </motion.div>
  );
}
