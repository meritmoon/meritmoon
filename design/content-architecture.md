# 🏗️ MeritMoon Mobile — Content Architecture & Layout

> How every screen is structured, what content lives where, and how meditators flow through the app.
> For sacred vocabulary and Burmese terms, see [`vocabulary.md`](./vocabulary.md).
> For full product rules and mechanics, see [`product-spec.md`](./product-spec.md).
> For visual design tokens, see [`design.md`](./design.md).
> For mascot blueprints and animation models, see [`mascot-guidelines.md`](./mascot-guidelines.md).
> For database schemas and policies, see [`schema.md`](./schema.md).

---

## 🗺️ App Sitemap

```
🌕 MeritMoon App
│
├── [Top Bar]  🌕 Moon mascot (38px, canonical light source) + wordmark ............. ⚙️ Settings
│
├── Tab 1: Sanctuary
│   ├── Path Merits Hero (Night X of Y Merits bar + tonight's sit status)
│   ├── Daily Insight (path-relevant wisdom reflection)
│   └── Community Telemetry (Sitting Now counter under the moon)
│
├── Tab 2: Paths
│   ├── Masterclass Highlights (preview video / guided sit cards)
│   ├── Featured Paths (subtle loop video cards + fireflies)
│   ├── Masters (traditions & profiles synced alongside paths)
│   └── Path Detail (push nav)
│       ├── Masterclass (video / guided preview)
│       ├── About & Syllabus
│       ├── Featured Reflections (curated meditator reflections)
│       └── Night List:
│           ├── Completed Nights ✓ $\rightarrow$ Tap to inspect The Circle & Re-listen
│           ├── Current Night ▶ $\rightarrow$ Active practice entry
│           └── Future Nights 🔒 $\rightarrow$ Titles hidden to preserve discovery
│
├── Tab 3: Sit (Elevated Center Tab)
│   ├── No Path Enrolled $\rightarrow$ Prompt to browse paths
│   ├── Pre-Sit $\rightarrow$ Posture guidance & Preparation $\rightarrow$ "Begin Sit" CTA
│   ├── Active Sit $\rightarrow$ Full-screen immersive (Moon timer, Guidance: 1-sentence real-time text)
│   ├── Post-Sit Completion $\rightarrow$ Night Merits celebration
│   │   ├── Post-Sit Card (Choose: Reflection OR Doubt + "A Meditator" mask toggle)
│   │   └── The Circle (Community reflections, doubts & Master's insights for this sit)
│   ├── Sit Done (more tonight) $\rightarrow$ Sit 2 of N ready
│   └── Waiting for Next Night $\rightarrow$ Countdown to next night's unlock
│
├── Tab 4: Journey
│   ├── Path Merits Detail (progress meter with milestone markers)
│   ├── Practice Calendar (monthly grid: emerald ● = completed night, gold ● = tonight, empty ○ = missed)
│   ├── Session History (`sit_records` chronological practice timeline)
│   │   └── Tap completed sit $\rightarrow$ Opens **The Circle** (Doubts, Insights & Reflections)
│   ├── Lifetime Records (milestones, total sitting hours)
│   └── Complete Paths (Permanently rooted, freely re-listenable, option to start over & earn again merits)
│
└── Tab 5: Me
    ├── Meditator Info (avatar, username, member since, total sitting hours)
    ├── Path Status (Forest / Moonlit badge + management)
    ├── Dawn Cutoff (Anchored 4:00 AM dawn local cutoff indicator)
    └── Dana Flow (monthly/cumulative totals, monastery profiles, master voices, individual donors)
```

---

## 🧩 Content Types

| # | Type | Where | Key Elements |
| :-- | :--- | :--- | :--- |
| 1 | **Path Merits Hero** | Sanctuary | Night X of Y Merits bar, tonight's sit status, CTA |
| 2 | **Path Card** | Paths, Sanctuary | Loop video background, floating fireflies, title, master, duration, tags |
| 3 | **Masterclass Card** | Paths | Video preview / guided tasting sit, master, path link |
| 4 | **Master Card** | Paths | Photo, name, monastery / tradition, monastic status (`monastic: true/false`), paths taught |
| 5 | **Sit Card** | Sit tab | Preparation notes, sit index (*"Sit 1 of 2"*), duration, Begin Sit CTA |
| 6 | **Post-Sit Card** | Post-sit | Choose Reflection OR Doubt, "A Meditator" toggle, submit button |
| 7 | **The Circle** | Completed sit | Meditator reflections, doubts, and Master's Insight cards |
| 8 | **Awaiting Shield** | Uncompleted sit | Gentle moon card: *"The Circle is awaiting your sit tonight"* |
| 9 | **Daily Insight** | Sanctuary | Path-relevant wisdom card |
| 10 | **Featured Reflection Card** | Path detail | Curated meditator reflection for a specific path |
| 11 | **Dana Flow Card** | Me | Monthly/overall stats, monastery directory, master voices |
| 12 | **Path Status Card** | Me | Forest / Moonlit badge, upgrade / manage CTA |
| 13 | **Milestone Card** | Journey, Post-sit | Milestone icon, title, description, earned date |
| 14 | **Complete Path Card** | Journey | Complete badge, re-listen access, start over CTA |

---

## 📐 Screen Layouts & Flows

### Tab 1: Sanctuary

