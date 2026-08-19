import { motion, AnimatePresence } from "motion/react";
import type { Question } from "@/data/esgCategories";
import { AnswerOption } from "./AnswerOption";
import { ProgressIndicator } from "./ProgressIndicator";

type Props = {
  question: Question;
  index: number;
  total: number;
  categoryName: string;
  selected: number | null;
  answered: boolean;
  onSelect: (i: number) => void;
  onNext: () => void;
};

export function QuestionScreen({
  question,
  index,
  total,
  categoryName,
  selected,
  answered,
  onSelect,
  onNext,
}: Props) {
  const isCorrect = answered && selected === question.correctAnswer;

  return (
    <motion.section
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto w-full max-w-xl px-5 pb-16"
    >
      <div className="flex flex-col items-center gap-4">
        <p className="font-display text-[11px] font-black uppercase tracking-[0.38em] text-primary">
          ESG Challenge
        </p>
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          {categoryName}
        </p>
        <ProgressIndicator current={index + 1} total={total} />
      </div>

      <div className="glass mt-7 rounded-4xl p-6 sm:p-8">
        <h1 className="text-balance text-[clamp(1.15rem,4.6vw,1.65rem)] font-extrabold leading-snug">
          {question.question}
        </h1>
      </div>

      <div className="mt-5 space-y-3">
        {question.options.map((opt, i) => (
          <AnswerOption
            key={opt}
            index={i}
            label={opt}
            locked={answered}
            selected={selected === i}
            isCorrect={i === question.correctAnswer}
            revealCorrect={answered}
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass mt-6 rounded-3xl p-6 text-center"
          >
            <p
              className={`font-display text-2xl font-black uppercase ${
                isCorrect ? "text-success" : "text-warn"
              }`}
            >
              {isCorrect ? "Correct!" : "Not quite!"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {isCorrect
                ? "Great job! You know your ESG."
                : `Correct answer: ${question.options[question.correctAnswer]}`}
            </p>
            <button type="button" onClick={onNext} className="btn-game mt-6 w-full py-4">
              {index + 1 < total ? "Next question" : "See my result"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
