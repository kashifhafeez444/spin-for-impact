import { motion } from "motion/react";
import { Sparkles, Leaf, Recycle, Droplets } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

export function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto flex min-h-[78vh] w-full max-w-3xl flex-col items-center justify-center px-5 text-center"
    >
      <span className="mb-6 grid h-24 w-24 place-items-center rounded-3xl bg-sand p-3 ring-1 ring-primary/40">
        <BrandLogo className="h-full w-full" />
      </span>

      <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
        <Sparkles className="h-3.5 w-3.5" /> DUPHAT 2026 Activation
      </span>

      <div className="relative">
        <motion.span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 30%, transparent), transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <h1 className="text-gradient text-[clamp(2.6rem,11vw,5.5rem)] font-black uppercase leading-[0.95]">
          Spin for
          <br />
          Impact
        </h1>
      </div>

      <p className="mt-6 max-w-md text-balance text-base text-muted-foreground sm:text-lg">
        Spin the wheel. Test your ESG knowledge. Make an impact.
      </p>

      <motion.button
        type="button"
        onClick={onStart}
        whileTap={{ scale: 0.95 }}
        className="btn-game mt-10 px-12 py-5 text-lg"
      >
        Start the game
      </motion.button>

      <div className="mt-12 flex items-center gap-6 text-muted-foreground">
        {[Leaf, Recycle, Droplets].map((Icon, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-12 w-12 place-items-center rounded-2xl bg-card/50 ring-1 ring-border"
          >
            <Icon className="h-5 w-5 text-primary" />
          </motion.span>
        ))}
      </div>
      <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        1 spin · 2 questions · 1 plant
      </p>
    </motion.section>
  );
}
