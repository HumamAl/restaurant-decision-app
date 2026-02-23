import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Sidebar navigation
// ---------------------------------------------------------------------------
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ---------------------------------------------------------------------------
// Challenge visualization types (used by challenges page)
// ---------------------------------------------------------------------------
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// ---------------------------------------------------------------------------
// Proposal types (used by proposal page)
// ---------------------------------------------------------------------------
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ---------------------------------------------------------------------------
// Domain enumerations
// ---------------------------------------------------------------------------

/** Price tier displayed as $, $$, $$$, $$$$ */
export type PriceRange = "$" | "$$" | "$$$" | "$$$$";

/** Cuisine categories supported by the app */
export type CuisineType =
  | "Italian"
  | "Thai"
  | "Japanese"
  | "Mexican"
  | "American"
  | "Mediterranean"
  | "Indian"
  | "Korean"
  | "Chinese"
  | "Vietnamese"
  | "French"
  | "Greek"
  | "Middle Eastern"
  | "Ethiopian"
  | "Spanish";

/** Tags that describe a restaurant's vibe or dietary accommodations */
export type RestaurantTag =
  | "vegan-friendly"
  | "vegetarian-friendly"
  | "gluten-free-options"
  | "date-night"
  | "family-friendly"
  | "late-night"
  | "outdoor-seating"
  | "delivery"
  | "takeout-only"
  | "michelin-star"
  | "group-friendly"
  | "brunch"
  | "happy-hour"
  | "live-music"
  | "pet-friendly";

/** Decision modes available in the app */
export type DecisionMode = "solo" | "group" | "spin" | "bracket";

/** Outcome of a decision session */
export type SessionOutcome = "decided" | "no-match" | "skipped" | "tie-broken";

// ---------------------------------------------------------------------------
// Core entities
// ---------------------------------------------------------------------------

export interface Restaurant {
  id: string;
  name: string;
  cuisine: CuisineType;
  priceRange: PriceRange;
  /** Star rating, 1 decimal place, range 3.2–4.9 */
  rating: number;
  /** Distance in miles from user location */
  distanceMiles: number;
  tags: RestaurantTag[];
  /** Slug used to resolve an image (e.g., from a CDN or /public folder) */
  imageSlug: string;
  address: string;
  neighborhood: string;
  /** Estimated wait time in minutes; null when no wait data available */
  waitMinutes: number | null;
  /** Number of times chosen across all decision sessions */
  timesChosen: number;
  /** User's personal rating (1-5); null if never rated */
  userRating: number | null;
  isOpenNow: boolean;
  /** Phone number in (xxx) xxx-xxxx format */
  phone: string;
  addedAt: string; // ISO date string
}

export interface DecisionSession {
  id: string;
  mode: DecisionMode;
  /** IDs of participants in a group session; single item for solo mode */
  participantIds: string[];
  /** Restaurant ID of the winner; null if no match found or session skipped */
  winnerId: string | null;
  outcome: SessionOutcome;
  /** Filters applied before the decision was made */
  filtersApplied: {
    cuisines: CuisineType[];
    maxPrice: PriceRange | null;
    maxDistance: number | null;
    tags: RestaurantTag[];
  };
  /** Total decision time in seconds */
  durationSeconds: number;
  /** Number of rounds in bracket mode; null for other modes */
  bracketRounds: number | null;
  /** True when a bracket participant skipped at least one round */
  hadSkippedRound: boolean;
  sessionDate: string; // ISO date string
  /** Notes added after the session; null if not provided */
  notes: string | null;
}

export interface UserProfile {
  id: string;
  displayName: string;
  avatarInitials: string;
  email: string;
  /** Array of preferred cuisine types in priority order */
  tastePreferences: CuisineType[];
  /** Dietary restrictions and special needs */
  dietaryRestrictions: string[];
  /** Number of consecutive days with at least one decision */
  streakDays: number;
  /** Total decisions made all-time */
  decisionsTotal: number;
  /** IDs of badges the user has earned */
  earnedBadgeIds: string[];
  /** Most visited neighborhood for restaurant choices */
  favoriteNeighborhood: string;
  joinedAt: string; // ISO date string
  lastActiveAt: string; // ISO date string
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  /** Emoji icon representing the badge */
  emoji: string;
  /** Unlock condition displayed in the UI */
  unlockCondition: string;
  /** Date the badge was earned; null if not yet earned by the active user */
  earnedAt: string | null;
  /** Rarity tier affecting visual treatment */
  rarity: "common" | "rare" | "legendary";
}

export interface CuisineCategory {
  id: string;
  label: CuisineType;
  emoji: string;
  /** Number of times this cuisine was chosen as the session winner */
  matchCount: number;
  /** Percentage of total decisions where this cuisine won */
  winRate: number;
}

// ---------------------------------------------------------------------------
// Dashboard aggregates
// ---------------------------------------------------------------------------

export interface DashboardStats {
  /** Total decision sessions ever created */
  totalDecisions: number;
  /** Change vs prior 30 days, percentage */
  decisionsChange: number;
  /** Current active streak in days */
  currentStreak: number;
  /** Change vs prior period streak */
  streakChange: number;
  /** Number of distinct cuisines tried at least once */
  cuisinesExplored: number;
  /** Change vs prior 30 days */
  cuisinesChange: number;
  /** Average seconds to reach a decision */
  avgDecisionSeconds: number;
  /** Change vs prior 30 days, percentage (negative = faster = good) */
  avgDecisionChange: number;
  /** Total restaurants saved to the user's list */
  savedRestaurants: number;
  /** Badges earned so far */
  badgesEarned: number;
}

// ---------------------------------------------------------------------------
// Chart data shapes
// ---------------------------------------------------------------------------

export interface ChartDataPoint {
  month: string;
  value: number;
  /** Optional comparison target or secondary series */
  target?: number;
}

export interface CuisineBreakdownPoint {
  cuisine: string;
  emoji: string;
  count: number;
  /** Percentage share of total decisions */
  share: number;
}

export interface DecisionModeDataPoint {
  mode: string;
  count: number;
  avgSeconds: number;
}

export interface WeeklyActivityPoint {
  day: string;
  decisions: number;
  streakDay: boolean;
}
