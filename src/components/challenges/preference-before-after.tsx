import { X, Check } from "lucide-react";

const beforeItems = [
  "What cuisines do you like? (pick 5)",
  "Dietary restrictions? (dropdown)",
  "Max budget per person?",
  "How far are you willing to travel?",
  "Favorite neighborhoods?",
  "Vibe preference: casual vs. upscale?",
  "Allergy info (10 checkboxes)",
  "Group size preference?",
  "Weekend vs. weekday dining?",
  "How adventurous are you?",
];

const afterItems = [
  "Swipe right on Tacos Al Pastor photo",
  "Swipe left on Sushi platter photo",
  "Swipe right on pizza & wine shot",
];

export function PreferenceBeforeAfter() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Before panel */}
      <div
        className="rounded-lg p-4 space-y-2"
        style={{
          backgroundColor: "color-mix(in oklch, var(--destructive) 8%, transparent)",
          borderColor: "color-mix(in oklch, var(--destructive) 15%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <p className="text-xs font-semibold tracking-wide uppercase text-[color:var(--destructive)] mb-3">
          Before — 10-question form
        </p>
        <ul className="space-y-1.5">
          {beforeItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-[color:var(--destructive)]">
              <X className="h-3 w-3 mt-0.5 shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-[10px] font-mono text-muted-foreground pt-1">
          Avg. completion rate: ~38%
        </p>
      </div>

      {/* After panel */}
      <div
        className="rounded-lg p-4 space-y-2"
        style={{
          backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
          borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <p className="text-xs font-semibold tracking-wide uppercase text-[color:var(--success)] mb-3">
          After — 3-swipe calibration
        </p>
        <ul className="space-y-2">
          {afterItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[color:var(--success)]" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <div
          className="mt-4 rounded-md px-3 py-2"
          style={{
            backgroundColor: "color-mix(in oklch, var(--success) 12%, transparent)",
          }}
        >
          <p className="text-[10px] font-mono text-[color:var(--success)]">
            Model infers: Italian / casual / mid-range
          </p>
        </div>
        <p className="text-[10px] font-mono text-muted-foreground pt-1">
          Avg. completion rate: ~94%
        </p>
      </div>
    </div>
  );
}
