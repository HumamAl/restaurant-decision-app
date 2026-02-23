"use client";

import { useState } from "react";
import { restaurants } from "@/data/mock-data";
import type { Restaurant } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Trophy, RotateCcw } from "lucide-react";

// Use first 8 restaurants for the bracket
const BRACKET_RESTAURANTS = restaurants.slice(0, 8);

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

// Bracket state: rounds[0] = QF (4 matches), rounds[1] = SF (2 matches), rounds[2] = Final (1 match)
type BracketRound = (Restaurant | null)[][];

function buildInitialBracket(): BracketRound[] {
  // Round 0: quarterfinals — 4 pairs from 8 restaurants
  const qf: (Restaurant | null)[][] = [
    [BRACKET_RESTAURANTS[0], BRACKET_RESTAURANTS[1]],
    [BRACKET_RESTAURANTS[2], BRACKET_RESTAURANTS[3]],
    [BRACKET_RESTAURANTS[4], BRACKET_RESTAURANTS[5]],
    [BRACKET_RESTAURANTS[6], BRACKET_RESTAURANTS[7]],
  ];
  // Round 1: semifinals — 2 slots, TBD
  const sf: (Restaurant | null)[][] = [[null, null], [null, null]];
  // Round 2: final — 1 slot
  const final: (Restaurant | null)[][] = [[null, null]];
  return [qf, sf, final];
}

function RestaurantCard({
  restaurant,
  onPick,
  picked,
  disabled,
  winner,
}: {
  restaurant: Restaurant | null;
  onPick?: () => void;
  picked?: boolean;
  disabled?: boolean;
  winner?: boolean;
}) {
  if (!restaurant) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-lg border border-dashed border-border/60 bg-muted/30 text-sm text-muted-foreground min-h-[56px]">
        TBD
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-3 rounded-lg border transition-all duration-150",
        winner
          ? "border-primary/40 bg-primary/8"
          : picked
          ? "border-border/60 bg-muted/40 opacity-50"
          : "border-border/60 bg-card"
      )}
    >
      <span className="text-xl leading-none">
        {CUISINE_EMOJI[restaurant.cuisine] ?? "🍽️"}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{restaurant.name}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Star className="w-3 h-3 text-[color:var(--warning)]" />
          <span className="text-xs font-mono text-muted-foreground">
            {restaurant.rating}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">
            {restaurant.priceRange}
          </span>
        </div>
      </div>
      {onPick && !disabled && (
        <Button
          size="sm"
          variant={winner ? "default" : "outline"}
          className="shrink-0 text-xs h-7 px-2"
          onClick={onPick}
        >
          Pick
        </Button>
      )}
      {winner && (
        <Trophy className="w-4 h-4 text-primary shrink-0" />
      )}
    </div>
  );
}

function MatchCard({
  pair,
  matchIndex,
  roundIndex,
  winner,
  onPick,
  bothPresent,
}: {
  pair: (Restaurant | null)[];
  matchIndex: number;
  roundIndex: number;
  winner: Restaurant | null;
  onPick: (roundIndex: number, matchIndex: number, picked: Restaurant) => void;
  bothPresent: boolean;
}) {
  const roundLabels = ["Quarterfinals", "Semifinals", "Final"];

  return (
    <div className="linear-card p-3 space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {roundLabels[roundIndex]} · Match {matchIndex + 1}
      </p>
      <RestaurantCard
        restaurant={pair[0]}
        onPick={
          bothPresent && !winner
            ? () => onPick(roundIndex, matchIndex, pair[0]!)
            : undefined
        }
        winner={winner?.id === pair[0]?.id}
        picked={!!winner && winner.id !== pair[0]?.id}
        disabled={!bothPresent || !!winner}
      />
      <div className="text-center text-xs font-bold text-muted-foreground">
        VS
      </div>
      <RestaurantCard
        restaurant={pair[1]}
        onPick={
          bothPresent && !winner
            ? () => onPick(roundIndex, matchIndex, pair[1]!)
            : undefined
        }
        winner={winner?.id === pair[1]?.id}
        picked={!!winner && winner.id !== pair[1]?.id}
        disabled={!bothPresent || !!winner}
      />
    </div>
  );
}

