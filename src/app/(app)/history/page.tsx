"use client";

import { useState, useMemo } from "react";
import {
  decisionSessions,
  restaurants,
  DECISION_MODE_LABELS,
} from "@/data/mock-data";
import type { DecisionMode, SessionOutcome } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatRelativeDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronUp, ChevronDown, Search, Download } from "lucide-react";

function ModeBadge({ mode }: { mode: DecisionMode }) {
  const styles: Record<DecisionMode, string> = {
    solo: "text-primary bg-primary/10",
    group: "text-[color:var(--success)] bg-[color:var(--success)]/10",
    spin: "text-[color:var(--warning)] bg-[color:var(--warning)]/10",
    bracket: "text-destructive bg-destructive/10",
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium border-0 rounded-full",
        styles[mode] ?? "text-muted-foreground bg-muted"
      )}
    >
      {DECISION_MODE_LABELS[mode] ?? mode}
    </Badge>
  );
}

function OutcomeBadge({ outcome }: { outcome: SessionOutcome }) {
  const config: Record<SessionOutcome, { label: string; className: string }> = {
    decided: {
      label: "Decided",
      className: "text-[color:var(--success)] bg-[color:var(--success)]/10",
    },
    "tie-broken": {
      label: "Tie Broken",
      className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10",
    },
    "no-match": {
      label: "No Match",
      className: "text-destructive bg-destructive/10",
    },
    skipped: {
      label: "Skipped",
      className: "text-muted-foreground bg-muted",
    },
  };
  const c = config[outcome] ?? {
    label: outcome,
    className: "text-muted-foreground bg-muted",
  };
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium border-0 rounded-full", c.className)}
    >
      {c.label}
    </Badge>
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

type SortKey = "sessionDate" | "durationSeconds";
type SortDir = "asc" | "desc";

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [modeFilter, setModeFilter] = useState<string>("all");
  const [outcomeFilter, setOutcomeFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("sessionDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const restaurantMap = useMemo(() => {
    const map: Record<string, string> = {};
    restaurants.forEach((r) => {
      map[r.id] = r.name;
    });
    return map;
  }, []);

  const processed = useMemo(() => {
    return decisionSessions.map((s) => ({
      ...s,
      winnerName: s.winnerId ? restaurantMap[s.winnerId] ?? "Unknown" : null,
      filtersLabel: [
        s.filtersApplied.cuisines.length > 0
          ? s.filtersApplied.cuisines.join(", ")
          : "Any cuisine",
        s.filtersApplied.maxPrice
          ? `Max ${s.filtersApplied.maxPrice}`
          : "Any price",
        s.filtersApplied.maxDistance
          ? `≤${s.filtersApplied.maxDistance}mi`
          : "Any distance",
      ]
        .filter(Boolean)
        .join(" · "),
    }));
  }, [restaurantMap]);

  const filtered = useMemo(() => {
    return processed
      .filter((s) => {
        if (modeFilter !== "all" && s.mode !== modeFilter) return false;
        if (outcomeFilter !== "all" && s.outcome !== outcomeFilter) return false;
        if (
          search.trim() !== "" &&
          !s.winnerName
            ?.toLowerCase()
            .includes(search.toLowerCase().trim())
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortKey === "sessionDate") {
          const aVal = new Date(a.sessionDate).getTime();
          const bVal = new Date(b.sessionDate).getTime();
          return sortDir === "asc" ? aVal - bVal : bVal - aVal;
        }
        if (sortKey === "durationSeconds") {
          return sortDir === "asc"
            ? a.durationSeconds - b.durationSeconds
            : b.durationSeconds - a.durationSeconds;
        }
        return 0;
      });
  }, [processed, search, modeFilter, outcomeFilter, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 inline ml-0.5" />
    ) : (
      <ChevronDown className="w-3 h-3 inline ml-0.5" />
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 animate-tab-fade">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Decision History</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Every session, every winner — sorted and searchable.
          </p>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Download className="w-3.5 h-3.5" />
          Export
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by restaurant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={modeFilter} onValueChange={setModeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Modes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modes</SelectItem>
            <SelectItem value="solo">Solo</SelectItem>
            <SelectItem value="group">Group</SelectItem>
            <SelectItem value="spin">Spin</SelectItem>
            <SelectItem value="bracket">Bracket</SelectItem>
          </SelectContent>
        </Select>

        <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All Outcomes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Outcomes</SelectItem>
            <SelectItem value="decided">Decided</SelectItem>
            <SelectItem value="tie-broken">Tie Broken</SelectItem>
            <SelectItem value="no-match">No Match</SelectItem>
            <SelectItem value="skipped">Skipped</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground">
          {filtered.length} session{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <Card className="linear-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => handleSort("sessionDate")}
                >
                  <span className="flex items-center gap-1">
                    Date <SortIcon col="sessionDate" />
                  </span>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Mode
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Winner
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer select-none"
                  onClick={() => handleSort("durationSeconds")}
                >
                  <span className="flex items-center gap-1">
                    Duration <SortIcon col="durationSeconds" />
                  </span>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Outcome
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden lg:table-cell">
                  Filters Used
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No sessions match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((session) => (
                  <TableRow
                    key={session.id}
                    className="transition-colors duration-100 hover:bg-muted/30"
                  >
                    <TableCell className="py-2 px-3 text-sm">
                      <div className="font-medium">
                        {formatRelativeDate(session.sessionDate)}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {session.id}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <ModeBadge mode={session.mode} />
                    </TableCell>
                    <TableCell className="py-2 px-3 text-sm">
                      {session.winnerName ? (
                        <span className="font-medium">{session.winnerName}</span>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <span className="font-mono text-sm tabular-nums">
                        {formatDuration(session.durationSeconds)}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <OutcomeBadge outcome={session.outcome} />
                    </TableCell>
                    <TableCell className="py-2 px-3 text-xs text-muted-foreground hidden lg:table-cell max-w-[200px] truncate">
                      {session.filtersLabel}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Notes callout for sessions with notes */}
      {filtered.some((s) => s.notes) && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Session Notes
          </h2>
          <div className="space-y-2">
            {filtered
              .filter((s) => s.notes)
              .map((s) => (
                <div
                  key={s.id}
                  className="linear-card p-3 flex items-start gap-3"
                >
                  <div className="shrink-0 mt-0.5">
                    <ModeBadge mode={s.mode} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {s.winnerName ?? "No winner"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeDate(s.sessionDate)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {s.notes}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
