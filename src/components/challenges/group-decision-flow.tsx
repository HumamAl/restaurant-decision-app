"use client";

import { useState } from "react";
import { Users, Trophy, ArrowRight, MessageSquare, Zap } from "lucide-react";

const problemSteps = [
  {
    id: "group",
    label: "Group Chat",
    description: "\"Where should we eat?\"",
    icon: MessageSquare,
    highlight: false,
  },
  {
    id: "veto",
    label: "Veto Loop",
    description: "Back-and-forth for 15+ min",
    icon: Users,
    highlight: true,
  },
  {
    id: "frustration",
    label: "Frustration",
    description: "\"Just pick anywhere\"",
    icon: MessageSquare,
    highlight: false,
  },
];

const solutionSteps = [
  {
    id: "invite",
    label: "Quick Invite",
    description: "Share bracket link",
    icon: Users,
    highlight: false,
  },
  {
    id: "bracket",
    label: "Bracket Vote",
    description: "Each swipes their picks",
    icon: Zap,
    highlight: true,
  },
  {
    id: "winner",
    label: "Consensus!",
    description: "Winner in ~60 seconds",
    icon: Trophy,
    highlight: false,
  },
];

export function GroupDecisionFlow() {
  const [showSolution, setShowSolution] = useState(false);

  const steps = showSolution ? solutionSteps : problemSteps;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowSolution(false)}
          className="text-xs px-2.5 py-1 rounded-md border transition-all duration-150"
          style={
            !showSolution
              ? {
                  backgroundColor: "color-mix(in oklch, var(--destructive) 10%, transparent)",
                  borderColor: "color-mix(in oklch, var(--destructive) 20%, transparent)",
                  color: "var(--destructive)",
                }
              : {
                  backgroundColor: "transparent",
                  borderColor: "oklch(from var(--border) l c h / 0.6)",
                  color: "var(--muted-foreground)",
                }
          }
        >
          Without bracket
        </button>
        <button
          onClick={() => setShowSolution(true)}
          className="text-xs px-2.5 py-1 rounded-md border transition-all duration-150"
          style={
            showSolution
              ? {
                  backgroundColor: "color-mix(in oklch, var(--success) 10%, transparent)",
                  borderColor: "color-mix(in oklch, var(--success) 20%, transparent)",
                  color: "var(--success)",
                }
              : {
                  backgroundColor: "transparent",
                  borderColor: "oklch(from var(--border) l c h / 0.6)",
                  color: "var(--muted-foreground)",
                }
          }
        >
          With bracket
        </button>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-start sm:items-center">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isHighlight = step.highlight;
          return (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-150"
                style={
                  isHighlight
                    ? showSolution
                      ? {
                          borderColor: "color-mix(in oklch, var(--success) 25%, transparent)",
                          backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
                        }
                      : {
                          borderColor: "color-mix(in oklch, var(--destructive) 25%, transparent)",
                          backgroundColor: "color-mix(in oklch, var(--destructive) 8%, transparent)",
                        }
                    : {
                        borderColor: "oklch(from var(--border) l c h / 0.6)",
                        backgroundColor: "var(--card)",
                      }
                }
              >
                <Icon
                  className="w-4 h-4 shrink-0"
                  style={{
                    color: isHighlight
                      ? showSolution
                        ? "var(--success)"
                        : "var(--destructive)"
                      : "var(--muted-foreground)",
                  }}
                />
                <div>
                  <p className="text-xs font-medium">{step.label}</p>
                  <p className="text-[10px] text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-foreground font-mono">
        {showSolution
          ? "Bracket mode: each participant ranks 3 options — algorithm finds the overlap"
          : "Typical group dinner: 15+ minutes of suggestions, rejections, and silence"}
      </p>
    </div>
  );
}
