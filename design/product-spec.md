# 🌕 MeritMoon — Product Specification

> _"People think AI is the future. And other technologies... I'd say it's wrong. Peace is the future. The world needs peace starting from one's inner mind. This cannot be faked. They are contributing for a future prosperous with peace if they go Moonlit."_

---

## Terminology

> For the comprehensive master lexicon, forbidden terminology, Burmese translations, and copywriting guidelines, see [`vocabulary.md`](./vocabulary.md). For visual mascot blueprints, expressions, and animation models, see [`mascot-guidelines.md`](./mascot-guidelines.md). For database tables and access policies, see [`schema.md`](./schema.md).

| Term | Meaning |
| :--- | :--- |
| **Meditator** | A person cultivating the mind through daily meditation. Replaces "User" and "Practitioner". |
| **A Meditator** | The respectful public display name when a meditator masks their name in The Circle (Master still sees their true identity). |
| **Path** | The complete meditation curriculum spanning $N$ nights (e.g., *Pa-Auk Foundations*, 30 Nights). Replaces "Course". |
| **Night** | The sequential nocturnal stage along an enrolled path (e.g., *Night 3 of 30*). Replaces "Day". |
| **Sit** | The discrete individual practice unit within a night (e.g., *"Sit 1 of 2"*). Prescribed in `sits` table. |
| **Sit Record** | The verified log of a completed sit session (`sit_records` table). Directly proves eligibility to enter The Circle. |
| **Master** | The venerable meditation master guiding the path (`masters` table). If ordained (`monastic: true`), addressed as **Sayadaw** or **Venerable**; if lay master, addressed as **Master**. |
| **Guidance** | Spoken audio instruction paired with an elemental 1-sentence real-time text reveal. Audio presence is strictly Master-determined; meditators follow along without toggle bypass. Replaces "Live Transcript". |
| **Chime** | The peaceful monastery chime sounded when a Sit completes. Replaces "Alarm" or "Bell". |
| **Merits** | The fundamental measure of spiritual cultivation (*Pāramī*): lifetime hours sat, completed sits, and Dana given. Never transactional credits or casino coins. |
| **Present Night** | The active nocturnal milestone currently being walked (e.g., *"Night 14 of 30"*). Returns to Night 1 on missed 4:00 AM dawn (Forest) or Begin Anew. In codebase: `present_night`. |
| **Return** | Automatic event. Occurs when a Forest Path meditator fails to complete a night's Sits before 4:00 AM dawn. Active path progress returns to Night 1. Server stores highest night reached for Moonlit recovery. In codebase: `return` / `returned_at`. |
| **Begin Anew** | Intentional action. Meditator chooses to begin anew from scratch with a beginner's mind. Active progress returns to Night 1. Historical accomplishment records are preserved. In codebase: `begin_anew` (no legacy). |
| **Complete** | A path completed through its final night. Permanently unlocked in the meditator's sanctuary. Can be retaken or freely re-listened. Complete paths never return to Night 1 automatically, even if changing paths or switching to the Forest path. |
| **Preparation** | Mindful posture, terminology, and room orientation before closing eyes. Replaces "Pre-Text". |
| **Reflection** | Authentic text report written immediately after completing a Sit, sharing sensations, stillness, or mental clarity (`sit_reflections`). |
| **Doubt** | A practice obstacle or uncertainty brought to the Master regarding technique, breath anchoring, or hindrances (`sit_doubts`). Cleared when an Insight is linked (no loose status column). |
| **Insight** | The Master's compassionate, wise answer and teaching clearing the meditator's doubt (`sit_insights`). Reusable library item that can be assigned to multiple similar doubts. |
| **The Circle** | The sacred community space dedicated to a specific Sit, showing meditators' reflections, doubts, and the Master's insights. In code: `circle`. |
| **Awaiting** | The welcoming state of The Circle before tonight's Sit is complete. Free of any feeling of discrimination or ranking. Simply awaits your sit tonight to open. |
| **Open** | The active state of The Circle once tonight's Sit is complete. |
| **4:00 AM Dawn** | The fixed 4:00 AM local time nocturnal boundary anchored at path enrollment (`dawn: "04:00"`). Non-customizable. Does not drift when traveling. |
| **Nightfall** | The gentle evening push reminder alerting meditators to sit before 4:00 AM dawn (*"Night is falling..."*). |
| **Sitting Now** | Real-time live counter of meditators actively practicing worldwide at this exact moment in Sanctuary. |
| **Nature** | Mental nature addressed across the path and within each night. Centralized and consistent, rooted in the canonical Theravada 6 Carita (*Cha-carita* / စရိုက် ၆ ပါး). Paths feature a single sorted `natures` array (first entry is primary); each night targets its specific `nature`. Uniform `-ing` participle cadence: `anger_calming`, `greed_subduing`, `restlessness_stilling`, `confusion_clearing`, `wisdom_inquiring`, `faith_inspiring`. |
| **Dana** | Generosity offering. The portion of Moonlit subscription revenue flowing directly to meditation masters and monasteries. _Dana is powered as a merit_, which is why Moonlit meditators never lose their path progress. |

