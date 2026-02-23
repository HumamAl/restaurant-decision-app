# Domain Knowledge Brief — Gamified Restaurant Decision App

## Sub-Domain Classification

Consumer-facing mobile/web dining decision app with gamification mechanics. Targets urban/suburban users aged 22-42 experiencing "where to eat" decision fatigue. Combines restaurant discovery (Yelp/Google Maps style data) with engagement loops borrowed from dating apps (swipe), game shows (tournament bracket), and fitness apps (streaks, badges, XP). Not a restaurant management tool — the user IS the diner, not the operator.

---

## Entity Names (15+ realistic names)

### Restaurants (with cuisine + neighborhood context)

| Name | Cuisine | Neighborhood/Setting |
|---|---|---|
| Flour & Fire | Wood-fired Italian | Midtown |
| Saigon Street Kitchen | Vietnamese | East Side |
| The Larder & Cup | New American | Arts District |
| Oaxaca Cantina | Mexican Regional | Logan Square |
| Umami Republic | Modern Japanese | Downtown |
| Coppola's Trattoria | Classic Italian | Little Italy |
| The Copper Pot | French Bistro | Uptown |
| Ember & Ash | American BBQ | South End |
| Golden Pearl Dim Sum | Cantonese | Chinatown |
| Verde Social | Mexican Tapas | Mission District |
| Northside Ramen Lab | Japanese Ramen | North Park |
| Taverna Kosta | Greek Mediterranean | Greektown |
| Provision House | Farm-to-Table | River North |
| Spice Route | Indian Subcontinent | Devon Ave |
| Perch Seafood Co. | Pacific Seafood | Waterfront |
| Atlas & Fork | Global Small Plates | Wicker Park |
| The Pork Collective | Modern BBQ Fusion | South Loop |
| Saffron & Steam | Persian | Andersonville |
| Crudo | Modern Italian Seafood | Fulton Market |
| Pho Hanoi House | Vietnamese Pho | Argyle St |

### User Names (Foodie App Demographics — Millennial/Gen Z)

- Maya Chen
- Jordan Patel
- Sofia Ramirez
- Ethan Brooks
- Priya Nair
- Marcus Williams
- Leila Hosseini
- Tyler Kovach
- Amara Osei
- Dev Krishnamurthy

### Neighborhoods / Locations

- Logan Square, River North, Wicker Park, Fulton Market, West Loop, Pilsen, Andersonville, Lincoln Park, South Loop, Hyde Park, Gold Coast, Chinatown, Greektown, Uptown, Arts District

---

## Cuisine Types (10 core categories)

1. Italian / Wood-Fired
2. Mexican / Regional Mexican
3. Japanese / Ramen / Sushi
4. Chinese / Dim Sum / Cantonese
5. Vietnamese / Pho
6. Indian / South Asian
7. American / New American
8. BBQ / Smoked
9. Mediterranean / Greek
10. Seafood / Pacific Coast
11. Thai / Southeast Asian *(common alternative)*
12. French Bistro *(upscale tier)*

---

## Dish Names (Menu-Level Realism)

### Signature Dishes by Cuisine

**Italian**: Tagliatelle al Ragù, Burrata con Crostini, Rigatoni all'Amatriciana, Bistecca Fiorentina, Truffle Arancini

**Mexican**: Birria de Res Tacos, Mole Negro con Pollo, Tlayuda Oaxaqueña, Tostadas de Tinga, Chile Relleno

**Japanese**: Tonkotsu Ramen, Spicy Tuna Crispy Rice, Yakitori Platter, Wagyu Gyoza, Chirashi Bowl

**Indian**: Lamb Rogan Josh, Saag Paneer, Dal Makhani, Tandoori Chicken, Peshwari Naan

**American/BBQ**: Smoked Brisket Plate, Cast Iron Cornbread, Burnt End Sliders, Short Rib Hash

