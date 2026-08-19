/**
 * Data layer for the "Spin for Impact" activation.
 *
 * Everything here is mock/local for the prototype. To connect a real backend,
 * implement the same `GameService` interface as `apiGameService` and swap the
 * exported `gameService` binding — no UI change required.
 */
import { categories, type Category, type Question } from "@/data/esgCategories";

export type Participant = { fullName: string; email: string };
export type RegisteredParticipant = Participant & { id: string; registeredAt: string };

export type GameResult = {
  participantId: string;
  categoryId: string;
  answers: { questionId: string; selected: number; correct: boolean }[];
  score: number;
  total: number;
};

export type GameService = {
  registerParticipant(p: Participant): Promise<RegisteredParticipant>;
  getCategories(): Promise<Category[]>;
  getQuestions(categoryId: string, count?: number): Promise<Question[]>;
  submitAnswer(questionId: string, selected: number): Promise<{ correct: boolean; correctAnswer: number }>;
  saveGameResult(result: GameResult): Promise<{ ok: true }>;
  isRewardEligible(score: number, total: number): boolean;
  claimReward(participantId: string): Promise<{ ok: true; code: string }>;
};

const delay = (ms = 220) => new Promise((r) => setTimeout(r, ms));

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

function findQuestion(questionId: string) {
  for (const c of categories) {
    const q = c.questions.find((x) => x.id === questionId);
    if (q) return q;
  }
  return undefined;
}

export const mockGameService: GameService = {
  async registerParticipant(p) {
    await delay();
    return { ...p, id: `local-${Date.now()}`, registeredAt: new Date().toISOString() };
  },
  async getCategories() {
    await delay(0);
    return categories;
  },
  async getQuestions(categoryId, count = 2) {
    await delay(120);
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return [];
    // Random, non-repeating selection of `count` questions, in random order.
    return shuffle(category.questions).slice(0, count);
  },
  async submitAnswer(questionId, selected) {
    const q = findQuestion(questionId);
    const correctAnswer = q?.correctAnswer ?? -1;
    return { correct: selected === correctAnswer, correctAnswer };
  },
  async saveGameResult() {
    await delay(120);
    return { ok: true };
  },
  // Business rule kept in one place so it can move server-side later.
  isRewardEligible(score) {
    return score >= 1;
  },
  async claimReward() {
    await delay(150);
    return { ok: true, code: `DUPHAT-${Math.random().toString(36).slice(2, 7).toUpperCase()}` };
  },
};

export const gameService: GameService = mockGameService;

export { shuffle };