---

## Table of Contents

- [🌕 MeritMoon — Product Specification](#-meritmoon--product-specification)
  - [Terminology](#terminology)
  - [Table of Contents](#table-of-contents)
  - [🌙 1. Vision](#-1-vision)
  - [🛤️ 2. Two Paths](#️-2-two-paths)
    - [The Forest Path (Free)](#the-forest-path-free)
    - [The Moonlit Path ($9.99/month)](#the-moonlit-path-999month)
    - [The "Moonlit Promise" \& No-Marketplace Policy](#-the-moonlit-promise--no-marketplace-policy)
    - [Moonlit Recovery — Restoring Merits After a Return](#moonlit-recovery--restoring-merits-after-a-return)
  - [🪷 3. The Merits System: Cultivation, Not Credits](#-3-the-merits-system-cultivation-not-credits)
  - [📚 4. Meditation Paths \& Curricula](#-4-meditation-paths--curricula)
    - [Traditions (Upanissaya) \& Monasteries](#traditions-upanissaya--monasteries)
    - [Character Dispositions (*Carita*)](#character-dispositions-carita)
    - [Multi-Master Collaboration \& Roles](#multi-master-collaboration--roles)
    - [Path Structure: Path $\rightarrow$ Night $\rightarrow$ Sit](#path-structure-path--night--sit)
    - [Content Types](#content-types)
    - [Masterclasses](#masterclasses)
    - [Paths Display (Tab 2: Paths)](#paths-display-tab-2-paths)
  - [🧘 5. Sit Mechanics \& Guidance](#-5-sit-mechanics--guidance)
    - [Starting a Sit (Tab 3: Sit)](#starting-a-sit-tab-3-sit)
    - [During a Sit](#during-a-sit)
    - [Nightly Cycle, 4:00 AM Dawn Cutoff \& Nightfall](#nightly-cycle-400-am-dawn-cutoff--nightfall)
  - [💬 6. Reflections, Doubts, Insights \& The Circle](#-6-reflections-doubts-insights--the-circle)
    - [Post-Sit Flow](#post-sit-flow)
    - [Sit Reflections vs. Sit Doubts (Dedicated Streams)](#sit-reflections-vs-sit-doubts-dedicated-streams)
    - [Identity & Privacy: Master Knows, Circle Can Mask](#identity--privacy-master-knows-circle-can-mask)
    - [Sayadaw Insight Studio & Reusable Library (`sit_insights`)](#sayadaw-insight-studio--reusable-library-sit_insights)
    - [Instant Notification Dispatch](#instant-notification-dispatch)
    - [Awaiting vs. Open State (Practice Precedes Wisdom)](#awaiting-vs-open-state-practice-precedes-wisdom)
  - [🔄 7. Return, Start Over \& Path Completion](#-7-return-start-over--path-completion)
    - [Return vs. Start Over](#return-vs-start-over)
    - [Starting Over a Complete Path](#starting-over-a-complete-path)
  - [🔀 8. Single Enrollment \& Switching](#-8-single-enrollment--switching)
  - [🙏 9. Dana Financial Impact System](#-9-dana-financial-impact-system)
    - [The Power of Dana](#the-power-of-dana)
    - [Dana Transparency (Tab 5: Me)](#dana-transparency-tab-5-me)
    - [Direct Donations](#direct-donations)
  - [📱 10. App Navigation \& Five Tabs](#-10-app-navigation--five-tabs)
    - [Tab 1: Sanctuary](#tab-1-sanctuary)
    - [Tab 2: Paths](#tab-2-paths-1)
    - [Tab 3: Sit (Center Tab)](#tab-3-sit-center-tab)
    - [Tab 4: Journey](#tab-4-journey)
    - [Tab 5: Me](#tab-5-me)
  - [🔔 11. Multi-Channel Notifications \& Alerts](#-11-multi-channel-notifications--alerts)
  - [🔍 12. Transparency Requirements](#-12-transparency-requirements)
  - [✅ 13. Edge Cases — Resolved](#-13-edge-cases--resolved)
  - [📋 14. Future Roadmap \& Backlog](#-14-future-roadmap--backlog)

---

## 🌙 1. Vision

MeritMoon is a **discipline-first mental cultivation platform** rooted in ancient, time-honored Theravada meditation traditions. The practices here are thousands of years old. They endure not because they are trendy, but because they meet the mind with depth, honesty, and care.

Every design decision exists to serve one purpose: **genuine inner transformation through unbroken nightly practice under the moon.**

There are no superficial streak counters. No gamified badges for merely launching the app. The only thing at stake is **real path merits** — and that is serious enough on its own. If meditators love the practice, they return. We do not manipulate meditators with streak anxiety. Cultivating and protecting real merits is the true spiritual journey.

---

## 🛤️ 2. Two Paths

### The Forest Path (Free)

| Aspect | Rule |
| :--- | :--- |
| **Price** | Free, always |
| **Path access** | All paths, earned step by step through nightly practice |
| **4:00 AM dawn cutoff miss** | Active path merits return to Night 1. Server remembers max merits reached. |
| **Path completion** | Complete final night $\rightarrow$ Complete (permanent sanctuary status) |
| **Merits protection** | ❌ None — miss the 4:00 AM dawn cutoff and active merits return to Night 1 |
| **Switching paths** | Current path returns to Night 1 (unless already Complete) |

### The Moonlit Path ($9.99/month)

| Aspect | Rule |
| :--- | :--- |
| **Price** | $9.99/month |
| **Path access** | All paths, instant full access |
| **4:00 AM dawn cutoff miss** | Path merits **preserved** — continue from where you left off |
| **Why merits are preserved** | **Dana is powered as a merit.** Supporting masters and monasteries shields your merits from returning to Night 1. |
| **Path completion** | Complete final night $\rightarrow$ Complete (permanent sanctuary status) |
| **Switching paths** | Current path **stays saved** at current night/merits (until subscription ends) |
| **Dana Contribution** | Direct percentage of subscription revenue flows directly to monasteries and masters (MeritMoon absorbs all transaction fees) |

### 🛡️ The "Moonlit Promise" & No-Marketplace Policy

> **The Sacred Promise of Moonlit**: Once a meditator steps onto the **Moonlit Path**, they enter a true sanctuary. They will **never** encounter an unexpected paywall, locked masterclass, or upsell banner inside the app.

1. **No Fragmented Paywalls / Marketplace Chaos**:
   - There are **no individual path price tags**, no standalone path sales, and no volatile master-set price changes.
   - Having a paid subscription and hitting a *"Pay $29 to unlock this master"* banner destroys trust and breaks the serene meditation atmosphere. In MeritMoon, Moonlit means **100% all-inclusive, unrestricted access** to every path, master, and masterclass.
2. **No Decision Fatigue for the Meditator**:
   - Meditators come to quiet their minds, not to compare pricing options, calculate discounts, or manage shopping carts.
3. **Pure Dana-Driven Master Support**:
   - Masters and monasteries are supported through the pooled **Dana Impact Fund** funded by Moonlit memberships and direct offerings, removing commercial pricing pressures from venerable masters.

> [!IMPORTANT]
> There is **no streak counter** anywhere in MeritMoon. Motivation comes from genuine practice, inner peace, and the meaningful consequence of earning and preserving merits.

### Moonlit Recovery — Restoring Merits After a Return

If a Forest Path meditator experiences an automatic **return** (missed their 4:00 AM dawn cutoff), the server permanently remembers their highest reached night:

```
Forest: Night 1 → Night 2 → ... → Night 10 → ⏰ Missed 4 AM → Return to Night 1
                                                              ↓
                                                   Meditator joins Moonlit
                                                              ↓
                                                   Nights 1–10 merits restored
                                                   Continue from Night 10
```

If a Forest meditator returned to Night 1, practiced up to Night 3, and then joined Moonlit:

```
Forest: Night 10 → ⏰ Return to Night 1 → Night 2 → Night 3 → Joins Moonlit
                                                              ↓
                                                   Nights 1–10 merits restored
                                                   (server remembers max = Night 10)
                                                   Continue from Night 10
```

---

## 🪷 3. The Merits System: Cultivation, Not Credits

MeritMoon has **zero credit or token shops**. Merits (*Kusala / Pāramī*) are never commercial currency to be spent or traded. They represent the sacred spiritual ledger of cultivation:

1. **Present Night Progression**: Advancing night by night by completing all assigned Sits for that night before 4:00 AM dawn.
2. **Dana as Merit**: Moonlit meditators power their practice with Dana (generosity), which is recognized as an active spiritual merit that protects path progress from returning to Night 1.
3. **Begin Anew**: When a meditator chooses to **Begin Anew** on a Complete path, they embark on a completely fresh, intentional journey with a beginner's mind.
4. **Permanent Accomplishment Records**: Even if active path progress returns to Night 1 upon missed dawn or Begin Anew, the meditator's lifetime records permanently preserve what they have accomplished (total meditation hours, total completed sits, complete paths, and milestone achievements).

---

## 📚 4. Meditation Paths & Curricula

### Traditions (Upanissaya) & Monasteries
Paths are rooted in authentic meditation traditions (*Upanissaya* / **ဥပနိဿယ**) and hosted by revered meditation centers (*Monasteries*):
- **Pa-Auk Tradition**: *Samatha leading to Vipassana, nimitta, deep absorptions, 4 elements.*
- **The-Inn-Gu Tradition**: *Vedana Vipassana, observation of intense sensations.*
- **Yay-Soon Tradition**: *Direct mindful awareness and insight.*
- **Myay-Zin Tradition**: *Mindful grounding and breath.*
- **Mahasi Tradition**: *Noting rising & falling.*
- **Mogok Tradition**: *Dependent origination and mental formations.*

### Mind Natures & Centralized Curriculum Focus

Meditation is tailored medicine for the mind. MeritMoon rejects artificial "easy/hard" rankings, categorizing paths and nights by **Mind Nature** (Pali: *Carita* / Burmese: **စိတ်စရိုက်သဘာဝ**), strictly rooted in the canonical Theravada 6 Carita (*Cha-carita* / **စရိုက် ၆ ပါး**):

- **Path Level (`paths.natures`)**:
  - Single ordered array of natures sorted from strongest to weakest (e.g. `[2, 0]`).
  - The first entry (`natures.first`) is automatically the primary, strongest root nature the path is built to eliminate (featured on cards, carousels, and main catalog filters).
  - Curriculum curators are encouraged to specify only **1 to 2 natures** per path for razor-sharp practice focus.
- **Night Level (`nights.nature`)**:
  - Each individual night focuses on its specific mind nature (e.g. Night 1 reduces anger, Night 2 reduces greed). A path does not need to cover all natures across its nights.

> **The 6 Canonical Mind Natures (*Cha-carita* / စရိုက် ၆ ပါး)**:
> 1. **Anger-Calming** (*Dosa-carita*): For minds prone to irritation, annoyance, and aversion $\rightarrow$ Loving-kindness (*Mettā*), patience.
> 2. **Greed-Subduing** (*Rāga-carita*): For minds prone to attachment, longing, and craving $\rightarrow$ Body contemplation (*Asubha*), mindfulness of physical nature.
> 3. **Restlessness-Stilling** (*Vitakka-carita*): For overactive, scattered thoughts and mental wandering $\rightarrow$ Breath concentration (*Anāpāna*), single-pointed anchor.
> 4. **Confusion-Clearing** (*Moha-carita*): For bewilderment, doubt, and mental cloudiness $\rightarrow$ Clear comprehension, mindful grounding.
> 5. **Wisdom-Inquiring** (*Buddhi-carita*): For analytical and investigative minds $\rightarrow$ 4 Elements (*Dhātu*), Vipassana insight.
> 6. **Faith-Inspiring** (*Saddhā-carita*): For emotional balance and devotion $\rightarrow$ Recollections of the Triple Gem (*Buddhanussati*).

### Multi-Master Collaboration & Assembly Seats
A path can feature multiple masters collaborating under specific traditional assembly seats:
- **Head Master / Sayadaw** (`seat: 0: head`): The principal meditation master delivering root instruction.
- **Assistant Master** (`seat: 1: assistant`): Supporting guide providing practical drills and advice.
- **Dhamma Translator** (`seat: 2: translator`): Multilingual Dhamma interpreter translating discourse.

### Path Structure: Path $\rightarrow$ Night $\rightarrow$ Sit
- **Strict 3-Tier Hierarchy**: `paths` $\rightarrow$ `nights` $\rightarrow$ `sits`.
- **Overview & Syllabus**: Every path includes both a concise **Summary** (browsing hook) and an in-depth **About** (detailed syllabus & doctrinal teachings).
- **Nights & Sits Sequencer**: A path spans $N$ **Nights** (`nights` table, `night: 1..N`), each addressing its own `nature` and containing 1 to 5 sequenced **Sits** (`sits` table, `sit: 1..5`). Zero bloated `position` columns.
- **Database Alignment**: Prescribed curriculum sits live in `sits` (linked to `night_id`). Completed user sessions live in `sit_records`.
- **Single Master Audio Stream**: Each Sit plays **1 pure master audio track** (clean voice mastered with subtle natural acoustics in production) to prevent dual-stream frequency clashing (Hz masking).
- **Publishing Rule**: A path can **only** be marked published if all child nights are published (and each night is complete only when all child sits inside are published).

```
Path (e.g., "Pa-Auk Anāpāna Foundations")
├── Tradition: Pa-Auk | Monastery: Pa-Auk Tawya
├── Natures: [Restlessness-Stilling, Wisdom-Inquiring] (Primary: Restlessness)
├── Masters: Head Master (Sayadaw) + Assistant Master
├── Masterclass (Video Preview + Guided Sit)
├── Summary & Detailed Syllabus Description
├── Featured Reflections (Curated reflections from meditators)
│
├── Night 1 (Nature: Restlessness-Stilling — Cooling the Wandering Mind)
│   ├── Preparation (posture, breath orientation, room setup)
│   ├── Sit 1 (Finding Your Anchor, 10 min)
│   └── Sit 2 (Evening Metta, 15 min)
│
├── Night 2 (Nature: Anger-Calming — Releasing Irritation)
│   └── Sit 1 (Staying with the Touch-Point, 15 min)
│
├── ...
├── 🏔️ Milestone (e.g., Samatha complete → Vipassana begins)
└── Night N (Final Night — Completing the Path)
    └── 🎉 PATH COMPLETE (Permanently rooted in Sanctuary)
```

### Content Types

| Type | Description |
| :--- | :--- |
| **Preparation** | Displayed before a sit begins. Explains posture, terminology, and room setup so no session time is wasted adjusting. |
| **Sitting meditation** | Eyes closed, audio-guided sitting. The core foundation. |
| **Walking meditation** | Mindful standing/walking. Preparation instructs space requirements. |
| **Lying down meditation** | Body scan and deep relaxation. Preparation guides alignment. |
| **Silent sitting** | Audio guidance at the beginning and end with unguided silence in between. |
| **Partial guidance** | Audio for opening minutes, sustained silence, and concluding chime. |

### Masterclasses
Every path features an introductory **Masterclass** (freely accessible without enrollment):
- **Video preview**: Master explaining the tradition, philosophy, and practical transformation.
- **Guided preview sit**: A direct experiential taste of the technique.

### Paths Display (Tab 2: Paths)
- Path cards feature **subtle loop video backgrounds** (gentle movement, fireflies drifting).
- Inside Path Detail: Masterclass $\rightarrow$ About $\rightarrow$ Featured Reflections $\rightarrow$ Night list.
- **Future locked nights do NOT display titles** — preserving the sacred element of discovery.

---

## 🧘 5. Sit Mechanics & Guidance

### Starting a Sit (Tab 3: Sit)

Tab 3 (**Sit**) is the elevated center tab. It directs the meditator straight into their current required Sit.

| State | What Tab 3 Displays |
| :--- | :--- |
| **No path enrolled** | "Your journey begins with a path" $\rightarrow$ Browse Paths CTA |
| **Sit available** | Preparation card $\rightarrow$ "Begin Sit" CTA |
| **All tonight's Sits complete** | Congratulations $\rightarrow$ Night Merits secured $\rightarrow$ prompt to leave a Sit Reflection or Doubt |
| **Waiting for next night** | Countdown to next night's unlock |

### During a Sit

| Element | Rule & Behavior |
| :--- | :--- |
| **Guidance Presence** | Strictly **Master-determined**. Meditators cannot choose silent vs guided mode or toggle audio off; if a Sit has audio, the meditator follows along with the master's guidance. |
| **The Guidance Display** | Spoken audio guidance paired with an elemental **one sentence long** real-time text reveal. Does **not** show yet-to-speak words. Words appear in real-time as spoken; the entire sentence replaces only when transitioning to the next sentence. |
| **Visual Immersion** | Full-screen meditative view: breathing moon mascot, timer, and subtle glowing ring. |
| **Screen Sleep** | Phone sleep is supported. When timer reaches zero, a **peaceful chime** sounds. |
| **Rewind Mechanics** | Can rewind **10 seconds** per tap. Cannot fast-forward beyond maximum reached point. |
| **Rewind Balance** | 3 rewinds grant up to 3 fast-forwards (only up to highest listened point). |
| **Leaving Tab 3** | ❌ **Sit progress lost.** Must re-sit from the beginning of that Sit. |
| **Closing App / Backgrounding** | ❌ Sit progress lost. |
| **Phone Call — Declined/Snoozed** | ✅ Sit continues uninterrupted. |
| **Phone Call — Accepted** | ❌ Sit progress lost. |

### Nightly Cycle, 4:00 AM Dawn & Nightfall
- When all Sits for a night are finished $\rightarrow$ The night is complete! `present_night` advances to the next nocturnal milestone (`present_night += 1`).
- **Fixed 4:00 AM Dawn**: Every night's practice must be finished before **4:00 AM local time** (`dawn: "04:00"`). Non-customizable. This gives meditators the entire night until morning dawn to sit.
- **Timezone Anchoring**: When enrolled, the path's timezone is locked (`user_paths.timezone`). If the meditator travels, the dawn boundary remains strictly anchored to the enrollment timezone's 4:00 AM.
- **Nightfall Notification**: As evening arrives (*"Night is falling..."*), a gentle push notification alerts the meditator if tonight's Sits are still pending before 4:00 AM dawn.
- If a Sit is in active progress when 4:00 AM arrives, **the active Sit is never interrupted**; completing it secures that night and advances to the next stage.

---

## 💬 6. Reflections, Doubts, Insights & The Circle

### Post-Sit Flow

Immediately after a Sit concludes (peaceful chime sounds and duration requirement is satisfied):
1. **Completion Screen**: The meditator is presented with their accomplishment confirmation and night advancement (e.g. *Night 3 Complete $\rightarrow$ Night 4 Awaits*).
2. **Post-Sit Invitation**: A gentle prompt:
   - *"Sit complete. Rest in stillness, or leave a Reflection or bring a Doubt to Master."*
3. **Dedicated Submission**: Meditator chooses **either** a **Reflection** (`sit_reflections`) or a **Doubt** (`sit_doubts`). Or taps *"Rest in Stillness"*.

```
┌────────────────────────────────────────────────────────┐
│ 🌕 Sit Complete: Night 3 Morning Anchor                │
│                                                        │
│ [✦ 15 Minutes Sat]       [Night 3 Merits: Secured]     │
├────────────────────────────────────────────────────────┤
│ ✍️ Leave a Sit Note for Tonight                        │
│                                                        │
│ Choose type: (●) Reflection    ( ) Doubt               │
│                                                        │
│ ┌────────────────────────────────────────────────────┐ │
│ │ What arose in your mind or breath during sit?      │ │
│ │ (or: what obstacle/uncertainty do you bring?)      │ │
│ └────────────────────────────────────────────────────┘ │
│                                                        │
│ [✓] Display as "A Meditator" in The Circle             │
│     (Master always sees your true name in admin)       │
│                                                        │
│ [ Share ]                                              │
└────────────────────────────────────────────────────────┘
```

### Sit Reflections vs. Sit Doubts (Dedicated Streams)

| Submission | Database Table | Purpose | Workflow |
| :--- | :--- | :--- | :--- |
| **Reflection** | `sit_reflections` | Meditative report on what arose (calmness, subtle sensations, mindfulness). | Instantly approved and displayed in The Circle under Reflections. Can be curated as "Featured Reflection" for the Path. A Master can also optionally bestow an Insight upon a profound reflection via `sit_insight_id`. |
| **Doubt** | `sit_doubts` | Practice obstacle or technique uncertainty brought to the Master. | Routes to Master's Inbox. Cleared when an Insight from `sit_insights` is assigned. Appears in The Circle with the Insight. |

### Identity & Privacy: Master Knows, Circle Can Mask

1. **Master Transparency**:
   - The Master **always** sees the real identity, sitting history, and practice logs of the meditator. Spiritual master interviews require complete transparency.
2. **Masked in The Circle (`anonymous: true`)**:
   - Meditators can toggle `anonymous: true` so their public display name appears as **"A Meditator"** in The Circle. This protects vulnerable sharing without fear of judgment.

### Sayadaw Insight Studio & Reusable Library (`sit_insights`)

To avoid repetitive inflation of identical questions across hundreds of meditators:
1. **Reusable Insight Library (`sit_insights`)**:
   - Stores authoritative teachings composed by masters for each `sit`.
   - Master can compose a written teaching and attach an optional spoken audio blessing.
2. **Multi-Doubt Assignment Flow**:
   - When a Master opens their Inbox, they can **either**:
     - **A) Compose New Insight**: Writes a fresh teaching $\rightarrow$ automatically saves into `sit_insights` library.
     - **B) Assign Existing Insight**: Selects a previously composed Insight from that Sit's library!
   - Sayadaw can select **multiple similar doubts at once** (e.g. 5 meditators asking about tightness at the nose) and assign the matching Insight with **1 click**.
3. **Instant Resolution**:
   - `sit_doubts.sit_insight_id` is linked.
   - Status updates automatically (`sit_insight_id.present?`).
   - Notifications are dispatched to all affected meditators.
   - The Insight appears in The Circle, honoring the meditators who brought the doubt.

### Instant Notification Dispatch

When the Master assigns or shares an Insight:
1. **Push Notification (OneSignal)**:
   - Dispatched immediately to meditator's mobile device:
   - *"Sayadaw [Name] shared an Insight on your doubt for [Sit Title]: '[First 60 chars]...' "*
2. **In-App Notification (ActionCable WebSocket)**:
   - Injected live into the meditator's bell and inbox.
3. **Deep Linking**:
   - Tapping opens that completed Sit's Circle, highlighting the Insight in gold.

### Awaiting vs. Open State (Entering The Circle)

1. **Achieving Entry into The Circle**:
   - Entering The Circle is an achievement earned through practice.
   - Sits are meant to be experienced directly, not intellectualized beforehand.
   - **Before sitting tonight**: Status is **Awaiting** (*"The Circle is awaiting your sit tonight"*). Uncompleted Sits strictly conceal community reflections, doubts, and insights.
2. **Open State & Browsing Past Nights**:
   - The moment tonight's Sit is complete, The Circle flips to **Open**.
   - Meditators can read tonight's reflections and doubts, and can also **browse back through previous completed nights** to review past doubts and insights.
   - **Forest Path Rule**: Access to the Circle remains available as long as active practice remains unbroken. If a night is missed and the path returns to Night 1, future nights' Circles return to **Awaiting** until the meditator walks the path back up (or joins Moonlit). Complete paths remain open permanently.
3. **Server-Side Authorization (`CirclePolicy`)**:
   - Super Admin and Masters can unconditionally enter and answer (`user.super_admin? || user.master?`).
   - Meditators can only enter once they have completed this specific sit: `user.completed_sit?(sit)`.
   - If not sat: API returns `403 Forbidden` (`code: 403, error: "The Circle is awaiting your sit tonight."`).

---

## 🔄 7. Return, Begin Anew & Path Completion

### Return vs. Begin Anew

| Scenario | Nature | Effect on Forest Path | Effect on Moonlit Path |
| :--- | :--- | :--- | :--- |
| **Return** (`return`) | Automatic (missed 4:00 AM dawn) | Active path progress returns to Night 1. Server stores max progress (`max_night_reached`). Joining Moonlit restores all earned nights. | **No return.** Dana is powered as a merit, preserving active path progress (`present_night`). |
| **Begin Anew** (`begin_anew`) | Intentional (meditator chooses fresh start) | Active path progress resets to Night 1. Meditator walks path fresh with a beginner's mind. | Active path progress resets to Night 1. Meditator walks path fresh with a beginner's mind. |

### Beginning Anew on a Complete Path
- When a meditator completes all nights of a path, it is marked **Complete** (permanently rooted in their Sanctuary).
- **Complete paths never return to Night 1 automatically**, even if changing paths or reverting to the Forest path.
- If the meditator intentionally chooses to **Begin Anew** on a Complete path:
  - Active path progress resets to Night 1 (`present_night: 1`) so they can re-experience the journey with a beginner's mind.
  - Lifetime sitting hours and completed sit records remain forever intact.

---

## 🔀 8. Single Enrollment, Stopping & Switching

Meditators can only be actively enrolled in **one path at a time** to maintain undivided mental concentration.

> [!NOTE]
> **Zero "Paused" State**: Paths are never passively "paused" like video streaming. When a meditator switches away from an incomplete path, that path is **stopped** (`status: 2: stopped`).

| Meditator Path | Switching Situation | Result & Return Behavior |
| :--- | :--- | :--- |
| **Forest** | Enrolled in Path A (Night 7) $\rightarrow$ Switch to Path B | Path A stops (`status: 2: stopped`). Active progress returns to Night 1 (`present_night: 1`). Server preserves Night 7 in `max_night_reached`. Path B begins Night 1. When returning to Path A later on Forest, **they start from Night 1**. |
| **Forest** | Path A is Complete $\rightarrow$ Enroll in Path B | Path A remains permanently Complete (`status: 1: completed`). Path B begins Night 1. |
| **Moonlit** | Enrolled in Path A (Night 7) $\rightarrow$ Switch to Path B | Path A stops (`status: 2: stopped`). Server preserves Night 7 in `max_night_reached`. Path B begins Night 1. |
| **Moonlit** | Returning to Path A after walking Path B (or after a period away) | All nights up to `max_night_reached` (Nights 1–7) are unlocked. Because it has been a while since their last sit on Path A, the app displays the **Welcome Back Dialog**:<br>• **(Recommended) Begin Anew**: Start fresh from Night 1 to rebuild mindful breath and concentration.<br>• **Continue from Night 8**: Resume at the next unlocked night. |
| **Moonlit** | Subscription ends while Path A was stopped | Reverts to Forest rules upon lapse: active pointer resets to Night 1, but `max_night_reached = 7` is saved forever on the server. Re-subscribing to Moonlit brings back the Return Prompt Dialog. |

### 💬 Welcome Back Dialog (Returning to a Stopped Path)

When a Moonlit walker returns to a previously stopped path with unlocked nights:

```
┌────────────────────────────────────────────────────────┐
│ 🌕 Welcome Back to Pa-Auk Foundations                  │
│                                                        │
│ You previously walked up to Night 7 under the moon.    │
│ Since it may have been a while since your last sit,    │
│ we recommend beginning anew with a fresh mind to       │
│ rebuild your foundation.                               │
│                                                        │
│ [ 🌿 (Recommended) Begin Anew from Night 1 ]           │
│                                                        │
│ [ 🌕 Continue from Night 8 ]                           │
└────────────────────────────────────────────────────────┘
```

---

## 🙏 9. Dana Financial Impact System

### The Power of Dana
- A direct percentage of Moonlit subscription revenue flows to authentic monasteries and masters.
- **MeritMoon absorbs all payment processing and transaction fees** — ensuring the full dedicated percentage reaches the monasteries.
- _Dana is powered as a merit_, bridging personal practice with communal generosity.

### Dana Transparency (Tab 5: Me)
- **Monthly & Cumulative Breakdown**: Total funds distributed and monasteries supported.
- **Monastery Profiles**: Names, locations, traditions, and abbots.
- **Master Voices**: Short audio/video messages from tradition masters.
- **Individual Donors**: Dedicated recognition for patrons who contribute direct offerings beyond their subscription.

### Direct Donations
- Meditators can reach out to MeritMoon to donate to a **specific monastery** beyond their subscription.
- After successful direct donation, meditator is featured as an individual donor on the Dana Impact page (with consent).

---

## 📱 10. App Navigation & Five Tabs

```
┌──────────────────────────────────────────────┐
│ 🌕 38px Moon Mascot    MeritMoon    [⚙️]      │
└──────────────────────────────────────────────┘
```

### Bottom Navigation (5 Tabs)

```
┌───────────┬───────────┬───────────┬───────────┬───────────┐
│    🌿     │    📚     │    🌕     │    🏔️     │    👤     │
│ Sanctuary │   Paths   │    Sit    │  Journey  │    Me     │
└───────────┴───────────┴───────────┴───────────┴───────────┘
```

### Tab 1: Sanctuary
- **Path Merits Hero**: Current path progress bar (Night 7 of 30 Merits) + tonight's sit status.
- **Daily Insight**: Wisdom card relevant to current enrolled path. Refreshed daily.
- **Community Telemetry**: Real-time counter: **Sitting Now** under the moon.

### Tab 2: Paths
- **Masterclasses Carousel**: Preview cards with video and introductory guided sits.
- **Featured Paths**: Loop video cards with drifting fireflies.
- **Masters**: Monastic profiles and traditions synced alongside paths.
- **Path Detail**: Masterclass $\rightarrow$ About $\rightarrow$ Featured Reflections $\rightarrow$ Night List (future locked nights hide titles) $\rightarrow$ Enroll CTA.

### Tab 3: Sit (Elevated Center Tab)
- **Preparation**: Posture guidance, environment orientation $\rightarrow$ "Begin Sit" CTA.
- **Active Sit**: Full-screen immersive moon mascot with breathing ring + timer + 1-sentence real-time Guidance. **Zero navigation possible.**
- **Post-Sit**: Night Merits celebration $\rightarrow$ Leave a Reflection or bring a Doubt to Master $\rightarrow$ The Circle.
- **Waiting**: Countdown timer to next night's unlock.

### Tab 4: Journey
- **Path Merits Detail**: In-depth progress meter with milestone markers.
- **Practice Calendar**: Monthly grid (emerald ● = completed night, gold ● = tonight, empty ○ = missed).
- **Session History**: Timeline of completed sit records (`sit_records`). Tapping any completed sit navigates straight to its **Circle**.
- **Lifetime Records**: Milestones, total sitting hours, complete paths.
- **Complete Paths**: Library of Complete paths (re-listen or start over to earn again merits).

### Tab 5: Me
- **Meditator Info**: Avatar, username, member since, total sitting hours.
- **Path Status**: Forest / Moonlit badge + manage subscription.
- **Dawn Cutoff**: Anchored 4:00 AM dawn local cutoff indicator.
- **Dana Impact**: Full transparency breakdown (monthly totals, monasteries supported, master audio blessings, donor wall).
- **Settings**: App preferences, notifications, identity mask default.

---

## 🔔 11. Multi-Channel Notifications & Alerts

| Event | Channel | Trigger & Message |
| :--- | :--- | :--- |
| **Master's Insight** | Push + In-App | Triggered when Master answers doubt: *"Sayadaw [Name] shared an Insight on your doubt for [Sit Title]."* |
| **Nightfall Alert** | Push | Triggered in evening (*"Night is falling..."*): Reminds meditator to sit before 4:00 AM dawn. |
| **Night Unlock** | Push + In-App | Triggered at 4:00 AM dawn: *"A new night has dawned. Night [N] Merits are now open for your sitting."* |
| **Morning Contemplation** | Push | Triggered at 07:30 local time: Morning contemplation tailored to current path temperament. |
| **Monthly Dana Report** | In-App + Email | Summary of collective contributions delivered to monasteries. |

---

## 🔍 12. Transparency Requirements

1. **No Unexpected Merits Loss**: Return triggers and 4:00 AM dawn deadlines are clearly displayed.
2. **Dana Accounting**: Absolute clarity on fee absorption and monastery support distributions.
3. **Sitting Integrity**: Explicit preparation warning before every timer start.
4. **Circle Identity**: Clear toggle whether a reflection/doubt displays your name or **A Meditator**.

---

## ✅ 13. Edge Cases — Resolved

| Edge Case | Resolution |
| :--- | :--- |
| **Viewing The Circle before sitting** | State is **Awaiting**. Unlocks into **Open** immediately upon sit completion. |
| **Timezone & Travel** | Locked to the meditator's enrollment timezone at 4:00 AM dawn. Evaluated strictly via UTC on the server. Travel does not auto-drift the active path. |
| **Connectivity** | **Online-only** to guarantee server-side merit verification and sitting logs. |
| **Multi-Device Login** | Follows RexOne Law U4 (platform-isolated sessions `web`, `android`, `ios`). Logging into another Android device replaces the previous Android token. |
| **Phone Call Handling** | Declined / snoozed $\rightarrow$ sit continues. Accepted $\rightarrow$ sit cancelled. |
| **Starting Over Complete Path** | Completed status is permanent in lifetime records; active run returns to Night 1 allowing a genuine fresh experience. |

---

## 📋 14. Future Roadmap & Backlog

| Feature | Notes |
| :--- | :--- |
| **Live Gatherings** | Monthly live streaming Dhamma Q&A with Sayadaws. |
| **Sayadaw Audio Insights** | Expanding master answers from text to recorded voice blessings. |
| **Offline Practice Mode** | Potential Moonlit offline pack with cryptographic verification. |
| **Deaf Accessibility** | Full written transcripts as alternative to audio guidance. |
| **Presence Verification** | Gentle periodic breath sync or presence taps for lengthy sittings. |
