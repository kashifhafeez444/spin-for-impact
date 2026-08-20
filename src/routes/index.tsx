import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";

import { BackgroundEffects } from "@/components/game/BackgroundEffects";
import { GameHeader } from "@/components/game/GameHeader";
import { WelcomeScreen } from "@/components/game/WelcomeScreen";
import { RegistrationScreen } from "@/components/game/RegistrationScreen";
import { SpinWheel } from "@/components/game/SpinWheel";
import { CategoryResult } from "@/components/game/CategoryResult";
import { QuestionScreen } from "@/components/game/QuestionScreen";
import { ResultScreen } from "@/components/game/ResultScreen";
import { RewardScreen } from "@/components/game/RewardScreen";

import { categories, type Category, type Question } from "@/data/esgCategories";
import { gameService, type RegisteredParticipant } from "@/services/gameService";
import {
  playSound,
  setSoundEnabled,
  startAmbient,
  stopAmbient,
  unlockAudio,
} from "@/lib/sound";

const TITLE = "Spin for Impact — DUPHAT 2026 ESG Challenge";
const DESCRIPTION =
  "Spin the wheel, answer two ESG questions and grow your impact at the DUPHAT 2026 activation. Win a sustainable plant.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

type Screen =
  | "welcome"
  | "register"
  | "wheel"
  | "question"
  | "result"
  | "reward";

function Index() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [sound, setSound] = useState(true);
  const [participant, setParticipant] = useState<RegisteredParticipant | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [spinning, setSpinning] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [showCategory, setShowCategory] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<
    { questionId: string; selected: number; correct: boolean }[]
  >([]);
  const [rewardCode, setRewardCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSoundEnabled(sound);
    if (!sound) stopAmbient();
  }, [sound]);

  useEffect(() => () => stopAmbient(), []);

  const score = answers.filter((a) => a.correct).length;
  const total = questions.length || 2;

  const handleStart = useCallback(() => {
    unlockAudio();
    startAmbient();
    playSound("start");
    setScreen("register");
  }, []);

  const handleRegister = useCallback(async (p: { fullName: string; email: string }) => {
    setSubmitting(true);
    try {
      const registered = await gameService.registerParticipant(p);
      setParticipant(registered);
      playSound("click");
      setScreen("wheel");
    } finally {
      setSubmitting(false);
    }
  }, []);

  const handleSpin = useCallback(() => {
    if (spinning) return;
    unlockAudio();
    playSound("click");
    setWinnerIndex(Math.floor(Math.random() * categories.length));
    setSpinning(true);
  }, [spinning]);

  const handleSettled = useCallback(async (index: number) => {
    setSpinning(false);
    const picked = categories[index]!;
    setCategory(picked);
    setShowCategory(true);
    const qs = await gameService.getQuestions(picked.id, 2);
    setQuestions(qs);
  }, []);

  const handleCategoryContinue = useCallback(() => {
    playSound("click");
    setShowCategory(false);
    setQIndex(0);
    setSelected(null);
    setAnswered(false);
    setAnswers([]);
    setScreen("question");
  }, []);

  const handleSelect = useCallback(
    async (i: number) => {
      if (answered) return;
      const q = questions[qIndex];
      if (!q) return;
      setSelected(i);
      setAnswered(true);
      const { correct } = await gameService.submitAnswer(q.id, i);
      playSound(correct ? "correct" : "incorrect");
      setAnswers((prev) => [...prev, { questionId: q.id, selected: i, correct }]);
    },
    [answered, qIndex, questions],
  );

  const handleNext = useCallback(async () => {
    playSound("click");
    if (qIndex + 1 < questions.length) {
      setQIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
      return;
    }
    if (participant && category) {
      await gameService.saveGameResult({
        participantId: participant.id,
        categoryId: category.id,
        answers,
        score: answers.filter((a) => a.correct).length,
        total: questions.length,
      });
    }
    setScreen("result");
  }, [answers, category, participant, qIndex, questions.length]);

  const handleClaim = useCallback(async () => {
    if (!participant) return;
    const { code } = await gameService.claimReward(participant.id);
    setRewardCode(code);
    playSound("reward");
    setScreen("reward");
  }, [participant]);

  const handlePlayAgain = useCallback(() => {
    playSound("click");
    setWinnerIndex(null);
    setCategory(null);
    setQuestions([]);
    setAnswers([]);
    setQIndex(0);
    setSelected(null);
    setAnswered(false);
    setRewardCode(undefined);
    setScreen("wheel");
  }, []);

  const currentQuestion = questions[qIndex];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundEffects confetti={screen === "reward"} />
      <GameHeader soundEnabled={sound} onToggleSound={() => setSound((s) => !s)} />

      <AnimatePresence mode="wait">
        {screen === "welcome" && <WelcomeScreen key="welcome" onStart={handleStart} />}

        {screen === "register" && (
          <RegistrationScreen key="register" onSubmit={handleRegister} submitting={submitting} />
        )}

        {screen === "wheel" && (
          <section
            key="wheel"
            className="relative z-10 mx-auto flex min-h-[74vh] w-full max-w-3xl flex-col items-center justify-center px-5 py-6"
          >
            <SpinWheel
              categories={categories}
              spinning={spinning}
              winnerIndex={winnerIndex}
              onSpin={handleSpin}
              onSettled={handleSettled}
            />
          </section>
        )}

        {screen === "question" && currentQuestion && (
          <QuestionScreen
            key={currentQuestion.id}
            question={currentQuestion}
            index={qIndex}
            total={questions.length}
            categoryName={category?.name ?? ""}
            selected={selected}
            answered={answered}
            onSelect={handleSelect}
            onNext={handleNext}
          />
        )}

        {screen === "result" && (
          <ResultScreen
            key="result"
            score={score}
            total={total}
            rewardEligible={gameService.isRewardEligible(score, total)}
            onClaim={handleClaim}
            onPlayAgain={handlePlayAgain}
          />
        )}

        {screen === "reward" && (
          <RewardScreen key="reward" code={rewardCode} onDone={handlePlayAgain} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCategory && category && (
          <CategoryResult category={category} onContinue={handleCategoryContinue} />
        )}
      </AnimatePresence>
    </main>
  );
}