**Vietnamese**: Phở Đặc Biệt, Bánh Mì Thịt, Bún Bò Huế, Lemongrass Chicken Rice, Gỏi Cuốn

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|---|---|---|---|---|
| Restaurant star rating (Google) | 3.8 | 4.3 | 4.9 | Google avg ~4.4 vs Yelp avg ~3.7 |
| Restaurant star rating (Yelp) | 3.1 | 3.8 | 4.7 | Half-star increments on Yelp |
| Review count (new restaurant, < 1yr) | 23 | 87 | 340 | Fewer reviews = higher variance |
| Review count (established, 3-5yrs) | 180 | 520 | 2,400 | Popular spots 1,000–5,000+ |
| Wait time (walk-in, weekend dinner) | 5 min | 22 min | 75 min | Avg waitlist 20 min per Toast data |
| Distance (urban recommendation radius) | 0.1 mi | 0.6 mi | 2.4 mi | User filter typically 1-5 miles |
| Price per person ($ tier) | $8 | $14 | $22 | Casual / fast-casual |
| Price per person ($$ tier) | $20 | $32 | $48 | Casual full-service |
| Price per person ($$$ tier) | $45 | $68 | $95 | Upscale casual / bistro |
| Price per person ($$$$ tier) | $85 | $130 | $220 | Fine dining / tasting menu |
| User taste match score (app-generated) | 42% | 71% | 98% | Based on swipe history |
| App session length | 2 min | 7 min | 24 min | Decision-focused sessions are short |
| Swipes per session | 4 | 11 | 34 | Higher with friends groups |
| User streak (days active) | 1 | 6 | 47 | Most streaks break by day 3 |
| XP points earned per session | 15 | 65 | 240 | Varies by action type |
| Badge completion rate | 8% | 23% | 61% | Depends on badge difficulty tier |
| Tournament rounds per session | 1 | 3 | 8 | Bracket of 4/8/16 restaurants |

---

## Industry Terminology Glossary (15+ terms)

| Term | Definition | Usage Context |
|---|---|---|
| Decision fatigue | Deteriorating quality of decisions after making many choices | Core problem the app solves |
| Taste profile | App-generated preference model based on swipe history | Shown as cuisine affinities, flavor preferences |
| Swipe right / left | Express interest or pass on a restaurant card | Primary input mechanic |
| Match score | % alignment between restaurant attributes and user taste profile | Displayed on each restaurant card |
| Tournament bracket | Head-to-head elimination where restaurants compete | Core game mode |
| Spin the wheel | Random selection from a shortlist | Delegating the final call to chance |
| Cuisine roulette | Random cuisine type assigned, restaurants filtered accordingly | Mode for adventurous users |
| Foodie XP | Experience points earned for dining decisions and check-ins | Currency for level progression |
| Streak | Consecutive days the user opens the app or logs a meal | Engagement retention mechanic |
| Badge | Achievement unlocked for a specific behavior or milestone | "First Sushi", "BBQ Devotee", "3-Streak" |
| Leaderboard | Ranked list of users by XP or cuisine diversity score | Social competition element |
| Cuisine diversity score | % of distinct cuisine types the user has tried/rated | Profile metric |
| Check-in | Confirming you actually visited a restaurant | Validates decisions, earns bonus XP |
| 86'd | Kitchen/restaurant unavailable; item or venue is off-menu | Restaurant industry term; use for "closed" or "unavailable" state |
| Prix fixe | Fixed-price multi-course meal | Fine dining; relevant for filter/category |
| Tasting menu | Chef-curated sequence of small courses (usually 5-12 courses) | High-end filter option |
| Farm-to-table | Sourcing ingredients directly from local farms | Common descriptor on restaurant cards |
| Covers | Number of diners served (restaurant capacity metric) | Used in reservation context |
| Mise en place | Everything in its place; prep work before service | Insider term, use in loading/prep states |
| Table turn rate | How quickly a restaurant cycles tables | Affects estimated wait time |

---

## Common Workflows

### Workflow 1: Solo Decision (Spin / Swipe Mode)
1. User opens app, selects "Decide Now" mode
2. App prompts: location, distance radius, price range filter (optional — can skip)
3. Restaurant cards appear one at a time — user swipes right (interested) or left (pass)
4. After 5–10 swipes, app shows "top picks" ranked by match score
5. User can accept top pick, trigger spin wheel from top 3, or continue swiping
6. User confirms selection → gets directions + earns Foodie XP
7. Post-visit: user rates experience (1-5 stars, quick emoji reaction)

### Workflow 2: Group Tournament Mode
1. Group organizer creates a session, shares invite link
2. Each participant selects their dietary restrictions and cuisine preferences
3. App generates bracket of 8 restaurants meeting group overlap criteria
4. Each round: all members vote on two options (left/right swipe)
5. Winner advances; bracket completes in 3 rounds for 8-restaurant bracket
6. Final winner revealed with confetti animation + restaurant details
7. Check-in after visit → all participants earn bonus XP

### Workflow 3: Taste Profile Building (Onboarding + Ongoing)
1. New user takes 60-second taste quiz (10 questions on flavors, textures, dietary needs)
2. Initial taste profile generated: cuisine affinity percentages + flavor tags
3. Every swipe and post-visit rating refines the model
4. Monthly "Taste Recap" shows what user's profile looks like vs. prior month
5. Achievements unlock as profile diversifies (e.g., "Tried 5 new cuisines")

