"use client";

import type { ReactNode } from "react";
import type { ChallengeData } from "@/data/challenges";
import { ChallengeList } from "./challenge-list";
import { GroupDecisionFlow } from "./group-decision-flow";
import { PreferenceBeforeAfter } from "./preference-before-after";
import { RetentionMetricBars } from "./retention-metric-bars";

interface ChallengePageContentProps {
  challenges: ChallengeData[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "challenge-1": <GroupDecisionFlow />,
    "challenge-2": <PreferenceBeforeAfter />,
    "challenge-3": <RetentionMetricBars />,
  };

  return <ChallengeList challenges={challenges} visualizations={visualizations} />;
}
