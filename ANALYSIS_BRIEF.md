# Analysis Brief — Gamified Restaurant Decision App

```json
{
  "domain": "food",
  "clientName": null,
  "features": [
    "swipe-style restaurant picker (Tinder-for-food mechanic)",
    "preference quiz / taste profile onboarding",
    "gamified spin wheel or bracket tournament for group decisions",
    "restaurant cards with cuisine type, distance, price range, and rating",
    "streak and badge system (decisions made, cuisines explored)",
    "quick-match mode (single-tap randomizer with filters)",
    "saved favorites and decision history log"
  ],
  "challenges": [
    {
      "title": "Making group indecision fun instead of frustrating",
      "vizType": "flow-diagram",
      "outcome": "Could reduce group dining decision time from 15+ minutes of back-and-forth to a 60-second bracket vote"
    },
    {
      "title": "Preference weighting without a long setup form",
      "vizType": "before-after",
      "outcome": "Could replace a 10-question onboarding survey with a 3-swipe taste calibration that improves match quality on first use"
    },
    {
      "title": "Keeping re-engagement high after the first session",
      "vizType": "metric-bars",
      "outcome": "Could push Day-7 retention from a typical 15-20% (bare utility apps) toward 40%+ with streak rewards and discovery nudges"
    }
  ],
  "portfolioProjects": [
    "Outerbloom — AI Social Coordination",
    "AI Store Builder",
    "Sports Vision MVP",
    "Event Planner SaaS"
  ],
  "coverLetterHooks": [
    "rapid prototype using Lovable",
    "validate a concept and test iteration speed",
    "fun and interactive way to make dining choices",
    "gamification principles",
    "private, gamified restaurant decision app"
  ],
  "screeningQuestion": null,
  "screeningAnswer": null,
  "accentColor": "orange",
  "signals": ["VAGUE_POST"],
  "coverLetterVariant": "A",
  "domainResearcherFocus": "Focus on consumer dining app terminology: cuisine tags (Italian, Thai, Farm-to-Table, Fast Casual, Omakase), Yelp/Google Maps rating scales (3.5–4.8 stars typical), price tiers ($, $$, $$$, $$$$), distance radius in miles (0.5–5 mi typical for urban apps). Entity names should be realistic restaurant names across categories — mix fast casual (Chipotle-style) with sit-down and trendy spots. Gamification terms: XP, streaks, badges, match score, bracket rounds, spin result. Metric ranges: weekly active sessions 3–7/user for sticky food apps, average decision time 45–90 seconds in app vs 15+ min unaided. Edge cases: no nearby restaurants match all filters, user has dietary restrictions (vegan, gluten-free) that eliminate most options, group members have conflicting preferences (one wants sushi, one hates fish)."
}
```

---

## Downstream Agent Notes

### For the Domain Researcher
The core product is a consumer-facing group decision app for restaurant picking. Research should focus on:
- Gamification loop patterns in food/dining apps (Yelp Monocle, Zomato, OpenTable discovery features)
- How competing apps (Dine, Groupeat, Restaurant Roulette) handle group consensus
- Real cuisine tag taxonomy and dietary restriction categories used by Yelp/Google Maps
- Engagement metric benchmarks for casual consumer mobile apps

### For the Data Architect
Key entity types:
- `Restaurant` — name, cuisine, priceRange ($|$$|$$$|$$$$), rating (3.2–4.9), distance, tags (vegan-friendly, date-night, family-friendly, late-night), imageSlug
- `DecisionSession` — participants, mode (solo|group|spin|bracket), winner, duration, date
- `UserProfile` — tastePreferences (cuisine preferences array), streakDays, badgesEarned, decisionsTotal
- `Badge` — id, name, description, earnedAt (null if not earned)
- `CuisineCategory` — id, label, emoji, matchCount

Edge cases to include:
- A session where no restaurant matched all filters (empty state scenario)
- User with 3+ dietary restrictions
- Bracket session where a user skipped a round
- Streak broken after 7-day run

### For the Layout Builder
Sidebar nav labels (food domain vocabulary):
- **Tonight's Pick** (dashboard)
- **Spin the Wheel** (randomizer feature)
- **Group Bracket** (tournament feature)
- **My Taste Profile** (preferences/onboarding)
- **Decision History** (log of past sessions)

App name: `restaurant-decision-app` (already set)
Accent color: orange (`oklch(0.72 0.20 50)` range)

### For the Dashboard Builder
KPI stat cards:
1. Decisions Made (total sessions)
2. Current Streak (days in a row)
3. Cuisines Explored (unique categories tried)
4. Average Decision Time (seconds)

Primary chart: Cuisine exploration breakdown (bar or donut — how many times each cuisine won)
Secondary panel: Recent decision history feed with outcome and time

### For the Cover Letter Writer
Tone: Casual and energetic. This client is a startup/indie founder validating an MVP quickly — match their "move fast" language. They said "passion about user-friendly experiences" and "iteration speed" — mirror this energy without using those exact buzzwords back.

Variant A is correct. The hook should reference the fast MVP mindset and the gamification angle specifically.

Embedded question suggestion: "Are users picking solo or is this primarily a group decision tool — that shapes whether the bracket or the spin mechanic should be the hero feature?"
