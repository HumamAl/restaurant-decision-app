// Tab 3: Work With Me — sales page for the Restaurant Decision App proposal
// Server Component — no "use client" needed.

import { ExternalLink, TrendingUp } from "lucide-react";
import { proposalData } from "@/data/proposal";

export const metadata = { title: "Work With Me | DineDecide Demo by Humam" };

export default function ProposalPage() {
  const { hero, projects, approachSteps, skillCategories, cta } = proposalData;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8 md:px-6 space-y-10">

        {/* ── Section 1: Hero (Project Brief) ───────────────────────────── */}
        <section
          className="relative overflow-hidden rounded-lg"
          style={{ background: "oklch(0.10 0.02 var(--primary-h, 50))" }}
        >
          {/* Subtle radial highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 20% 30%, oklch(0.55 0.12 50 / 0.12), transparent 65%)",
            }}
          />

          {/* Main hero content */}
          <div className="relative z-10 px-8 py-10 md:px-12 md:py-14 space-y-6">
            {/* "Built for you" badge with pulsing dot */}
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/10 border border-white/10 text-white/80 px-3 py-1 rounded-full">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              {hero.badgeText}
            </span>

            {/* Name block — weight contrast typography */}
            <div className="space-y-2">
              <p className="font-mono text-xs tracking-widest uppercase text-white/40">
                Full-Stack Developer · Next.js Specialist
              </p>
              <h1 className="text-4xl md:text-5xl tracking-tight leading-none">
                <span className="font-light text-white/80">Hi, I&apos;m</span>{" "}
                <span className="font-black text-white">{hero.name}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                {hero.valueProp}
              </p>
            </div>
          </div>

          {/* Stats shelf — bottom of dark panel */}
          <div className="relative z-10 border-t border-white/10 bg-white/5 px-8 py-5 md:px-12">
            <div className="grid grid-cols-3 gap-6">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: Proof of Work ───────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Proof of Work
            </p>
            <h2 className="text-2xl font-bold tracking-tight">Relevant Projects</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Built for real use cases, shipped to production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div key={project.name} className="linear-card p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold leading-snug">{project.name}</h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-muted-foreground hover:text-primary transition-colors duration-100"
                      aria-label={`View ${project.name} live demo`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Outcome statement */}
                <div
                  className="flex items-start gap-2 rounded-md px-3 py-2"
                  style={{
                    backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
                    border: "1px solid color-mix(in oklch, var(--success) 18%, transparent)",
                  }}
                >
                  <TrendingUp className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[color:var(--success)]" />
                  <p className="text-xs font-medium text-[color:var(--success)]">
                    {project.outcome}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full border border-border/60 font-mono text-xs text-muted-foreground bg-muted/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: How I Work ──────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Process
            </p>
            <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>
            <p className="text-sm text-muted-foreground mt-1">
              No surprises. Visible progress. Short feedback loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approachSteps.map((step) => (
              <div key={step.step} className="linear-card p-5 flex gap-4">
                {/* Monospace step number */}
                <div className="shrink-0 pt-0.5">
                  <span className="font-mono text-2xl font-bold bg-gradient-to-b from-primary to-primary/40 bg-clip-text text-transparent tabular-nums">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <span className="font-mono text-xs text-muted-foreground shrink-0">
                      {step.timeline}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Skills Grid ─────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
              Stack
            </p>
            <h2 className="text-2xl font-bold tracking-tight">Relevant Skills</h2>
            <p className="text-sm text-muted-foreground mt-1">
              The tools that matter for this project.
            </p>
          </div>

          <div className="space-y-3">
            {skillCategories.map((category) => (
              <div key={category.label} className="linear-card p-5 space-y-3">
                <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  {category.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full border border-border/60 font-mono text-xs text-foreground/80 bg-muted/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 5: CTA ────────────────────────────────────────────── */}
        <section
          className="relative rounded-lg overflow-hidden text-center"
          style={{ background: "oklch(0.10 0.02 var(--primary-h, 50))" }}
        >
          <div className="relative z-10 px-8 py-10 md:px-12 space-y-4">
            {/* Pulsing availability indicator */}
            <div className="flex items-center justify-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "color-mix(in oklch, var(--success) 60%, transparent)" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "var(--success)" }} />
              </span>
              <span className="text-sm" style={{ color: "color-mix(in oklch, var(--success) 80%, white)" }}>
                Currently available for new projects
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl font-bold text-white">{cta.heading}</h2>

            {/* Body */}
            <p className="text-white/70 max-w-md mx-auto leading-relaxed">
              {cta.subtext}
            </p>

            {/* Primary action — text, not a dead-end button */}
            <p className="text-lg font-semibold text-white/90 pt-2">
              Reply on Upwork to start
            </p>

            {/* Navigation link back to demo */}
            <div>
              <a
                href="/"
                className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/60 transition-colors duration-100"
              >
                ← Back to the demo
              </a>
            </div>

            {/* Signature */}
            <p className="text-sm text-white/40 border-t border-white/10 pt-4 mt-2">
              — {cta.authorName}
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
