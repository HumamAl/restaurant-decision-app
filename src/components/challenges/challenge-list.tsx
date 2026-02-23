"use client";

import type { ReactNode } from "react";
import type { ChallengeData } from "@/data/challenges";
import { OutcomeStatement } from "./outcome-statement";

interface ChallengeListProps {
  challenges: ChallengeData[];
  visualizations?: Record<string, ReactNode>;
}

export function ChallengeList({ challenges, visualizations = {} }: ChallengeListProps) {
  return (
    <div className="flex flex-col gap-4">
      {challenges.map((challenge, index) => {
        const stepNumber = String(index + 1).padStart(2, "0");
        return (
          <div
            key={challenge.id}
            className="linear-card bg-gradient-to-br from-accent/5 to-background p-6 space-y-4 animate-fade-in"
            style={{
              animationDelay: `${index * 80}ms`,
              animationDuration: "200ms",
            }}
          >
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm font-medium text-primary/70 w-6 shrink-0 tabular-nums">
                  {stepNumber}
                </span>
                <h3 className="text-lg font-semibold">{challenge.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1 pl-[calc(1.5rem+0.75rem)]">
                {challenge.description}
              </p>
            </div>
            {visualizations[challenge.id] && (
              <div className="pl-[calc(1.5rem+0.75rem)]">
                {visualizations[challenge.id]}
              </div>
            )}
            <div className="pl-[calc(1.5rem+0.75rem)]">
              <OutcomeStatement outcome={challenge.outcome} index={index} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
