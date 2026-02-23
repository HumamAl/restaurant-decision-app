"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { restaurants } from "@/data/mock-data";
import type { Restaurant, CuisineType, PriceRange } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shuffle, MapPin, Star, Clock, Phone } from "lucide-react";

const CUISINE_OPTIONS: CuisineType[] = [
  "Italian",
  "Thai",
  "Japanese",
  "Mexican",
  "American",
  "Mediterranean",
  "Indian",
  "Korean",
  "Chinese",
  "Vietnamese",
  "French",
  "Greek",
  "Middle Eastern",
  "Ethiopian",
  "Spanish",
];

const PRICE_OPTIONS: PriceRange[] = ["$", "$$", "$$$", "$$$$"];

const CUISINE_EMOJI: Record<CuisineType, string> = {
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

function PriceLabel({ price }: { price: PriceRange }) {
  const labels: Record<PriceRange, string> = {
    $: "Budget",
    $$: "Moderate",
    $$$: "Upscale",
    $$$$: "Fine Dining",
  };
  return <span>{labels[price]}</span>;
}

function StatusBadge({ isOpen }: { isOpen: boolean }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium border-0 rounded-full",
        isOpen
          ? "text-[color:var(--success)] bg-[color:var(--success)]/10"
          : "text-destructive bg-destructive/10"
      )}
    >
      {isOpen ? "Open Now" : "Closed"}
    </Badge>
  );
}

type SpinState = "idle" | "spinning" | "result";

