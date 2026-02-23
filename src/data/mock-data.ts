import type {
  Restaurant,
  DecisionSession,
  UserProfile,
  Badge,
  CuisineCategory,
  CuisineType,
  RestaurantTag,
  DashboardStats,
  ChartDataPoint,
  CuisineBreakdownPoint,
  DecisionModeDataPoint,
  WeeklyActivityPoint,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// Date helpers — all relative to 2026-02-23 (today)
// ---------------------------------------------------------------------------
const BASE = new Date("2026-02-23T12:00:00Z");
function daysAgo(n: number): string {
  const d = new Date(BASE);
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

// ---------------------------------------------------------------------------
// Restaurants — 18 records
// ---------------------------------------------------------------------------
export const restaurants: Restaurant[] = [
  { id: "RST-4812", name: "Osteria Bellavia",      cuisine: "Italian",        priceRange: "$$$",  rating: 4.7, distanceMiles: 0.8, tags: ["date-night", "outdoor-seating", "gluten-free-options"], imageSlug: "osteria-bellavia",      address: "1142 N Clark St",      neighborhood: "Lincoln Park",  waitMinutes: 25,   timesChosen: 14, userRating: 5,    isOpenNow: true,  phone: "(312) 555-0194", addedAt: daysAgo(74) },
  { id: "RST-4819", name: "Bangkok Garden",        cuisine: "Thai",           priceRange: "$$",   rating: 4.4, distanceMiles: 1.3, tags: ["vegan-friendly", "vegetarian-friendly", "delivery", "gluten-free-options"], imageSlug: "bangkok-garden",        address: "3307 N Broadway",      neighborhood: "Lakeview",      waitMinutes: 10,   timesChosen: 9,  userRating: 4,    isOpenNow: true,  phone: "(773) 555-0231", addedAt: daysAgo(61) },
  { id: "RST-4823", name: "Sakura Omakase",        cuisine: "Japanese",       priceRange: "$$$$", rating: 4.9, distanceMiles: 2.1, tags: ["date-night", "michelin-star", "group-friendly"], imageSlug: "sakura-omakase",        address: "806 W Randolph St",    neighborhood: "West Loop",     waitMinutes: null, timesChosen: 6,  userRating: 5,    isOpenNow: false, phone: "(312) 555-0382", addedAt: daysAgo(82) },
  { id: "RST-4827", name: "El Huarache Veloz",     cuisine: "Mexican",        priceRange: "$",    rating: 4.3, distanceMiles: 0.5, tags: ["family-friendly", "takeout-only", "vegan-friendly"], imageSlug: "el-huarache-veloz",     address: "2918 W Lawrence Ave",  neighborhood: "Albany Park",   waitMinutes: 5,    timesChosen: 18, userRating: 4,    isOpenNow: true,  phone: "(773) 555-0117", addedAt: daysAgo(90) },
  { id: "RST-4831", name: "Smokehouse & Sons",     cuisine: "American",       priceRange: "$$",   rating: 4.2, distanceMiles: 1.7, tags: ["family-friendly", "group-friendly", "late-night", "outdoor-seating"], imageSlug: "smokehouse-and-sons",   address: "4419 N Western Ave",   neighborhood: "Ravenswood",    waitMinutes: 35,   timesChosen: 11, userRating: 3,    isOpenNow: true,  phone: "(773) 555-0448", addedAt: daysAgo(55) },
  { id: "RST-4835", name: "Levant Kitchen",        cuisine: "Mediterranean",  priceRange: "$$",   rating: 4.6, distanceMiles: 1.1, tags: ["vegan-friendly", "vegetarian-friendly", "outdoor-seating", "date-night"], imageSlug: "levant-kitchen",        address: "2011 W Division St",   neighborhood: "Wicker Park",   waitMinutes: 15,   timesChosen: 13, userRating: 5,    isOpenNow: true,  phone: "(773) 555-0562", addedAt: daysAgo(48) },
  { id: "RST-4839", name: "Spice Route",           cuisine: "Indian",         priceRange: "$$",   rating: 4.5, distanceMiles: 0.9, tags: ["vegan-friendly", "vegetarian-friendly", "gluten-free-options", "delivery"], imageSlug: "spice-route",           address: "1729 W Devon Ave",     neighborhood: "Rogers Park",   waitMinutes: 20,   timesChosen: 7,  userRating: 4,    isOpenNow: true,  phone: "(773) 555-0673", addedAt: daysAgo(37) },
  { id: "RST-4843", name: "Seoul Bowl",            cuisine: "Korean",         priceRange: "$$",   rating: 4.4, distanceMiles: 1.6, tags: ["late-night", "group-friendly", "delivery"], imageSlug: "seoul-bowl",            address: "3508 N Clark St",      neighborhood: "Boystown",      waitMinutes: 0,    timesChosen: 10, userRating: 4,    isOpenNow: true,  phone: "(773) 555-0784", addedAt: daysAgo(29) },
  { id: "RST-4847", name: "Jade Dynasty",          cuisine: "Chinese",        priceRange: "$",    rating: 4.1, distanceMiles: 0.6, tags: ["family-friendly", "delivery", "takeout-only"], imageSlug: "jade-dynasty",          address: "2214 S Wentworth Ave", neighborhood: "Chinatown",     waitMinutes: 8,    timesChosen: 16, userRating: null, isOpenNow: true,  phone: "(312) 555-0891", addedAt: daysAgo(86) },
  { id: "RST-4851", name: "Pho Saigon Express",    cuisine: "Vietnamese",     priceRange: "$",    rating: 4.3, distanceMiles: 2.4, tags: ["gluten-free-options", "delivery", "vegan-friendly"], imageSlug: "pho-saigon-express",    address: "4827 N Sheridan Rd",   neighborhood: "Uptown",        waitMinutes: null, timesChosen: 8,  userRating: 4,    isOpenNow: false, phone: "(773) 555-0925", addedAt: daysAgo(43) },
  { id: "RST-4854", name: "Maison Colette",        cuisine: "French",         priceRange: "$$$$", rating: 4.8, distanceMiles: 3.2, tags: ["date-night", "michelin-star", "outdoor-seating", "live-music"], imageSlug: "maison-colette",        address: "720 N Michigan Ave",   neighborhood: "Streeterville", waitMinutes: 40,   timesChosen: 4,  userRating: 5,    isOpenNow: true,  phone: "(312) 555-1047", addedAt: daysAgo(21) },
  { id: "RST-4857", name: "Zorba's Taverna",       cuisine: "Greek",          priceRange: "$$",   rating: 4.2, distanceMiles: 1.9, tags: ["family-friendly", "outdoor-seating", "pet-friendly", "happy-hour"], imageSlug: "zorbas-taverna",        address: "3204 N Halsted St",    neighborhood: "Lakeview",      waitMinutes: 12,   timesChosen: 5,  userRating: 3,    isOpenNow: true,  phone: "(773) 555-1132", addedAt: daysAgo(16) },
  { id: "RST-4861", name: "Habibi Grill",          cuisine: "Middle Eastern", priceRange: "$$",   rating: 4.5, distanceMiles: 1.4, tags: ["vegan-friendly", "gluten-free-options", "late-night", "delivery"], imageSlug: "habibi-grill",          address: "5012 N Kedzie Ave",    neighborhood: "Albany Park",   waitMinutes: 5,    timesChosen: 12, userRating: 5,    isOpenNow: true,  phone: "(773) 555-1218", addedAt: daysAgo(33) },
  { id: "RST-4865", name: "Addis Abeba Kitchen",   cuisine: "Ethiopian",      priceRange: "$",    rating: 4.6, distanceMiles: 2.7, tags: ["vegan-friendly", "vegetarian-friendly", "group-friendly"], imageSlug: "addis-abeba-kitchen",   address: "6119 N Ashland Ave",   neighborhood: "Edgewater",     waitMinutes: 18,   timesChosen: 3,  userRating: null, isOpenNow: true,  phone: "(773) 555-1334", addedAt: daysAgo(7)  },
  { id: "RST-4869", name: "Tapas El Gato",         cuisine: "Spanish",        priceRange: "$$$",  rating: 4.5, distanceMiles: 0.7, tags: ["date-night", "late-night", "happy-hour", "live-music", "outdoor-seating"], imageSlug: "tapas-el-gato",         address: "1841 W North Ave",     neighborhood: "Wicker Park",   waitMinutes: 30,   timesChosen: 7,  userRating: 4,    isOpenNow: false, phone: "(773) 555-1451", addedAt: daysAgo(11) },
  // Edge: brand-new, zero choices, longest wait (boundary + max-value)
  { id: "RST-4873", name: "The Brunch Collective",  cuisine: "American",       priceRange: "$$",   rating: 3.2, distanceMiles: 0.3, tags: ["brunch", "pet-friendly", "outdoor-seating"], imageSlug: "the-brunch-collective",  address: "2703 N Milwaukee Ave", neighborhood: "Logan Square",  waitMinutes: 55,   timesChosen: 0,  userRating: null, isOpenNow: true,  phone: "(773) 555-1567", addedAt: daysAgo(2)  },
  // Edge: permanently closed but still in list (flagged closed state)
  { id: "RST-4876", name: "Kimchi Village",         cuisine: "Korean",         priceRange: "$",    rating: 4.8, distanceMiles: 1.1, tags: ["late-night", "delivery", "group-friendly"], imageSlug: "kimchi-village",         address: "3614 W Lawrence Ave",  neighborhood: "Albany Park",   waitMinutes: null, timesChosen: 21, userRating: 5,    isOpenNow: false, phone: "(773) 555-1689", addedAt: daysAgo(95) },
  // Edge: max dietary tags (satisfies 3+ restriction types)
  { id: "RST-4879", name: "Greenroots Cafe",        cuisine: "Mediterranean",  priceRange: "$$",   rating: 4.4, distanceMiles: 1.8, tags: ["vegan-friendly", "vegetarian-friendly", "gluten-free-options", "outdoor-seating", "pet-friendly", "brunch"], imageSlug: "greenroots-cafe", address: "1508 W Diversey Pkwy", neighborhood: "Lincoln Park", waitMinutes: 22, timesChosen: 9, userRating: 4, isOpenNow: true, phone: "(773) 555-1742", addedAt: daysAgo(18) },
];

// ---------------------------------------------------------------------------
// User Profiles — 4 records
// ---------------------------------------------------------------------------
export const userProfiles: UserProfile[] = [
  {
    id: "USR-2041",
    displayName: "Jordan Reeves",
    avatarInitials: "JR",
    email: "jordan.reeves@gmail.com",
    tastePreferences: ["Japanese", "Korean", "Thai", "Mediterranean"],
    dietaryRestrictions: [],
    streakDays: 12,
    decisionsTotal: 94,
    earnedBadgeIds: ["BDG-001", "BDG-002", "BDG-003", "BDG-005", "BDG-006", "BDG-011"],
    favoriteNeighborhood: "Wicker Park",
    joinedAt: daysAgo(120),
    lastActiveAt: daysAgo(0),
  },
  {
    // Edge: 3+ dietary restrictions; streak broken after 7-day run
    id: "USR-2047",
    displayName: "Priya Menon",
    avatarInitials: "PM",
    email: "p.menon@outlook.com",
    tastePreferences: ["Indian", "Thai", "Mediterranean", "Ethiopian"],
    dietaryRestrictions: ["gluten-free", "nut allergy", "dairy-free"],
    streakDays: 0,
    decisionsTotal: 47,
    earnedBadgeIds: ["BDG-001", "BDG-004"],
    favoriteNeighborhood: "Rogers Park",
    joinedAt: daysAgo(88),
    lastActiveAt: daysAgo(8),
  },
  {
    id: "USR-2053",
    displayName: "Marcus Delacroix",
    avatarInitials: "MD",
    email: "mdelacroix@icloud.com",
    tastePreferences: ["French", "Italian", "Spanish", "American"],
    dietaryRestrictions: ["vegetarian"],
    streakDays: 5,
    decisionsTotal: 61,
    earnedBadgeIds: ["BDG-001", "BDG-002", "BDG-007"],
    favoriteNeighborhood: "Lincoln Park",
    joinedAt: daysAgo(75),
    lastActiveAt: daysAgo(1),
  },
  {
    id: "USR-2059",
    displayName: "Nia Osei-Bonsu",
    avatarInitials: "NO",
    email: "nia.ob@proton.me",
    tastePreferences: ["Ethiopian", "Middle Eastern", "Korean", "Mexican"],
    dietaryRestrictions: ["halal"],
    streakDays: 3,
    decisionsTotal: 28,
    earnedBadgeIds: ["BDG-001"],
    favoriteNeighborhood: "Albany Park",
    joinedAt: daysAgo(30),
    lastActiveAt: daysAgo(2),
  },
];

// ---------------------------------------------------------------------------
// Decision Sessions — 17 records
// ---------------------------------------------------------------------------
type SessionFilters = DecisionSession["filtersApplied"];
const emptyFilters = (overrides: Partial<SessionFilters>): SessionFilters => ({
  cuisines: [] as CuisineType[],
  maxPrice: null,
  maxDistance: null,
  tags: [] as RestaurantTag[],
  ...overrides,
});

export const decisionSessions: DecisionSession[] = [
  { id: "SES-8841", mode: "solo",    participantIds: ["USR-2041"],                          winnerId: "RST-4812", outcome: "decided",    filtersApplied: emptyFilters({ cuisines: ["Italian", "Mediterranean"], maxPrice: "$$$",  maxDistance: 1.5, tags: ["date-night"] }),          durationSeconds: 34,  bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(1),  notes: "Osteria for date night — she loved it" },
  { id: "SES-8836", mode: "group",   participantIds: ["USR-2041", "USR-2053", "USR-2059"],  winnerId: "RST-4827", outcome: "decided",    filtersApplied: emptyFilters({ maxPrice: "$$", maxDistance: 2.0, tags: ["family-friendly"] }),                                              durationSeconds: 112, bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(2),  notes: null },
  { id: "SES-8829", mode: "spin",    participantIds: ["USR-2041"],                          winnerId: "RST-4843", outcome: "decided",    filtersApplied: emptyFilters({ cuisines: ["Korean", "Japanese", "Chinese"], maxPrice: "$$", maxDistance: 2.5 }),                           durationSeconds: 18,  bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(3),  notes: null },
  { id: "SES-8821", mode: "bracket", participantIds: ["USR-2041", "USR-2047"],              winnerId: "RST-4835", outcome: "decided",    filtersApplied: emptyFilters({ cuisines: ["Mediterranean", "Indian", "Thai", "Vietnamese"], maxPrice: "$$$", maxDistance: 2.0, tags: ["vegan-friendly"] }), durationSeconds: 187, bracketRounds: 3, hadSkippedRound: false, sessionDate: daysAgo(4), notes: "Priya finally agreed on Mediterranean" },
  { id: "SES-8814", mode: "solo",    participantIds: ["USR-2041"],                          winnerId: "RST-4839", outcome: "decided",    filtersApplied: emptyFilters({ cuisines: ["Indian"], maxPrice: "$$", maxDistance: 1.5, tags: ["delivery"] }),                              durationSeconds: 22,  bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(5),  notes: null },
  { id: "SES-8807", mode: "spin",    participantIds: ["USR-2053"],                          winnerId: "RST-4854", outcome: "decided",    filtersApplied: emptyFilters({ cuisines: ["French", "Italian"], maxPrice: "$$$$", maxDistance: 4.0, tags: ["date-night"] }),               durationSeconds: 11,  bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(6),  notes: "Spontaneous fancy dinner" },
  // Edge: no restaurant matched all filters
  { id: "SES-8799", mode: "group",   participantIds: ["USR-2041", "USR-2047", "USR-2053", "USR-2059"], winnerId: null, outcome: "no-match", filtersApplied: emptyFilters({ cuisines: ["Ethiopian"], maxPrice: "$", maxDistance: 0.5, tags: ["gluten-free-options", "vegan-friendly", "delivery"] }), durationSeconds: 63, bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(7), notes: "Filters too strict — widened radius next session" },
  // Edge: bracket with skipped round → tie-broken outcome
  { id: "SES-8791", mode: "bracket", participantIds: ["USR-2041", "USR-2059"],              winnerId: "RST-4861", outcome: "tie-broken", filtersApplied: emptyFilters({ cuisines: ["Middle Eastern", "Mediterranean"], maxPrice: "$$", maxDistance: 2.0 }),                        durationSeconds: 243, bracketRounds: 4, hadSkippedRound: true,  sessionDate: daysAgo(8),  notes: "Nia skipped round 2 — broke tie manually" },
  { id: "SES-8782", mode: "solo",    participantIds: ["USR-2047"],                          winnerId: "RST-4819", outcome: "decided",    filtersApplied: emptyFilters({ cuisines: ["Thai", "Indian"], maxPrice: "$$", maxDistance: 2.0, tags: ["gluten-free-options"] }),           durationSeconds: 29,  bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(9),  notes: null },
  { id: "SES-8773", mode: "spin",    participantIds: ["USR-2041"],                          winnerId: "RST-4873", outcome: "decided",    filtersApplied: emptyFilters({ maxPrice: "$$", maxDistance: 0.5, tags: ["brunch"] }),                                                     durationSeconds: 8,   bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(11), notes: "Tried the new brunch spot" },
  { id: "SES-8764", mode: "group",   participantIds: ["USR-2041", "USR-2053"],              winnerId: "RST-4847", outcome: "decided",    filtersApplied: emptyFilters({ cuisines: ["Chinese", "Japanese", "Korean"], maxPrice: "$", maxDistance: 1.5 }),                           durationSeconds: 78,  bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(14), notes: null },
  { id: "SES-8755", mode: "solo",    participantIds: ["USR-2059"],                          winnerId: "RST-4865", outcome: "decided",    filtersApplied: emptyFilters({ cuisines: ["Ethiopian", "Middle Eastern"], maxPrice: "$$", maxDistance: 3.0, tags: ["vegan-friendly"] }),   durationSeconds: 41,  bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(18), notes: null },
  { id: "SES-8741", mode: "bracket", participantIds: ["USR-2041", "USR-2047", "USR-2053"], winnerId: "RST-4823", outcome: "decided",    filtersApplied: emptyFilters({ cuisines: ["Japanese", "French", "Italian"], maxPrice: "$$$$", maxDistance: 4.0, tags: ["date-night", "michelin-star"] }), durationSeconds: 312, bracketRounds: 4, hadSkippedRound: false, sessionDate: daysAgo(24), notes: "Special occasion — Sakura Omakase won" },
  { id: "SES-8727", mode: "solo",    participantIds: ["USR-2053"],                          winnerId: "RST-4869", outcome: "decided",    filtersApplied: emptyFilters({ cuisines: ["Spanish", "Mediterranean"], maxPrice: "$$$", maxDistance: 2.0, tags: ["happy-hour"] }),          durationSeconds: 27,  bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(31), notes: null },
  { id: "SES-8713", mode: "spin",    participantIds: ["USR-2041"],                          winnerId: "RST-4831", outcome: "decided",    filtersApplied: emptyFilters({ maxPrice: "$$", maxDistance: 2.0, tags: ["late-night"] }),                                                  durationSeconds: 7,   bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(47), notes: "Late night craving — let the spinner decide" },
  // Edge: winner is now permanently closed
  { id: "SES-8698", mode: "group",   participantIds: ["USR-2041", "USR-2059"],              winnerId: "RST-4876", outcome: "decided",    filtersApplied: emptyFilters({ cuisines: ["Korean"], maxPrice: "$", maxDistance: 1.5, tags: ["late-night", "delivery"] }),                 durationSeconds: 94,  bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(62), notes: "Kimchi Village before it closed — RIP" },
  // Edge: user abandoned / skipped session (no winner)
  { id: "SES-8681", mode: "solo",    participantIds: ["USR-2041"],                          winnerId: null,       outcome: "skipped",    filtersApplied: emptyFilters({ cuisines: ["French"], maxPrice: "$$$$", maxDistance: 4.0 }),                                                durationSeconds: 156, bracketRounds: null, hadSkippedRound: false, sessionDate: daysAgo(79), notes: null },
];

// ---------------------------------------------------------------------------
// Badges — 12 records
// ---------------------------------------------------------------------------
export const badges: Badge[] = [
  { id: "BDG-001", name: "First Bite",       description: "Made your very first decision",                    emoji: "🍽️", unlockCondition: "Complete 1 decision session",                              earnedAt: daysAgo(120), rarity: "common"    },
  { id: "BDG-002", name: "Streak Starter",   description: "Decided 3 days in a row",                          emoji: "🔥", unlockCondition: "Reach a 3-day streak",                                     earnedAt: daysAgo(85),  rarity: "common"    },
  { id: "BDG-003", name: "Week Warrior",     description: "Kept the streak alive for 7 straight days",        emoji: "📅", unlockCondition: "Reach a 7-day streak",                                     earnedAt: daysAgo(49),  rarity: "rare"      },
  { id: "BDG-004", name: "Plant Pal",        description: "Chose a vegan-friendly spot 5 times",              emoji: "🌱", unlockCondition: "Win 5 sessions with a vegan-friendly restaurant",          earnedAt: daysAgo(71),  rarity: "common"    },
  { id: "BDG-005", name: "Globe Trotter",    description: "Explored 10 different cuisines",                   emoji: "🌍", unlockCondition: "Win sessions across 10 distinct cuisines",                 earnedAt: daysAgo(33),  rarity: "rare"      },
  { id: "BDG-006", name: "Bracket Champion", description: "Won a 4-round bracket session",                    emoji: "🏆", unlockCondition: "Complete a bracket with 4+ rounds",                        earnedAt: daysAgo(24),  rarity: "rare"      },
  { id: "BDG-007", name: "Night Owl",        description: "Chose a late-night spot after 11 PM three times",  emoji: "🦉", unlockCondition: "Select a late-night restaurant after 11 PM in 3 sessions", earnedAt: daysAgo(40),  rarity: "common"    },
  { id: "BDG-011", name: "Speed Demon",      description: "Made a decision in under 10 seconds",              emoji: "⚡", unlockCondition: "Complete a spin or solo session in under 10 seconds",       earnedAt: daysAgo(11),  rarity: "common"    },
  // Not yet earned — in-progress / future targets
  { id: "BDG-008", name: "The Decider",      description: "Reached 100 total decisions",                      emoji: "💯", unlockCondition: "Complete 100 decision sessions",                           earnedAt: null,         rarity: "legendary" },
  { id: "BDG-009", name: "Michelin Chaser",  description: "Chose a Michelin-starred restaurant",              emoji: "⭐", unlockCondition: "Win a session with a michelin-star tagged restaurant",     earnedAt: null,         rarity: "rare"      },
  { id: "BDG-010", name: "Social Butterfly", description: "Ran a group session with 4+ participants",         emoji: "🦋", unlockCondition: "Complete a group session with 4 or more participants",     earnedAt: null,         rarity: "rare"      },
  { id: "BDG-012", name: "Omnivore Legend",  description: "Explored all 15 cuisine categories",               emoji: "👑", unlockCondition: "Win sessions across all 15 cuisine types",                 earnedAt: null,         rarity: "legendary" },
];

// ---------------------------------------------------------------------------
// Cuisine Categories — 15 records
// ---------------------------------------------------------------------------
export const cuisineCategories: CuisineCategory[] = [
  { id: "CUI-01", label: "Italian",        emoji: "🍝", matchCount: 14, winRate: 14.9 },
  { id: "CUI-02", label: "Korean",         emoji: "🍜", matchCount: 31, winRate: 32.9 },
  { id: "CUI-03", label: "Thai",           emoji: "🌶️",  matchCount: 9,  winRate: 9.6  },
  { id: "CUI-04", label: "Japanese",       emoji: "🍣", matchCount: 6,  winRate: 6.4  },
  { id: "CUI-05", label: "Mexican",        emoji: "🌮", matchCount: 18, winRate: 19.1 },
  { id: "CUI-06", label: "American",       emoji: "🍔", matchCount: 11, winRate: 11.7 },
  { id: "CUI-07", label: "Mediterranean",  emoji: "🫒", matchCount: 13, winRate: 13.8 },
  { id: "CUI-08", label: "Indian",         emoji: "🫕", matchCount: 7,  winRate: 7.4  },
  { id: "CUI-09", label: "Chinese",        emoji: "🥟", matchCount: 16, winRate: 17.0 },
  { id: "CUI-10", label: "Vietnamese",     emoji: "🍲", matchCount: 8,  winRate: 8.5  },
  { id: "CUI-11", label: "French",         emoji: "🥐", matchCount: 4,  winRate: 4.3  },
  { id: "CUI-12", label: "Greek",          emoji: "🫙", matchCount: 5,  winRate: 5.3  },
  { id: "CUI-13", label: "Middle Eastern", emoji: "🧆", matchCount: 12, winRate: 12.8 },
  { id: "CUI-14", label: "Ethiopian",      emoji: "🫓", matchCount: 3,  winRate: 3.2  },
  { id: "CUI-15", label: "Spanish",        emoji: "🥘", matchCount: 7,  winRate: 7.4  },
];

// ---------------------------------------------------------------------------
// Dashboard Stats
// ---------------------------------------------------------------------------
export const dashboardStats: DashboardStats = {
  totalDecisions: 94,
  decisionsChange: 18.7,
  currentStreak: 12,
  streakChange: 71.4,
  cuisinesExplored: 11,
  cuisinesChange: 22.2,
  avgDecisionSeconds: 62,
  avgDecisionChange: -24.1, // negative = faster = improvement
  savedRestaurants: 18,
  badgesEarned: 8,
};

// ---------------------------------------------------------------------------
// Chart Data — Monthly decision volume (Sep 2025 – Feb 2026)
// ---------------------------------------------------------------------------
export const decisionsOverTime: ChartDataPoint[] = [
  { month: "Sep", value: 4,  target: 6  },
  { month: "Oct", value: 7,  target: 8  },
  { month: "Nov", value: 11, target: 10 },
  { month: "Dec", value: 9,  target: 12 }, // holiday dip
  { month: "Jan", value: 17, target: 15 },
  { month: "Feb", value: 23, target: 20 }, // partial month, trending above target
];

// ---------------------------------------------------------------------------
// Chart Data — Average decision time by month (seconds)
// ---------------------------------------------------------------------------
export const avgDecisionTimeByMonth: ChartDataPoint[] = [
  { month: "Sep", value: 98  },
  { month: "Oct", value: 87  },
  { month: "Nov", value: 81  },
  { month: "Dec", value: 104 }, // spike — indecisive in December
  { month: "Jan", value: 73  },
  { month: "Feb", value: 62  },
];

// ---------------------------------------------------------------------------
// Chart Data — Cuisine breakdown (Donut / Bar)
// ---------------------------------------------------------------------------
export const cuisineBreakdown: CuisineBreakdownPoint[] = [
  { cuisine: "Korean",        emoji: "🍜", count: 31, share: 32.9 },
  { cuisine: "Mexican",       emoji: "🌮", count: 18, share: 19.1 },
  { cuisine: "Chinese",       emoji: "🥟", count: 16, share: 17.0 },
  { cuisine: "Italian",       emoji: "🍝", count: 14, share: 14.9 },
  { cuisine: "Mediterranean", emoji: "🫒", count: 13, share: 13.8 },
  { cuisine: "Other",         emoji: "🍽️", count: 2,  share: 2.3  },
];

// ---------------------------------------------------------------------------
// Chart Data — Decision mode breakdown
// ---------------------------------------------------------------------------
export const decisionModeBreakdown: DecisionModeDataPoint[] = [
  { mode: "Solo",    count: 42, avgSeconds: 27  },
  { mode: "Group",   count: 23, avgSeconds: 94  },
  { mode: "Spin",    count: 19, avgSeconds: 12  },
  { mode: "Bracket", count: 10, avgSeconds: 247 },
];

// ---------------------------------------------------------------------------
// Chart Data — Weekly activity (last 7 days, current streak active)
// ---------------------------------------------------------------------------
export const weeklyActivity: WeeklyActivityPoint[] = [
  { day: "Mon", decisions: 2, streakDay: true },
  { day: "Tue", decisions: 1, streakDay: true },
  { day: "Wed", decisions: 3, streakDay: true },
  { day: "Thu", decisions: 1, streakDay: true },
  { day: "Fri", decisions: 2, streakDay: true },
  { day: "Sat", decisions: 4, streakDay: true },
  { day: "Sun", decisions: 1, streakDay: true },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------
export const getRestaurantById = (id: string) =>
  restaurants.find((r) => r.id === id) ?? null;

export const getUserById = (id: string) =>
  userProfiles.find((u) => u.id === id) ?? null;

export const getBadgeById = (id: string) =>
  badges.find((b) => b.id === id) ?? null;

export const getSessionsByUser = (userId: string) =>
  decisionSessions.filter((s) => s.participantIds.includes(userId));

export const getEarnedBadges = (profile: UserProfile) =>
  profile.earnedBadgeIds.map((id) => getBadgeById(id)).filter(Boolean);

export const getSessionsWithRestaurant = (restaurantId: string) =>
  decisionSessions.filter((s) => s.winnerId === restaurantId);

export const getTopRestaurants = (limit = 5) =>
  [...restaurants]
    .filter((r) => r.timesChosen > 0)
    .sort((a, b) => b.timesChosen - a.timesChosen)
    .slice(0, limit);

export const getRecentSessions = (limit = 5) =>
  [...decisionSessions]
    .sort((a, b) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime())
    .slice(0, limit);

// ---------------------------------------------------------------------------
// Static option lists (used by filter UIs)
// ---------------------------------------------------------------------------
export const PRICE_RANGE_OPTIONS = ["$", "$$", "$$$", "$$$$"] as const;

export const DECISION_MODE_LABELS: Record<string, string> = {
  solo: "Solo",
  group: "Group",
  spin: "Spin the Wheel",
  bracket: "Bracket",
};
