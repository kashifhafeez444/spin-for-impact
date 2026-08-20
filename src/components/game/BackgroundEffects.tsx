import { useEffect, useMemo, useState } from "react";
import { Leaf } from "lucide-react";

type Props = { density?: number; confetti?: boolean };

export function BackgroundEffects({ density = 14, confetti = false }: Props) {
  // Randomised decorations are client-only to avoid SSR hydration mismatches.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const leaves = useMemo(
    () =>
      Array.from({ length: mounted ? density : 0 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 26,
        delay: Math.random() * 18,
        duration: 18 + Math.random() * 20,
        drift: `${(Math.random() - 0.5) * 220}px`,
        opacity: 0.12 + Math.random() * 0.3,
      })),
    [density, mounted],
  );

  const pieces = useMemo(
    () =>
      confetti
        ? Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 1.4,
            duration: 2.6 + Math.random() * 2,
            drift: `${(Math.random() - 0.5) * 260}px`,
            hue: ["var(--lime)", "var(--primary)", "var(--teal)", "var(--sand)"][i % 4],
            w: 6 + Math.random() * 6,
            h: 10 + Math.random() * 10,
          }))
        : [],
    [confetti, mounted],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* soft energy rings */}
      <div className="absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 [background:radial-gradient(circle,color-mix(in_oklab,var(--teal)_22%,transparent),transparent_62%)] blur-2xl" />
      <div className="absolute -bottom-40 left-1/4 h-[30rem] w-[30rem] rounded-full opacity-25 [background:radial-gradient(circle,color-mix(in_oklab,var(--primary)_30%,transparent),transparent_62%)] blur-3xl" />

      {leaves.map((l) => (
        <Leaf
          key={l.id}
          className="absolute bottom-0 text-primary"
          style={{
            left: `${l.left}%`,
            width: l.size,
            height: l.size,
            opacity: l.opacity,
            ["--drift" as string]: l.drift,
            animation: `float-up ${l.duration}s linear ${l.delay}s infinite`,
          }}
        />
      ))}

      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 rounded-[2px]"
          style={{
            left: `${p.left}%`,
            width: p.w,
            height: p.h,
            background: p.hue,
            ["--drift" as string]: p.drift,
            animation: `confetti-fall ${p.duration}s cubic-bezier(0.3,0.7,0.4,1) ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}
