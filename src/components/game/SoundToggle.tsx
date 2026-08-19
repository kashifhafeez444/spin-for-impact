import { Volume2, VolumeX } from "lucide-react";

type Props = { enabled: boolean; onToggle: () => void };

export function SoundToggle({ enabled, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Sound on, tap to mute" : "Sound off, tap to unmute"}
      className="glass flex h-11 items-center gap-2 rounded-full px-4 text-xs font-bold uppercase tracking-widest text-foreground/90 transition-transform active:scale-95"
    >
      {enabled ? (
        <Volume2 className="h-4 w-4 text-primary" />
      ) : (
        <VolumeX className="h-4 w-4 text-muted-foreground" />
      )}
      <span className="hidden sm:inline">{enabled ? "Sound on" : "Sound off"}</span>
    </button>
  );
}
