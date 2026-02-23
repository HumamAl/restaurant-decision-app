// Proposal page data — Restaurant Decision App
// All content tailored to the food/social decision domain.
// Outcome statements are exact from developer-profile.md — never inflated.

export interface PortfolioProject {
  name: string;
  description: string;
  outcome: string;
  tech: string[];
  url?: string; // omit if no live demo; ExternalLink icon omitted when undefined
}

export interface ApproachStep {
  step: string;
  title: string;
  description: string;
  timeline: string;
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface ProposalData {
  hero: {
    name: string;
    valueProp: string;
    badgeText: string;
    stats: HeroStat[];
  };
  projects: PortfolioProject[];
  approachSteps: ApproachStep[];
  skillCategories: SkillCategory[];
  cta: {
    heading: string;
    subtext: string;
    authorName: string;
  };
}

export const proposalData: ProposalData = {
  hero: {
    name: "Humam",
    valueProp:
      "I build social decision apps with real interactivity — group voting, gamified flows, and preference matching that actually make choosing where to eat fun.",
    badgeText: "Built this demo for your project",
    stats: [
      { value: "24+", label: "projects shipped" },
      { value: "< 48hr", label: "demo turnaround" },
      { value: "15+", label: "industries served" },
    ],
  },

  projects: [
    {
      name: "Outerbloom — AI Social Coordination",
      description:
        "AI-powered social event coordination platform that intelligently matches people, schedules, and venues — reducing the back-and-forth of group planning.",
      outcome:
        "AI-driven matching pipeline connecting users, schedules, and venues — reducing manual coordination overhead",
      tech: ["Next.js", "TypeScript", "shadcn/ui", "AI pipeline"],
      url: "https://outerbloom.vercel.app",
    },
    {
      name: "Event Planner SaaS",
      description:
        "Full-stack event management platform with calendar integration, CRUD operations, and attendee tracking — built for teams coordinating activities together.",
      outcome:
        "Calendar-driven event management with full CRUD, attendee tracking, and check-in workflows",
      tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
      // no url — omit ExternalLink icon
    },
    {
      name: "AI Store Builder",
      description:
        "Wizard-based flow that generates complete store pages with AI-written copy from a short brief — shows multi-step guided UX with AI decision support.",
      outcome:
        "Multi-step wizard UI that walks through brand inputs and generates a complete store page layout with AI-written copy",
      tech: ["Next.js", "TypeScript", "shadcn/ui", "AI generation pipeline"],
      // no url — omit ExternalLink icon
    },
    {
      name: "Sports Vision MVP",
      description:
        "Real-time sports object detection web demo simulating an AR scanning experience — demonstrates interactive, gamified UI with live feedback and confidence scores.",
      outcome:
        "AR-style scan UI with detection overlays, confidence scores, and accuracy visualization — delivered as a browser-based MVP",
      tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Recharts"],
      // no url — omit ExternalLink icon
    },
  ],

  approachSteps: [
    {
      step: "01",
      title: "Understand",
      description:
        "Map out the decision flow — solo vs. group, preference inputs, tie-breaking logic. One scoping session surfaces the questions that shape everything else.",
      timeline: "Day 1–2",
    },
    {
      step: "02",
      title: "Build",
      description:
        "Working screens from day one — decision engine, filters, swipe/bracket UI. You see real progress every few days, not just a status update.",
      timeline: "Day 3–10",
    },
    {
      step: "03",
      title: "Ship",
      description:
        "Production-ready on Vercel, clean TypeScript, well-structured components you can extend. No tangled state, no dead code.",
      timeline: "Day 11–14",
    },
    {
      step: "04",
      title: "Iterate",
      description:
        "Short feedback cycles — add a decision mode, tweak the ranking algorithm, adjust the UI. No two-week wait for a small change.",
      timeline: "Ongoing",
    },
  ],

  skillCategories: [
    {
      label: "Frontend",
      skills: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "Responsive design",
      ],
    },
    {
      label: "Interactive UI",
      skills: [
        "Gamification flows",
        "Multi-step wizards",
        "Swipe / bracket UX",
        "Recharts",
        "Animation",
      ],
    },
    {
      label: "AI & Decision Logic",
      skills: [
        "Claude API",
        "Preference matching",
        "Ranking algorithms",
        "Structured output",
        "Prompt engineering",
      ],
    },
    {
      label: "Deployment",
      skills: ["Vercel", "GitHub", "TypeScript strict mode", "ESLint"],
    },
  ],

  cta: {
    heading: "Let's build this together.",
    subtext:
      "I built this demo to show you exactly what I'd ship. The real product — with your decision logic and your data — will be even better.",
    authorName: "Humam",
  },
};