---

## Common Edge Cases (Include as Mock Data Records)

1. **Restaurant temporarily closed** — flagged as "Temporarily Closed" with note (e.g., "Closed for renovation through March 2026")
2. **No matches found** — user's filter combo too narrow (e.g., "$" + vegan + open now at 10pm) → empty state with "Loosen filters?" prompt
3. **Tied tournament vote** — all group members split equally; app uses tiebreaker (closest distance wins, or random coin flip)
4. **Dietary conflict in group** — one member is vegan, another wants steakhouse; app shows "Conflict Detected" and suggests compromise options
5. **Restaurant closes permanently** — should be marked as "Permanently Closed" with suggestion for similar nearby alternatives
6. **Zero review count** — new restaurant without reviews shows "New — Be the first to try!" with caution badge
7. **Streak broken** — user missed a day; app shows consolation message + "Streak Recovery" bonus task
8. **Inconsistent hours data** — restaurant listed as "open" but actually closed; app shows "Hours may be outdated — call ahead"
9. **User's perfect match is too far** — 98% match score but 12 miles away; app surfaces closer alternatives with a comparison card
10. **Group invite declined by all** — solo fallback mode triggered automatically

---

## What Would Impress a Domain Expert

1. **Match score uses real flavor taxonomy** — not just cuisine type. Flavor tags like "umami-forward", "charred/smoky", "bright citrus", "rich/creamy", "herbaceous" align the recommendation to actual taste preference, not just genre.

2. **Daypart awareness** — the app knows that a 4.5-star brunch spot isn't relevant for a 9pm dinner craving. Restaurant cards show current hours status prominently: "Closes in 45 min" creates urgency; "Opens at 5:30pm" for a dinner request is surfaced early.

3. **Table availability integration** — mentioning OpenTable or Resy party size availability (even as mock data: "3 spots at 7:30pm via OpenTable") shows awareness of how people actually book, not just browse.

4. **Price per person vs. price tier symbol** — "$" vs "$$" is imprecise. Real apps now show "~$28/person" alongside the tier symbol. Insiders know the tier symbols vary wildly by city (SF $$ = NYC $).

5. **Neighborhood specificity matters** — "West Loop" and "River North" are two very different dining experiences in Chicago even though they're 0.8 miles apart. The app should show neighborhood name, not just city.

---

## Common Systems & Tools Used in This Space

| Tool/System | Role |
|---|---|
| Google Places API | Restaurant data, ratings, hours, photos |
| Yelp Fusion API | Reviews, rating, price tier, categories |
| OpenTable API | Reservation availability and booking |
| Resy | Reservation platform (upscale dining) |
| Foursquare / Swarm | Check-in mechanics and location history |
| Mapbox / Google Maps | Distance calculation, routing |
| Firebase | Real-time group session sync |
| Segment | Event tracking for gamification analytics |
| Braze / OneSignal | Push notifications for streaks and reminders |

---

## User Personas

| Persona | Goal | Pain Point | Key Features Used |
|---|---|---|---|
| The Foodie Explorer | Try new cuisine every week | Overwhelmed by choices | Cuisine roulette, diversity score, badge collection |
| The Budget Diner | Stay under $15/person | Hidden cost surprises | Price filter, cost-per-person display |
| The Group Organizer | Get 4+ people to agree | "I don't care" from friends | Tournament bracket, group invite link |
| The Date Night Planner | Impress a partner | Decision paralysis, fear of bad pick | High-rated filter, ambiance tags, reservation link |
| The Health-Conscious Eater | Find vegan/GF options fast | Menus without dietary labels | Dietary restriction filter, menu preview |

---

## Gamification Elements Detail

### XP (Foodie XP) Actions and Point Values

| Action | XP Earned |
|---|---|
| Daily app open | +5 XP |
| Complete swipe session (10+ swipes) | +20 XP |
| Win a tournament round | +15 XP per round |
| Post-visit check-in | +50 XP |
| Leave a star rating | +25 XP |
| Try a new cuisine type | +75 XP bonus |
| Complete a group session | +100 XP |
| Maintain 7-day streak | +150 XP bonus |

### Level Tiers

| Level | Title | XP Required |
|---|---|---|
| 1 | Fork & Knife | 0 XP |
| 2 | Neighborhood Regular | 250 XP |
| 3 | Seasoned Diner | 750 XP |
| 4 | Cuisine Connoisseur | 1,800 XP |
| 5 | Culinary Adventurer | 4,000 XP |
| 6 | Master Foodie | 8,500 XP |

