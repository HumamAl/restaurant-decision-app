export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export interface ChallengeData {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most food apps default to a basic filter-and-list approach — present options, let the user scroll, let the group argue. The result is a longer decision loop than just Googling 'restaurants near me'.",
  differentApproach:
    "I'd build around the social moment: a bracket voting system that turns group indecision into a 60-second game, preference learning that happens invisibly through swipes, and streak rewards that make re-opening the app feel rewarding.",
  accentWord: "bracket voting system",
};

export const challenges: ChallengeData[] = [
  {
    id: "challenge-1",
    title: "Making Group Indecision Fun",
    description:
      "When four friends can't agree on dinner, a list of restaurants makes it worse — everyone vetos, no one decides. The UX needs to transform that tension into a quick, satisfying consensus without anyone feeling steamrolled.",
    outcome:
      "Could reduce group dining decision time from 15+ minutes of back-and-forth to a 60-second bracket vote",
  },
  {
    id: "challenge-2",
    title: "Preference Learning Without a Signup Form",
    description:
      "Onboarding forms with 10 cuisine questions kill first-time retention before the user sees any value. Taste preferences need to emerge naturally from behavior — not be interrogated upfront.",
    outcome:
      "Could replace a 10-question onboarding survey with a 3-swipe taste calibration that improves match quality on first use",
  },
  {
    id: "challenge-3",
    title: "Keeping Re-Engagement High After Session One",
    description:
      "Utility apps suffer brutal drop-off: most users open once, find a restaurant, and never return. Without a reason to come back — streaks, discovery, social — the app becomes a one-and-done tool instead of a go-to habit.",
    outcome:
      "Could push Day-7 retention from a typical 15–20% (bare utility apps) toward 40%+ with streak rewards and discovery nudges",
  },
];
