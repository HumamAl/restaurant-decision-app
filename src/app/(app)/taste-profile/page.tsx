"use client";

import { useState } from "react";
import {
  userProfiles,
  badges,
  cuisineCategories,
} from "@/data/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Lock, Flame, Trophy, Utensils, Globe } from "lucide-react";

// Use the first user (Jordan Reeves) as the "current user"
const currentUser = userProfiles[0];

const CUISINE_EMOJI: Record<string, string> = {
  Italian: "🍝",
  Thai: "🌶️",
  Japanese: "🍣",
  Mexican: "🌮",
  American: "🍔",
  Mediterranean: "🫒",
  Indian: "🫕",
  Korean: "🍜",
  Chinese: "🥟",
  Vietnamese: "🍲",
  French: "🥐",
  Greek: "🫙",
  "Middle Eastern": "🧆",
  Ethiopian: "🫓",
  Spanish: "🥘",
};

const RARITY_STYLE: Record<string, string> = {
  common: "border-border/60 bg-card",
  rare: "border-primary/30 bg-primary/5",
  legendary: "border-[color:var(--warning)]/40 bg-[color:var(--warning)]/5",
};

const RARITY_LABEL_STYLE: Record<string, string> = {
  common: "text-muted-foreground",
  rare: "text-primary",
  legendary: "text-[color:var(--warning)]",
};

export default function TasteProfilePage() {
  // Local state: toggle which cuisines are enabled
  const [enabledCuisines, setEnabledCuisines] = useState<Set<string>>(
    new Set(currentUser.tastePreferences)
  );

  function toggleCuisine(cuisine: string) {
    setEnabledCuisines((prev) => {
      const next = new Set(prev);
      if (next.has(cuisine)) {
        next.delete(cuisine);
      } else {
        next.add(cuisine);
      }
      return next;
    });
  }

  const earnedBadgeIds = new Set(currentUser.earnedBadgeIds);

  // Compute match percentages based on win rates for enabled cuisines
  const cuisineMatchData = cuisineCategories
    .filter((c) => enabledCuisines.has(c.label))
    .sort((a, b) => b.winRate - a.winRate);

  const topCuisine =
    cuisineMatchData[0]?.label ?? currentUser.tastePreferences[0];

  const enabledCount = enabledCuisines.size;

  return (
    <div className="p-4 md:p-6 space-y-6 animate-tab-fade">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Taste Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your cuisine preferences, dietary needs, and earned badges.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
            {currentUser.avatarInitials}
          </div>
          <span className="font-medium text-foreground">
            {currentUser.displayName}
          </span>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="linear-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Utensils className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Top Cuisine
              </span>
            </div>
            <p className="text-lg font-bold">
              {CUISINE_EMOJI[topCuisine] ?? "🍽️"} {topCuisine}
            </p>
          </CardContent>
        </Card>

        <Card className="linear-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Total Decisions
              </span>
            </div>
            <p className="text-2xl font-bold font-mono">
              {currentUser.decisionsTotal}
            </p>
          </CardContent>
        </Card>

        <Card className="linear-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-[color:var(--warning)]" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Current Streak
              </span>
            </div>
            <p className="text-2xl font-bold font-mono">
              {currentUser.streakDays}
              <span className="text-sm text-muted-foreground font-normal ml-1">
                days
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="linear-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Badges Earned
              </span>
            </div>
            <p className="text-2xl font-bold font-mono">
              {currentUser.earnedBadgeIds.length}
              <span className="text-sm text-muted-foreground font-normal ml-1">
                / {badges.length}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cuisine Preferences — interactive toggles */}
        <Card className="linear-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Cuisine Preferences
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                {enabledCount} enabled
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Toggle cuisines to personalize your decision pool.
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/60">
              {cuisineCategories.map((cat) => {
                const isEnabled = enabledCuisines.has(cat.label);
                const isPreferred = currentUser.tastePreferences.includes(
                  cat.label as never
                );
                return (
                  <div
                    key={cat.id}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 transition-colors duration-150",
                      isEnabled ? "bg-card" : "bg-muted/20"
                    )}
                  >
                    <span className="text-lg leading-none">{cat.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "text-sm font-medium",
                            !isEnabled && "text-muted-foreground"
                          )}
                        >
                          {cat.label}
                        </span>
                        {isPreferred && (
                          <Badge
                            variant="outline"
                            className="text-[10px] border-0 rounded-full text-primary bg-primary/10 py-0 px-1.5"
                          >
                            Fav
                          </Badge>
                        )}
                      </div>
                      {isEnabled && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all duration-150"
                              style={{ width: `${Math.min(cat.winRate, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground shrink-0">
                            {cat.winRate}%
                          </span>
                        </div>
                      )}
                    </div>
                    <Switch
                      checked={isEnabled}
                      onCheckedChange={() => toggleCuisine(cat.label)}
                      className="shrink-0"
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Right column: Dietary + Badges */}
        <div className="space-y-4">
          {/* Dietary Restrictions */}
          <Card className="linear-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Dietary Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentUser.dietaryRestrictions.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No dietary restrictions set.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {currentUser.dietaryRestrictions.map((r) => (
                    <Badge
                      key={r}
                      variant="outline"
                      className="text-sm border-border/60 text-foreground rounded-full capitalize px-3"
                    >
                      {r}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Badge Collection */}
          <Card className="linear-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Badge Collection
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {currentUser.earnedBadgeIds.length} earned · {badges.length - currentUser.earnedBadgeIds.length} locked
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {badges.map((badge, index) => {
                  const earned = earnedBadgeIds.has(badge.id);
                  return (
                    <div
                      key={badge.id}
                      title={
                        earned
                          ? badge.description
                          : `Locked: ${badge.unlockCondition}`
                      }
                      className={cn(
                        "linear-card rounded-lg p-3 flex flex-col items-center gap-1.5 text-center cursor-default animate-fade-in",
                        earned
                          ? RARITY_STYLE[badge.rarity]
                          : "border-border/40 bg-muted/30 opacity-50"
                      )}
                      style={{
                        animationDelay: `${index * 40}ms`,
                        animationDuration: "200ms",
                      }}
                    >
                      <span
                        className={cn(
                          "text-2xl leading-none",
                          !earned && "grayscale"
                        )}
                      >
                        {earned ? badge.emoji : <Lock className="w-5 h-5 text-muted-foreground" />}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] font-medium leading-tight",
                          earned
                            ? RARITY_LABEL_STYLE[badge.rarity]
                            : "text-muted-foreground"
                        )}
                      >
                        {badge.name}
                      </span>
                      {earned && (
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[9px] border-0 rounded-full py-0 px-1",
                            badge.rarity === "legendary"
                              ? "bg-[color:var(--warning)]/10 text-[color:var(--warning)]"
                              : badge.rarity === "rare"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {badge.rarity}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