export default function SpinPage() {
  const [cuisineFilter, setCuisineFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [maxDistance, setMaxDistance] = useState<number>(5);
  const [spinState, setSpinState] = useState<SpinState>("idle");
  const [winner, setWinner] = useState<Restaurant | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      if (cuisineFilter !== "all" && r.cuisine !== cuisineFilter) return false;
      if (priceFilter !== "all" && r.priceRange !== priceFilter) return false;
      if (r.distanceMiles > maxDistance) return false;
      return true;
    });
  }, [cuisineFilter, priceFilter, maxDistance]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function handleSpin() {
    if (filtered.length === 0) return;
    setSpinState("spinning");
    setWinner(null);

    let ticks = 0;
    const totalTicks = 20 + Math.floor(Math.random() * 15);
    let delay = 60;

    function tick() {
      setCurrentIndex((prev) => (prev + 1) % filtered.length);
      ticks++;

      if (ticks >= totalTicks) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        const pickedIndex = Math.floor(Math.random() * filtered.length);
        setCurrentIndex(pickedIndex);
        setWinner(filtered[pickedIndex]);
        setSpinState("result");
      } else {
        // Gradually slow down
        if (ticks > totalTicks * 0.6) {
          delay = Math.min(delay + 30, 250);
        }
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(tick, delay);
      }
    }

    intervalRef.current = setInterval(tick, delay);
  }

  function handleReset() {
    setSpinState("idle");
    setWinner(null);
    setCurrentIndex(0);
  }

  const displayRestaurant =
    spinState === "spinning" || spinState === "result"
      ? filtered[currentIndex] ?? null
      : null;

  return (
    <div className="p-4 md:p-6 space-y-6 animate-tab-fade">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Spin the Wheel</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Can't decide? Let fate pick your next meal.
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Filters */}
        <div className="space-y-4">
          <Card className="linear-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Cuisine
                </label>
                <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Cuisine</SelectItem>
                    {CUISINE_OPTIONS.map((c) => (
                      <SelectItem key={c} value={c}>
                        {CUISINE_EMOJI[c]} {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Max Price
                </label>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    {PRICE_OPTIONS.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p} — <PriceLabel price={p} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Max Distance
                  </label>
                  <span className="text-xs font-mono font-medium text-foreground">
                    {maxDistance} mi
                  </span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={5}
                  step={0.5}
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0.5 mi</span>
                  <span>5 mi</span>
                </div>
              </div>

              <div className="pt-1 border-t border-border/60">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{filtered.length}</span> restaurant
                  {filtered.length !== 1 ? "s" : ""} in pool
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pool preview */}
          <Card className="linear-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Restaurant Pool</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground px-4 py-3">
                  No restaurants match your filters.
                </p>
              ) : (
                <div className="divide-y divide-border/60">
                  {filtered.slice(0, 6).map((r) => (
                    <div
                      key={r.id}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-150",
                        winner?.id === r.id && "bg-primary/5"
                      )}
                    >
                      <span className="text-base leading-none">
                        {CUISINE_EMOJI[r.cuisine]}
                      </span>
                      <span className="font-medium flex-1 truncate">{r.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {r.priceRange}
                      </span>
                    </div>
                  ))}
                  {filtered.length > 6 && (
                    <div className="px-4 py-2 text-xs text-muted-foreground">
                      +{filtered.length - 6} more
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Center + Right: Spin wheel area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Spinning display */}
          <Card
            className={cn(
              "linear-card overflow-hidden transition-all duration-150",
              spinState === "result" && winner && "border-primary/40"
            )}
          >
            <CardContent className="p-6">
              {spinState === "idle" && (
                <div className="flex flex-col items-center justify-center py-12 gap-6">
                  <div className="w-32 h-32 rounded-full border-4 border-border/60 border-dashed flex items-center justify-center text-5xl">
                    🍽️
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">Ready to spin?</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Set your filters and hit the button below.
                    </p>
                  </div>
                </div>
              )}

              {(spinState === "spinning" || spinState === "result") &&
                displayRestaurant && (
                  <div className="flex flex-col items-center gap-4 py-4">
                    {/* Big emoji + spinning indicator */}
                    <div
                      className={cn(
                        "w-24 h-24 rounded-full flex items-center justify-center text-5xl border-4 transition-all duration-150",
                        spinState === "spinning"
                          ? "border-primary/40 animate-spin"
                          : "border-primary/60 bg-primary/5"
                      )}
                      style={
                        spinState === "spinning"
                          ? { animationDuration: "0.4s" }
                          : {}
                      }
                    >
                      {CUISINE_EMOJI[displayRestaurant.cuisine]}
                    </div>

                    <div className="text-center">
                      <p
                        className={cn(
                          "text-xl font-bold transition-all duration-150",
                          spinState === "spinning" && "opacity-70 blur-[1px]"
                        )}
                      >
                        {displayRestaurant.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {displayRestaurant.cuisine} &bull;{" "}
                        {displayRestaurant.neighborhood}
                      </p>
                    </div>

                    {spinState === "spinning" && (
                      <p className="text-sm text-muted-foreground animate-pulse">
                        Spinning...
                      </p>
                    )}
                  </div>
                )}
            </CardContent>
          </Card>

          {/* Spin button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="px-10 gap-2"
              onClick={handleSpin}
              disabled={spinState === "spinning" || filtered.length === 0}
            >
              <Shuffle className="w-4 h-4" />
              {spinState === "spinning"
                ? "Spinning..."
                : spinState === "result"
                ? "Spin Again"
                : "Spin the Wheel"}
            </Button>
          </div>

          {/* Winner result card */}
          {spinState === "result" && winner && (
            <Card className="linear-card border-primary/30 bg-primary/5 animate-fade-in">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <span className="text-xl">{CUISINE_EMOJI[winner.cuisine]}</span>
                    {winner.name}
                  </CardTitle>
                  <StatusBadge isOpen={winner.isOpenNow} />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Star className="w-3.5 h-3.5 text-[color:var(--warning)]" />
                    <span className="font-mono font-medium">{winner.rating}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="font-mono">{winner.distanceMiles} mi</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-mono font-medium text-foreground">
                      {winner.priceRange}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      · {winner.cuisine}
                    </span>
                  </div>
                  {winner.waitMinutes !== null ? (
                    <div className="flex items-center gap-1.5 text-sm">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="font-mono">{winner.waitMinutes}m wait</span>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">No wait data</div>
                  )}
                </div>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    {winner.address}, {winner.neighborhood}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Phone className="w-3.5 h-3.5" />
                    {winner.phone}
                  </div>
                </div>

                {winner.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {winner.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-border/60 text-muted-foreground rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