export default function BracketPage() {
  const [rounds, setRounds] = useState<BracketRound[]>(buildInitialBracket);
  const [roundWinners, setRoundWinners] = useState<(Restaurant | null)[][]>([
    [null, null, null, null], // QF winners
    [null, null],             // SF winners
    [null],                   // Final winner
  ]);
  const [champion, setChampion] = useState<Restaurant | null>(null);

  function handlePick(
    roundIndex: number,
    matchIndex: number,
    picked: Restaurant
  ) {
    // Set the winner for this match
    const newWinners = roundWinners.map((r) => [...r]);
    newWinners[roundIndex][matchIndex] = picked;
    setRoundWinners(newWinners);

    // Advance winner to next round
    const newRounds = rounds.map((r) => r.map((m) => [...m]));

    if (roundIndex === 0) {
      // QF → SF: matches 0,1 → SF slot 0; matches 2,3 → SF slot 1
      const sfMatchIndex = Math.floor(matchIndex / 2);
      const sfSlot = matchIndex % 2;
      newRounds[1][sfMatchIndex][sfSlot] = picked;
    } else if (roundIndex === 1) {
      // SF → Final
      newRounds[2][0][matchIndex] = picked;
    } else if (roundIndex === 2) {
      // Final — set champion
      setChampion(picked);
    }

    setRounds(newRounds);
  }

  function handleReset() {
    setRounds(buildInitialBracket());
    setRoundWinners([
      [null, null, null, null],
      [null, null],
      [null],
    ]);
    setChampion(null);
  }

  const roundLabels = ["Quarterfinals", "Semifinals", "Final"];
  const roundCounts = [4, 2, 1];

  return (
    <div className="p-4 md:p-6 space-y-6 animate-tab-fade">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Group Bracket</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tournament-style voting — 8 restaurants, one winner.
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={handleReset} className="gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Bracket
        </Button>
      </div>

      {/* Champion banner */}
      {champion && (
        <Card className="linear-card border-primary/40 bg-primary/5 animate-fade-in">
          <CardContent className="p-4 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-2xl">
                {CUISINE_EMOJI[champion.cuisine] ?? "🍽️"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    Champion
                  </span>
                </div>
                <p className="text-lg font-bold">{champion.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm ml-auto flex-wrap">
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[color:var(--warning)]" />
                <span className="font-mono font-medium">{champion.rating}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                {champion.distanceMiles} mi · {champion.neighborhood}
              </div>
              <Badge
                variant="outline"
                className="text-xs border-border/60 text-muted-foreground rounded-full"
              >
                {champion.cuisine}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-border/60 font-mono rounded-full"
              >
                {champion.priceRange}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bracket rounds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold">{roundLabels[roundIndex]}</h2>
              <Badge
                variant="outline"
                className="text-xs border-border/60 text-muted-foreground rounded-full"
              >
                {roundCounts[roundIndex]} match{roundCounts[roundIndex] !== 1 ? "es" : ""}
              </Badge>
            </div>
            <div className="space-y-3">
              {round.map((pair, matchIndex) => {
                const bothPresent = !!pair[0] && !!pair[1];
                const matchWinner = roundWinners[roundIndex][matchIndex] ?? null;

                return (
                  <MatchCard
                    key={matchIndex}
                    pair={pair}
                    matchIndex={matchIndex}
                    roundIndex={roundIndex}
                    winner={matchWinner}
                    onPick={handlePick}
                    bothPresent={bothPresent}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Progress info */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>
          {roundWinners.flat().filter(Boolean).length} of{" "}
          {roundWinners.flat().length} matches decided
        </span>
        {!champion && (
          <span>·</span>
        )}
        {!champion && (
          <span>Pick the winner from each match to advance the bracket.</span>
        )}
      </div>
    </div>
  );
}
