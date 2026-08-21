import { motion } from "motion/react";
import plantImage from "@/assets/plant.png";

type Props = { onDone: () => void; code?: string | undefined };

export function RewardScreen({ onDone, code }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 mx-auto flex min-h-[74vh] w-full max-w-lg flex-col items-center justify-center px-5 text-center"
    >
      <motion.div
        initial={{ scale: 0.6, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 14 }}
        className="relative"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 45%, transparent), transparent 70%)" }}
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.img
          src={plantImage}
          alt="Your sustainable plant reward"
          width={1024}
          height={1024}
          className="h-56 w-56 object-contain drop-shadow-2xl sm:h-72 sm:w-72"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <h1 className="text-gradient mt-6 text-[clamp(1.9rem,8vw,3rem)] font-black uppercase leading-tight">
        Your impact has grown
      </h1>
      <p className="mt-4 max-w-sm text-balance text-sm text-muted-foreground sm:text-base">
        Congratulations! Collect your sustainable plant at the activation desk.
      </p>
      {code && (
        <p className="glass mt-5 rounded-full px-5 py-2 font-display text-xs font-black tracking-[0.3em]">
          {code}
        </p>
      )}

      <button type="button" onClick={onDone} className="btn-game mt-9 w-full max-w-xs py-5">
        Done
      </button>

      <span className="mt-8 grid h-14 w-14 place-items-center rounded-2xl bg-background/90 p-2 ring-1 ring-primary/30">
        <BrandLogo className="h-full w-full" />
      </span>
    </motion.section>
  );
}
