import { useState } from "react";
import { motion } from "motion/react";
import { Loader2, Mail, User } from "lucide-react";
import type { Participant } from "@/services/gameService";

type Props = { onSubmit: (p: Participant) => void; submitting?: boolean };

export function RegistrationScreen({ onSubmit, submitting }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (fullName.trim().length < 2) next.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit({ fullName: fullName.trim(), email: email.trim() });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto flex min-h-[74vh] w-full max-w-md flex-col justify-center px-5"
    >
      <div className="glass rounded-4xl p-7 sm:p-9">
        <h1 className="text-center text-[clamp(1.8rem,7vw,2.6rem)] font-black uppercase leading-tight">
          Ready to <span className="text-gradient">spin?</span>
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Enter your details to join the challenge.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <Field
            id="fullName"
            label="Full name"
            icon={<User className="h-4 w-4" />}
            value={fullName}
            onChange={setFullName}
            placeholder="Jane Doe"
            error={errors.fullName}
            autoComplete="name"
          />
          <Field
            id="email"
            label="Email address"
            icon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={setEmail}
            placeholder="jane@company.com"
            type="email"
            error={errors.email}
            autoComplete="email"
          />

          <button type="submit" disabled={submitting} className="btn-game w-full py-5 text-base">
            {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Continue"}
          </button>
        </form>
      </div>
      <p className="mt-5 text-center text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
        Takes less than 2 minutes
      </p>
    </motion.section>
  );
}

function Field({
  id,
  label,
  icon,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string | undefined;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground"
      >
        {label}
      </label>
      <div
        className={`flex items-center gap-3 rounded-2xl border bg-background/40 px-4 py-4 transition-colors focus-within:border-primary ${
          error ? "border-destructive" : "border-input"
        }`}
      >
        <span className="text-muted-foreground">{icon}</span>
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground/60"
        />
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
