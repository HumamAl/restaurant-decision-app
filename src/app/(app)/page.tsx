"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Flame,
  Globe,
  Timer,
  Utensils,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
  Shuffle,
} from "lucide-react";
import {
  dashboardStats,
  cuisineBreakdown,
  decisionSessions,
  decisionModeBreakdown,
  getRestaurantById,
  decisionsOverTime,
} from "@/data/mock-data";
// Dynamically import chart components to avoid SSR issues
const CuisineChart = dynamic(() => import("@/components/dashboard/cuisine-chart"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] flex items-center justify-center text-muted-foreground text-sm">
      Loading chart...
    </div>
  ),
});

const ActivityChart = dynamic(() => import("@/components/dashboard/activity-chart"), {
  ssr: false,
  loading: () => (
    <div className="h-[180px] flex items-center justify-center text-muted-foreground text-sm">
      Loading chart...
    </div>
  ),
});

// Mode badge config
const modeBadgeConfig: Record<
  string,
  { label: string; bg: string; color: string; icon: React.ElementType }
> = {
  solo: {
    label: "Solo",
    bg: "color-mix(in oklch, var(--chart-1) 15%, transparent)",
    color: "var(--chart-1)",
    icon: Utensils,
  },
  group: {
    label: "Group",
    bg: "color-mix(in oklch, var(--chart-2) 15%, transparent)",
    color: "var(--chart-2)",
    icon: Users,
  },
  spin: {
    label: "Spin",
    bg: "color-mix(in oklch, var(--chart-3) 15%, transparent)",
    color: "var(--chart-3)",
    icon: Shuffle,
  },
  bracket: {
    label: "Bracket",
    bg: "color-mix(in oklch, var(--chart-4) 15%, transparent)",
    color: "var(--chart-4)",
    icon: Zap,
  },
};