### Badge Examples

| Badge Name | Trigger | Rarity |
|---|---|---|
| First Bite | First check-in | Common |
| Streak Starter | 3-day streak | Common |
| On Fire | 7-day streak | Uncommon |
| Globe Trotter | Try 5 different cuisine types | Uncommon |
| Iron Stomach | Check in 3 times in one day | Rare |
| Group Leader | Organize 5 group sessions | Rare |
| Off the Beaten Path | Visit a restaurant with <50 reviews | Uncommon |
| Fine Diner | Check in at a $$$$ restaurant | Uncommon |
| Midnight Snacker | Check in after 11pm | Common |
| Comeback Kid | Restore broken streak using recovery | Common |
| Perfect Match | Visit a 98%+ taste match restaurant | Rare |
| Bracket Champion | Win 10 tournaments | Epic |

---

## Geographic / Cultural Considerations

- Primary market: US urban centers (Chicago, NYC, LA, SF, Austin, Seattle, Miami)
- Distance shown in miles (not km) for US market
- Price in USD ($)
- Phone number format: (312) 555-0192
- Restaurant hours in 12-hour AM/PM format
- Reservation times in 15-minute increments (5:00pm, 5:15pm, 5:30pm, 5:45pm, 6:00pm...)
- Neighborhood names matter more than city in urban context
- Time zone: display local time based on restaurant location

---

## Data Architect Notes

### Entity Naming
- Use the 20 restaurant names listed above for mock restaurant records
- Use Maya, Jordan, Sofia, Ethan, Priya, Marcus, Leila, Tyler, Amara, Dev as user names
- Primary user in demo: "Maya Chen" (Foodie Explorer persona, Level 4 Cuisine Connoisseur)

### Metric Values for Field Data
- Restaurant ratings: float between 3.7 and 4.9 (e.g., 4.2, 3.9, 4.7, 4.1)
- Review counts: vary realistically — don't use round numbers. Use 127, 843, 2,341, 56, 478
- Distance: 0.2 mi, 0.4 mi, 0.8 mi, 1.2 mi, 1.7 mi, 2.3 mi (not 1.0, 2.0 exactly)
- Wait times: 5 min, 12 min, 25 min, 40 min, 8 min (realistic spread)
- Price tier symbols: "$", "$$", "$$$", "$$$$" — include one restaurant in each tier
- Match scores: 64%, 78%, 91%, 47%, 83%, 96% (not round numbers)
- User XP total: 2,847 XP (Level 4: Cuisine Connoisseur)
- Current streak: 11 days
- Cuisine diversity: 7 of 12 cuisines tried (58%)

### Status Labels to Use (Exact Strings)
- Restaurant availability: `"Open Now"`, `"Closes Soon"`, `"Closed"`, `"Temporarily Closed"`, `"Opening Soon"`
- Decision result: `"Matched!"`, `"Passed"`, `"Pending"`, `"In Tournament"`
- Badge status: `"Unlocked"`, `"Locked"`, `"In Progress"`
- Tournament round status: `"Winner"`, `"Eliminated"`, `"Awaiting Vote"`, `"Tied"`

### Edge Cases to Include as Specific Records
- 1 restaurant marked `"Temporarily Closed"` (Saffron & Steam — "Closed for renovation")
- 1 restaurant with very low reviews: 18 reviews (new place, Crudo) — mark as `"New"`
- 1 restaurant with 0% match score for dietary conflict (Ember & Ash — shown to vegan user)
- 1 badge at "In Progress" with visible progress bar (Globe Trotter: 3 of 5 cuisines)
- 1 broken streak record with "Streak Recovery" task available

### Date Patterns
- Restaurant data: static (no time-series date needed for restaurant profiles)
- User activity log: last 30 days of check-ins (use relative dates: "2 days ago", "Last Tuesday")
- Tournament history: last 5 sessions, most recent 3 days ago
- Badge unlock dates: spread across last 90 days
- Chart data: weekly check-ins for last 12 weeks (a time-series for activity chart)
- Streak start date: 11 days ago from today (2026-02-12)

### Datasets Needed (suggest 4+)
1. `restaurants` — 20 records with all profile fields
2. `users` — 5-8 user profiles (group session participants)
3. `tournaments` — 5 past tournaments with bracket data and results
4. `badges` — 12 badges with unlock status per primary user
5. `activityLog` — 20-30 check-ins/swipe sessions for activity chart
6. `tastProfile` — cuisine affinity percentages for primary user (radar chart data)