| Zone | Content | Spacing |
| :--- | :--- | :--- |
| **App Bar** | 🌕 Moon mascot (38px, canonical light source) + wordmark + ⚙️ Settings | sticky |
| **Path Merits Hero** | Full path bar (Night X of Y Merits), tonight's sit status, CTA. No path = browse prompt. | `↕ 16px` |
| **Daily Insight** | Path-relevant wisdom card (Cormorant Garamond italic serif, forest dividers) | `↕ 24px` |
| **Community Telemetry** | Live counter: **Sitting Now** under the moon | `↕ 24px` |
| **Bottom Nav** | 5 tabs, Sit (center) elevated with gold moon accent | fixed |

---

### Tab 2: Paths

| Zone | Content | Spacing |
| :--- | :--- | :--- |
| **App Bar** | 🌕 Moon mascot + wordmark + search + ⚙️ | sticky |
| **Masterclasses** | Horizontal carousel of preview cards (video thumb + master + title) | `↕ 16px` |
| **Featured Paths** | Vertical list — loop video cards with fireflies, master avatar, duration badge | `↕ 20px` |
| **Masters** | Horizontal carousel — master photo, name, monastery, path count | `↕ 20px` |
| **Bottom Nav** | 5 tabs | fixed |

#### Path Detail (Push Navigation)

1. Masterclass (video player / introductory guided sit).
2. About the path & tradition background.
3. Featured Reflections (curated meditator insights).
4. Night list:
   - Night 1 ✓ (Complete $\rightarrow$ Tap to open The Circle or re-listen).
   - Night 2 ✓ (Complete $\rightarrow$ Tap to open The Circle or re-listen).
   - Night 3 ▶ (Current active night $\rightarrow$ Begin Sit).
   - Night 4 🔒 (Locked night $\rightarrow$ Titles hidden).
5. Enroll CTA / Path Status.

---

### Tab 3: Sit (Elevated Center Tab) & Post-Sit Flow

```
[Preparation Card]
  ↓ (Tap "Begin Sit")
[Active Full-Screen Sit]
  - Breathing Moon Mascot
  - Countdown Timer
  - Guidance (1-Sentence Spoken Guidance, Word-by-Word Reveal)
  - 10s Rewind (Max progress bound)
  ↓ (Chime Sounds & Sit Completes)
[Post-Sit Flow]
  1. Celebration Header: "Night 3 Merits Secured 🎉"
  2. Post-Sit Card:
     - Choose: (●) Reflection  ( ) Doubt
     - Text Box: "What arose in your practice?" (or "Bring an obstacle or technique question to Master...")
     - Identity Toggle: [✓] Display as "A Meditator" in The Circle (Master always sees your true name)
     - Button: [ Share ]
  3. The Circle (Open for this sit):
     - Stream of reflections and doubts
     - Master's Insight cards highlighted in gold
```

---

### The Circle Experience (Open vs. Awaiting State)

#### 1. Open State (Completed Sit)

```
┌────────────────────────────────────────────────────────┐
│ 🌕 The Circle — Pa-Auk Foundations (Night 3 / Sit 1)  │
│ "Finding the Touch-Point at the Nostrils"              │
├────────────────────────────────────────────────────────┤
│ ✦ Sayadaw's Insight                               [📌] │
│ A Meditator brought Doubt:                             │
│ "Breath felt tight and restricted around minute 15..." │
│                                                        │
│ Sayadaw U Ācinna: "Do not force the breath. Simply     │
│ observe the natural touch without gripping. Tightness  │
│ arises from expectation. Relax the facial muscles."    │
├────────────────────────────────────────────────────────┤
│ 🌿 Reflection                              @mindful_k  │
│ "After 10 minutes of restlessness, the sensation at the│
│ upper lip settled into a cool stillness. Deep peace."  │
└────────────────────────────────────────────────────────┘
```

#### 2. Awaiting State (Before You Sit Tonight)

```
┌────────────────────────────────────────────────────────┐
│ 🌕 Night 4 Morning Anchor — The Circle                 │
├────────────────────────────────────────────────────────┤
│                                                        │
│                        🌕                              │
│              (Gentle resting halo)                     │
│                                                        │
│                     Awaiting                           │
│                                                        │
│   The Circle is awaiting your sit tonight.             │
│   Sits are meant to be experienced directly,           │
│   not intellectualized beforehand.                     │
│                                                        │
│   Sit under the tree tonight to open the Circle.       │
│                                                        │
│                 [ 🧘 Sit Now ]                         │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

### Tab 4: Journey & Tab 5: Me

#### Journey (Tab 4)
- **Path Merits**: Detailed progress bar with milestone markers, night number, and sit status.
- **Practice Calendar**: Monthly grid (emerald ● = completed night, gold ● = tonight, empty ○ = missed).
- **Session History**: Chronological timeline of completed sit records (`sit_records`). Tapping any completed sit navigates straight to its **Circle**.
- **Lifetime Records**: Milestone badges, total meditation hours, complete paths.
- **Complete Paths**: Library of Complete paths (re-listen or start over to earn again merits).

#### Me (Tab 5)
- **Meditator Info**: Avatar, username, member since, total sitting hours.
- **Path Status**: Forest / Moonlit badge + manage subscription.
- **Dawn Cutoff**: Anchored 4:00 AM dawn local cutoff indicator.
- **Dana Flow**: Full transparency breakdown (monthly totals, monasteries supported, master voices, individual donor wall).
- **Settings**: App preferences, notifications, identity mask default.
