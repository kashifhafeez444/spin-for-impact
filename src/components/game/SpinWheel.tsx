import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  HeartPulse,
  Recycle,
  Zap,
  Droplets,
  Footprints,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/data/esgCategories";
import { playSound } from "@/lib/sound";

const ICONS: Record<string, LucideIcon> = {
  HeartPulse,
  Recycle,
  Zap,
  Droplets,
  Footprints,
  Globe2,
};

const SPIN_MS = 5200;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

const R = 100;
const polar = (angleDeg: number, radius: number) => {
  const a = (angleDeg * Math.PI) / 180;
  return { x: R + radius * Math.cos(a), y: R + radius * Math.sin(a) };
};

function segmentPath(index: number, count: number, radius: number) {
  const step = 360 / count;
  const start = index * step - 90;
  const end = start + step;
  const p1 = polar(start, radius);
  const p2 = polar(end, radius);
  return `M ${R} ${R} L ${p1.x} ${p1.y} A ${radius} ${radius} 0 0 1 ${p2.x} ${p2.y} Z`;
}

type Props = {
  categories: Category[];
  spinning: boolean;
  winnerIndex: number | null;
  onSpin: () => void;
  onSettled: (index: number) => void;
};

export function SpinWheel({ categories, spinning, winnerIndex, onSpin, onSettled }: Props) {
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const frame = useRef<number | null>(null);
  const count = categories.length;
  const step = 360 / count;
  const settledIndex = !spinning && winnerIndex !== null ? winnerIndex : null;

  useEffect(() => {
    if (!spinning || winnerIndex === null) return;
    const from = rotationRef.current;
    const base = ((-winnerIndex * step - step / 2) % 360 + 360) % 360;
    const turns = 5 + Math.floor(Math.random() * 2);
    const target = from - (from % 360) + turns * 360 + base;
    const start = performance.now();
    let lastTick = -1;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / SPIN_MS);
      const value = from + (target - from) * easeOutQuart(t);
      rotationRef.current = value;
      setRotation(value);
      const segmentsPassed = Math.floor(value / step);
      if (segmentsPassed !== lastTick) {
        lastTick = segmentsPassed;
        if (t < 0.995) playSound("tick");
      }
      if (t < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        playSound("stop");
        window.setTimeout(() => onSettled(winnerIndex), 700);
      }
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, winnerIndex]);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="relative w-[min(86vw,26rem)] max-w-full">
        {/* pointer */}
        <div className="absolute left-1/2 top-[-14px] z-20 -translate-x-1/2">
          <motion.div
            animate={spinning ? { y: [0, 3, 0] } : { y: 0 }}
            transition={{ repeat: spinning ? Infinity : 0, duration: 0.18 }}
            className="h-0 w-0 border-x-[14px] border-t-[26px] border-x-transparent"
            style={{ borderTopColor: "var(--sand)", filter: "drop-shadow(0 4px 10px rgba(0,0,0,.5))" }}
          />
        </div>

        <div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 26%, transparent), transparent 70%)" }}
        />

        <div className="relative aspect-square rounded-full p-[3%] ring-1 ring-border [background:conic-gradient(from_0deg,color-mix(in_oklab,var(--sand)_60%,transparent),color-mix(in_oklab,var(--teal)_40%,transparent),color-mix(in_oklab,var(--sand)_60%,transparent))] shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)]">
          <svg
            viewBox="0 0 200 200"
            className="h-full w-full drop-shadow-xl"
            style={{ transform: `rotate(${rotation}deg)`, willChange: "transform" }}
          >
            {categories.map((c, i) => {
              const isWinner = settledIndex === i;
              const mid = i * step - 90 + step / 2;
              const labelPos = polar(mid, 58);
              const iconPos = polar(mid, 82);
              return (
                <g key={c.id}>
                  <path
                    d={segmentPath(i, count, 96)}
                    fill={c.color}
                    fillOpacity={isWinner ? 1 : 0.88}
                    stroke="oklch(0.19 0.045 165)"
                    strokeWidth={1.4}
                  />
                  {isWinner && (
                    <path
                      d={segmentPath(i, count, 96)}
                      fill="white"
                      fillOpacity={0.16}
                      className="animate-pulse"
                    />
                  )}
                  <g transform={`translate(${labelPos.x} ${labelPos.y}) rotate(${mid + 90})`}>
                    {c.name.split(" ").map((word, wi, arr) => (
                      <text
                        key={word + wi}
                        y={(wi - (arr.length - 1) / 2) * 8}
                        textAnchor="middle"
                        fontSize="7"
                        fontWeight="800"
                        letterSpacing="0.4"
                        fill="oklch(0.16 0.04 165)"
                        style={{ textTransform: "uppercase" }}
                      >
                        {word.toUpperCase()}
                      </text>
                    ))}
                  </g>
                  <g transform={`translate(${iconPos.x - 5} ${iconPos.y - 5})`}>
                    <foreignObject width="10" height="10">
                      <div className="flex h-[10px] w-[10px] items-center justify-center">
                        <IconFor name={c.icon} />
                      </div>
                    </foreignObject>
                  </g>
                </g>
              );
            })}
            <circle cx="100" cy="100" r="18" fill="oklch(0.19 0.045 165)" stroke="var(--sand)" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="8" fill="var(--sand)" opacity="0.85" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="font-display text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Spin the wheel
        </p>
        <motion.button
          type="button"
          disabled={spinning}
          onClick={onSpin}
          whileTap={{ scale: 0.95 }}
          className="btn-game px-12 py-5 text-lg"
        >
          {spinning ? "Spinning…" : "Spin now"}
        </motion.button>
      </div>
    </div>
  );
}

function IconFor({ name }: { name: string }) {
  const Icon = ICONS[name] ?? Globe2;
  return <Icon color="oklch(0.16 0.04 165)" strokeWidth={2.5} size={10} />;
}