function timeAgo(isoDate: string): string {
  const now = new Date("2026-02-23T12:00:00Z");
  const past = new Date(isoDate);
  const diffMs = now.getTime() - past.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

type ChartView = "cuisine" | "mode" | "activity";

export default function DashboardPage() {
  const [chartView, setChartView] = useState<ChartView>("cuisine");

  // Recent decision feed — last 8 sessions
  const recentSessions = [...decisionSessions]
    .sort(
      (a, b) =>
        new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime()
    )
    .slice(0, 8);

  const stats = [
    {
      title: "Decisions Made",
      value: dashboardStats.totalDecisions.toString(),
      description: `+${dashboardStats.decisionsChange}% · ${dashboardStats.totalDecisions} total sessions tracked`,
      icon: Utensils,
      positive: true,
    },
    {
      title: "Current Streak",
      value: `${dashboardStats.currentStreak} days`,
      description: `+${dashboardStats.streakChange}% · Keep it alive — decision due tonight`,
      icon: Flame,
      positive: true,
    },
    {
      title: "Cuisines Explored",
      value: `${dashboardStats.cuisinesExplored} / 15`,
      description: `+${dashboardStats.cuisinesChange}% · 4 cuisines still undiscovered`,
      icon: Globe,
      positive: true,
    },
    {
      title: "Avg Decision Time",
      value: formatDuration(dashboardStats.avgDecisionSeconds),
      description: `${dashboardStats.avgDecisionChange}% faster · Speed improving over time`,
      icon: Timer,
      positive: false, // negative change = faster = good
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tonight&apos;s Pick</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your decision history, streaks, and cuisine exploration at a glance.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg animate-fade-in"
            style={{
              animationDelay: `${index * 80}ms`,
              animationDuration: "200ms",
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-primary/70" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {stat.positive ? (
                  <TrendingUp className="w-3 h-3 text-[color:var(--success)] shrink-0" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-[color:var(--success)] shrink-0" />
                )}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Chart Section */}
      <Card className="linear-card p-0">
        <CardHeader className="px-6 pt-6 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-semibold">Decision Analytics</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                {chartView === "cuisine" && "Which cuisines win the most decisions"}
                {chartView === "mode" && "How you decide — mode usage and speed"}
                {chartView === "activity" && "Monthly decision volume vs target"}
              </p>
            </div>
            {/* Tab switcher — changes chart data */}
            <div className="flex gap-1 bg-muted rounded-lg p-1 shrink-0">
              {(
                [
                  { key: "cuisine", label: "Cuisines" },
                  { key: "mode", label: "Modes" },
                  { key: "activity", label: "Activity" },
                ] as { key: ChartView; label: string }[]
              ).map((tab) => (
                <Button
                  key={tab.key}
                  size="sm"
                  variant={chartView === tab.key ? "default" : "ghost"}
                  className="h-7 px-3 text-xs rounded-md transition-all duration-150"
                  onClick={() => setChartView(tab.key)}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2 pb-4">
          {chartView === "cuisine" && (
            <CuisineChart data={cuisineBreakdown} />
          )}
          {chartView === "mode" && (
            <CuisineChart data={decisionModeBreakdown.map((d) => ({
              cuisine: d.mode,
              emoji: "",
              count: d.count,
              share: Math.round((d.count / 94) * 100),
            }))} barLabel="sessions" />
          )}
          {chartView === "activity" && (
            <ActivityChart data={decisionsOverTime} />
          )}
        </CardContent>
      </Card>

      {/* Recent Decision Feed */}
      <Card className="linear-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Decisions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Your last 8 sessions — what won, how long it took
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground pl-6">
                  Restaurant
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Mode
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground hidden sm:table-cell">
                  Outcome
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground text-right hidden md:table-cell">
                  Duration
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground text-right pr-6">
                  When
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSessions.map((session) => {
                const winner = session.winnerId
                  ? getRestaurantById(session.winnerId)
                  : null;
                const modeConfig = modeBadgeConfig[session.mode];
                const ModeIcon = modeConfig.icon;

                return (
                  <TableRow key={session.id} className="linear-hover">
                    <TableCell className="pl-6">
                      {winner ? (
                        <div>
                          <p className="font-medium text-sm">{winner.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {winner.cuisine} · {winner.priceRange}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium text-sm text-muted-foreground">
                            No winner
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Filters too strict
                          </p>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="rounded-full text-xs gap-1 font-medium"
                        style={{
                          backgroundColor: modeConfig.bg,
                          color: modeConfig.color,
                          border: "none",
                        }}
                      >
                        <ModeIcon className="w-2.5 h-2.5" />
                        {modeConfig.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        className="rounded-full text-xs capitalize"
                        style={{
                          backgroundColor:
                            session.outcome === "decided"
                              ? "color-mix(in oklch, var(--success) 15%, transparent)"
                              : session.outcome === "no-match"
                              ? "color-mix(in oklch, var(--destructive) 15%, transparent)"
                              : "color-mix(in oklch, var(--warning) 15%, transparent)",
                          color:
                            session.outcome === "decided"
                              ? "var(--success)"
                              : session.outcome === "no-match"
                              ? "var(--destructive)"
                              : "var(--warning)",
                          border: "none",
                        }}
                      >
                        {session.outcome.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm tabular-nums text-right hidden md:table-cell">
                      {formatDuration(session.durationSeconds)}
                    </TableCell>
                    <TableCell className="text-right pr-6 text-sm text-muted-foreground">
                      {timeAgo(session.sessionDate)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Proposal Banner */}
      <div className="mt-8 linear-card p-4 border-primary/15 bg-gradient-to-r from-primary/5 to-transparent flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">
            This is a live demo built for your project
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Humam · Full-Stack Developer · Available now
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/challenges"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-100"
          >
            My approach →
          </a>
          <a
            href="/proposal"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors duration-100"
          >
            Work with me
          </a>
        </div>
      </div>
    </div>
  );
}
