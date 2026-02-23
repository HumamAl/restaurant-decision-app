"use client";

import { useEffect, useState } from "react";

interface RetentionBar {
  label: string;
  withoutValue: number;
  withValue: number;
  unit: string;
}

const bars: RetentionBar[] = [
  { label: "Day-1 Retention", withoutValue: 42, withValue: 71, unit: "%" },
  { label: "Day-7 Retention", withoutValue: 17, withValue: 43, unit: "%" },
  { label: "Day-30 Retention", withoutValue: 6, withValue: 22, unit: "%" },
  { label: "Sessions / Week", withoutValue: 1.2, withValue: 3.8, unit: "" },
];

export function RetentionMetricBars() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-[11px] font-mono text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-4 rounded-full"
            style={{ backgroundColor: "color-mix(in oklch, var(--destructive) 60%, transparent)" }}
          />
          Without gamification
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2 w-4 rounded-full"
            style={{ backgroundColor: "var(--success)" }}
          />
          With streaks &amp; rewards
        </span>
      </div>

      <div className="space-y-3">
        {bars.map((bar) => {
          const maxVal = bar.label === "Sessions / Week" ? 5 : 100;
          const withoutPct = (bar.withoutValue / maxVal) * 100;
          const withPct = (bar.withValue / maxVal) * 100;

          return (
            <div key={bar.label} className="space-y-1">
              <p className="text-xs font-medium">{bar.label}</p>
              <div className="flex items-center gap-2">
                {/* Without bar */}
                <div className="h-2 rounded-full bg-muted flex-1 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: animated ? `${withoutPct}%` : "0%",
                      backgroundColor:
                        "color-mix(in oklch, var(--destructive) 60%, transparent)",
                    }}
                  />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground w-8 text-right">
                  {bar.withoutValue}
                  {bar.unit}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* With bar */}
                <div className="h-2 rounded-full bg-muted flex-1 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 delay-150"
                    style={{
                      width: animated ? `${withPct}%` : "0%",
                      backgroundColor: "var(--success)",
                    }}
                  />
                </div>
                <span
                  className="font-mono text-[10px] font-medium w-8 text-right"
                  style={{ color: "var(--success)" }}
                >
                  {bar.withValue}
                  {bar.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] font-mono text-muted-foreground">
        Benchmarks from mobile food & lifestyle apps (Sensor Tower, 2024)
      </p>
    </div>
  );
}
