# 🌕 MeritMoon Admin Control Panel — Product Specification

> **The Operational Sanctuary**: The central management platform powering the MeritMoon mobile & web client experience.
> Built directly on top of the **RexOne Ecosystem** (`rexone-core` Rails API, `rexone-web` React 19/TypeScript SPA, and `rexone_mobile` Flutter).

---

## 🧭 System Overview & RexOne Foundation

The MeritMoon Admin Panel provides comprehensive operational control over meditation paths, nightly sits, lineages, monastery Dana distributions, meditator merits, and master Dhamma insights.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        🌕 MeritMoon Ecosystem                          │
├──────────────────────────┬─────────────────────────────────────────────┤
│  Client Apps             │  Flutter Mobile (iOS / Android) + Web App   │
├──────────────────────────┼─────────────────────────────────────────────┤
│  Admin Control Panel     │  React 19 + TypeScript SPA (`rexone-web`)   │
│                          │  - Design System (`src/design/`)            │
│                          │  - Granular RBAC (`master_admin`, etc.)     │
│                          │  - Jotai Reactive Atoms (`src/atoms.ts`)    │
├──────────────────────────┼─────────────────────────────────────────────┤
│  API & Operations Core   │  Ruby on Rails API (`rexone-core`)          │
│                          │  - ActionCable WebSockets (Live Telemetry)  │
│                          │  - Garage Object Storage (`storage_key`)    │
│                          │  - Pagy Offset Pagination                   │
│                          │  - SolidQueue Background Jobs               │
│                          │  - Stripe Engine (Sub & Dana Pool Math)     │
│                          │  - OneSignal Push Dispatcher                │
└──────────────────────────┴─────────────────────────────────────────────┘
```

---

## 📋 Table of Contents

- [🌕 MeritMoon Admin Control Panel — Product Specification](#-meritmoon-admin-control-panel--product-specification)
  - [🧭 System Overview \& RexOne Foundation](#-system-overview--rexone-foundation)
  - [📋 Table of Contents](#-table-of-contents)
  - [🔐 1. Admin Architecture \& Roles (IAM)](#-1-admin-architecture--roles-iam)
  - [📚 2. Path \& Curriculum Studio](#-2-path--curriculum-studio)
    - [Key Administrative Features](#key-administrative-features)
    - [Unified Monetization \& The Moonlit Promise](#unified-monetization--the-moonlit-promise)
  - [🏛️ 3. Traditions (Upanissaya), Monasteries \& Masters Directory](#️-3-traditions-upanissaya-monasteries--masters-directory)
  - [🧘 4. Sayadaw Dhamma Insight \& Doubts Studio](#-4-sayadaw-dhamma-insight--doubts-studio)
    - [Sayadaw Inbox \& Filtering](#sayadaw-inbox--filtering)
    - [Reusable Insight Library \& Multi-Doubt Assignment (`sit_insights`)](#reusable-insight-library--multi-doubt-assignment-sit_insights)
    - [Instant Notification \& WebSocket Broadcast](#instant-notification--websocket-broadcast)
    - [Identity \& The Circle Display](#identity--the-circle-display)
  - [👤 5. Meditator \& Merits Management](#-5-meditator--merits-management)
    - [Administrative Actions](#administrative-actions)
  - [💬 6. Reflections \& Featured Curation](#-6-reflections--featured-curation)
  - [💰 7. Dana Financial Impact Engine](#-7-dana-financial-impact-engine)
    - [1. Revenue \& Dana Pool Ledger](#1-revenue--dana-pool-ledger)
    - [2. Monastery Dana Support Allocator](#2-monastery-dana-support-allocator)
    - [3. Individual Donor Wall](#3-individual-donor-wall)
  - [📡 8. Live Telemetry \& Push Dispatcher](#-8-live-telemetry--push-dispatcher)
  - [🖥️ 9. Admin UI Layout \& Navigation](#️-9-admin-ui-layout--navigation)
  - [🎯 Implementation Roadmap](#-implementation-roadmap)

---

## 🔐 1. Admin Architecture & Roles (IAM)

Leveraging `rexone-core` IAM with granular permissions (`Role`, `Permission`, `UserRole`):

| Role | Permissions & Access Scope |
| :--- | :--- |
| **Super Admin** (`super_admin`) | Full system authority: System settings, IAM role assignments, Dana ledger approvals, database logs, and destructive operations. |
| **Path Curator** (`curator_admin`) | Path builder, night/sit sequencer, audio uploads via Garage S3, masterclass configuration, master profiling. |
| **Master Admin** (`master_admin`) | Assigned to venerable Sayadaws and meditation masters. **Full access to the Sayadaw Dhamma Insight Studio**: View doubts and reflections for assigned paths, compose text/audio insights, and clear meditator doubts. |
| **Circle Moderator** (`circle_admin`) | Sitting reflections review queue, spam moderation, and selecting featured reflections for Path Detail pages. |
| **Dana & Financial Auditor** (`dana_admin`) | Subscription Dana pool auditing, monastery payout tracking, direct donor management, revenue ledger access. Read-only on curriculum. |
| **Support Specialist** (`support_admin`) | Meditator lookup, return history inspection, manual session/merit issue resolution, push notification dispatching. |

---

## 📚 2. Path & Curriculum Studio

The core engine where ancient meditation teachings are structured into progressive nightly practices (`sits`).

```
Path (e.g. "Pa-Auk Anāpāna Foundations")
├── General Info (Title, Tag, Subtitle, Tradition, Loop Video Asset, Cover)
├── Summary (Short Browsing Hook) & Detailed Syllabus About
├── Moonlit Path Toggle (false: Free Forest Path, true: Moonlit Path)
├── Natures (Ordered array: Strongest to weakest, e.g. [2, 0] — 1st is primary, 1–2 recommended)
├── Duration (Nights)
├── Multi-Master Team (Head Master, Assistant Master, Translator)
├── Masterclass (Video Preview + Guided Sit)
└── Nights (e.g. Night 1 to Night 30 — table: `nights`)
    ├── Night Nature Selector (e.g. Night 1: Restlessness-Stilling, Night 2: Anger-Calming)
    └── Sits (Sit 1..5 per Night — table: `sits`)
        ├── Title, Preparation & Instructions (Markdown Posture/Prep Notes)
        ├── Master Guidance Audio Asset (Garage S3, storage_key, exact duration in seconds)
        ├── Sit Number (`sit: 1..5` — e.g. 1 = Sit 1, 2 = Sit 2 of tonight)
        └── Published Toggle
```

### Key Administrative Features

1. **Path Publishing Validator**:
   - Strict integrity rule: A path **cannot** be toggled to `published: true` unless all child nights are published (and each night is complete only when all child sits inside are published).
2. **Dual Text Editors (Summary & About)**:
   - **Summary Editor**: Concise one-paragraph preview shown in carousels and cards (`summary`).
   - **About Editor**: Rich Markdown editor for deep syllabus, doctrinal context, and practice instructions (`about`).
3. **Centralized Mind Nature Selectors (Canonical Theravada *Cha-carita* / စရိုက် ၆ ပါး)**:
   - **Path Level**: Single sorted `natures` selector (ordered array `jsonb`, e.g. `[2, 0]`, sorted from strongest to weakest). The first entry automatically acts as the primary featured nature on cards, hero banners, and catalog filters. Curators are recommended to select only 1 to 2 natures per path.
   - **Night Level**: Each night assigns its single targeted `nature` integer (0..5), focusing tonight's practice (e.g., Night 1 reduces restlessness, Night 2 reduces anger).
   - **Canonical 6 Carita Enums (0..5)**:
     - `0: anger_calming` (*Dosa-carita* $\rightarrow$ Loving-kindness, patience)
     - `1: greed_subduing` (*Rāga-carita* $\rightarrow$ Asubha, body contemplation)
     - `2: restlessness_stilling` (*Vitakka-carita* $\rightarrow$ Anāpāna breath anchor)
     - `3: confusion_clearing` (*Moha-carita* $\rightarrow$ Clear comprehension, grounding)
     - `4: wisdom_inquiring` (*Buddhi-carita* $\rightarrow$ 4 Elements, Vipassana insight)
     - `5: faith_inspiring` (*Saddhā-carita* $\rightarrow$ Recollection of Buddha, peace)
4. **Multi-Master Team Assigner (`path_masters`)**:
   - Assigns multiple masters to a single path with monastic assembly seats (`seat`):
     - `0: head` (Principal Sayadaw / Head Master)
     - `1: assistant` (Supporting instructor)
     - `2: translator` (Dhamma interpreter)
5. **Night & Sit Sequencer (`nights` $\rightarrow$ `sits`)**:
   - Structure multi-sit nights seamlessly within the 3-tier hierarchy (`nights.night: 1..N` and `sits.sit: 1..5`, without bloated position columns).
   - Single pure master audio stream per sit (no dual ambient mixing on client).
6. **Enrollment & Completion Metrics**:
   - Displays real-time denormalized counters: `enrolled_users_count`, `completed_users_count`, and completion rate.

### Unified Monetization & The Moonlit Promise
- **No Fragmented Path Prices**: Admins and masters cannot attach individual price tags or create separate paywalls per path.
- **The Moonlit Promise**: Moonlit subscribers (`$9.99/mo`) hold 100% unrestricted access to every path and master on the platform with zero extra paywalls.
- **Master Compensation via Dana Pool**: Masters and monasteries are supported via the communal Dana Impact Fund rather than commercial per-path sales.

---

## 🏛️ 3. Traditions (Upanissaya), Monasteries & Masters Directory

Maintains the authentic traditions (Upanissaya), masters, and physical monastic centers receiving Dana.

### 1. Tradition Management (`traditions`)
- **Traditions (Upanissaya)**: Pa-Auk, The-Inn-Gu, Yay-Soon, Myay-Zin, Mahasi, Mogok.
- **Fields**: Name, unique tag (`tag`), about (historical overview & doctrinal foundation), curation priority (`priority`).

### 2. Monastery Management (`monasteries`)
- **Monastery Details**: Name, unique tag (`tag`), curation priority (`priority`), Tradition link (`tradition_id`), country, location/city, about, cover artwork (`type: "cover"`).
- **Support Profile (`support_info`)**: Monastery Kappiya steward contact details, banking/transfer information, and metadata required to receive Dana support.
- **Impact Gallery**: Photos and videos of monastery grounds, living quarters, and food offering ceremonies funded by Dana (`type: "gallery"`).

### 3. Master Management (`masters`)
- **Profile Fields**: Monastic Title (`title`, e.g., *Sayadaw, Venerable, Meditation Master*), unique tag (`tag`), Affiliated Monastery (`monastery_id`), curation priority (`priority`), Biography (`bio`), Ordination Flag (`monastic`), Assigned Paths.
- **Identity Sourced from `users` (`user_id`)**: Every Master is linked 1:1 to a `User` account (`users.id`). The Master's display name, unique handle, and avatar photo are sourced directly from `users` (`users.name`, `users.username`, `User` avatar asset), completely eliminating redundant duplicate name storage.
- **Ordination Flag (`monastic`)**: Distinguishes ordained monastics (`true`) from lay meditation masters (`false`).
- **Master Audio Voices**: Spoken blessing clips or audio reflections featured on the Dana Impact screen (`type: "audio"`).

---

## 🧘 4. Sayadaw Dhamma Insight & Doubts Studio

A dedicated operational hub for meditation masters and Sayadaws (`master_admin` role) to review meditator reflections, browse `sit_doubts`, and clear practice obstacles using the `sit_insights` library.

```
┌────────────────────────────────────────────────────────────────────────┐
│ 🧘 Sayadaw Insight Studio — Sayadaw U Ācinna         [12 Doubts Open]  │
├──────────────┬──────────────────┬──────────────────┬───────────┬───────┤
│ Meditator    │ Path & Sit       │ Meditator Doubt  │ Status    │ Action│
├──────────────┼──────────────────┼──────────────────┼───────────┼───────┤
│ @thiri_m     │ Pa-Auk (Night 3) │ "Tightness around│ [Pending] │[Assign│
│ (Shows true) │ Sit 1: Nostril   │ nostrils minute  │           │Insight│
│ [A Meditator]│ Anchor           │ 15..."           │           │Studio]│
├──────────────┼──────────────────┼──────────────────┼───────────┼───────┤
│ @zen_ko      │ Metta (Night 7)  │ "Felt deep warmth│ [Cleared] │[View  │
│              │ Sit 2: Boundless │ and tears of joy"│ (Insight) │Circle]│
└──────────────┴──────────────────┴──────────────────┴───────────┴───────┘
```

### Sayadaw Inbox & Filtering
- **Always Shows True Meditator Name**: Even if the meditator selected masked identity for The Circle, Sayadaw always sees their real username and sitting history (`sit_records`).
- **Scope by Master**: Automatically filters doubts to paths where the logged-in master is assigned via `path_masters`.
- **Status Filters**:
  - `Pending Doubts`: Practice obstacles submitted by meditators (`sit_doubts.where(sit_insight_id: nil)`) requiring instruction.
  - `Cleared Doubts`: Doubts where an Insight from `sit_insights` has already been assigned (`sit_doubts.where.not(sit_insight_id: nil)`).
  - `Reflections Queue`: Meditative reports (`sit_reflections`) submitted upon completing a sit.

### Reusable Insight Library & Multi-Doubt Assignment (`sit_insights`)
To prevent repetitive inflation of identical questions across hundreds of meditators:
1. **Reusable Master Insight Library**:
   - Each `sit` has a library of authoritative Dhamma teachings composed by the Master.
   - When reviewing doubts, Sayadaw can **either**:
     - **A) Compose New Insight**: Writes a fresh teaching $\rightarrow$ automatically saves into `sit_insights` library.
     - **B) Assign Existing Insight**: Picks a previously composed Insight from this Sit's library!
2. **Multi-Doubt Bulk Assignment**:
   - Sayadaw can select **multiple similar doubts at once** (e.g. 5 meditators asking about tightness at the nostril anchor) and assign the matching Insight with **1 click**.
3. **Meditator Context Drawer**:
   - Shows meditator's present night, total sitting hours, verified sitting duration, and mood report from `sit_records`.
4. **Audio Voice Blessing Upload**:
   - Sayadaws can upload or record a direct spoken audio blessing/answer, linked polymorphically to `assets` (`assetable_type: "Sit::Insight"`).

### Instant Notification & WebSocket Broadcast
- When Sayadaw clicks **"Assign Insight & Clear Doubt"**:
  1. Record updated: `sit_doubts.update!(sit_insight_id: insight.id, answered_at: Time.current)`.
  2. Dispatches `UserNotification` record in `rexone-core`.
  3. ActionCable broadcasts WebSocket event to meditator's active app.
  4. OneSignal push notification dispatched:
     *"Sayadaw [Name] shared an Insight on your doubt for [Sit Title]: '[First 60 chars]...' "*
  5. The Circle for that sit updates in real-time.

### Identity & The Circle Display
- **Identity Masking**: If the meditator checked `Display as "A Meditator"`, the public Circle displays `A Meditator`, while Sayadaw's admin view clearly shows the meditator's real account name.
- **Feature in The Circle**: Sayadaws can pin exceptional insights (`is_featured: true`) to the top of The Circle as exemplary guidance for the whole community.

---

## 👤 5. Meditator & Merits Management

Provides customer support and transparent visibility into meditator journeys without violating personal meditation sanctity.

```
Meditator View
├── Identity: Avatar, Name, Email, Username, Timezone, Device Info
├── Path Plan: Forest (Free) vs Moonlit ($9.99/mo Active / Lapsed)
├── Active Path: "Pa-Auk Foundations" (Status: 0: active | Present Night: 8 of 30)
├── Dawn: Anchored 4:00 AM (Asia/Yangon)
├── Path Statuses: Active (1 max), Completed (N), Stopped (when switched)
├── Journey Ledger: Max Night Reached: 14 | Return Count: 1 | Restored via Moonlit: Yes
├── Lifetime Records: 42.5 Total Hours | 1 Complete Path | 72 Sits Sat
└── Active Session Integrity: Single Device Token (Active: Pixel 8 Pro)
```

### Administrative Actions
- **Journey Audit Log**: Trace exact timestamps of night completions, 4:00 AM returns, and Moonlit restorations.
- **Manual Journey Adjustment**: Capability for support specialists to fix accidental returns (e.g. verified technical failure during sitting) or correct `present_night` with mandatory reason logging.
- **Single Active Device Reset**: Disconnect/logout remote sessions if a user switches phones or reports stolen hardware.

---

## 💬 6. Reflections & Featured Curation

Meditators submit written text reflections upon completing sittings (`sit_reflections`). The admin panel provides a streamlined queue to curate authentic social proof for Path Detail pages.

### Moderation Rules & Controls
1. **Approve / Reject**: Basic safety and spam moderation.
2. **Feature on Path Detail ("Featured Reflections")**: Flag top reflections (`is_featured: true`) to be highlighted on the public path page to inspire prospective meditators.

---

## 💰 7. Dana Financial Impact Engine

The financial heart of MeritMoon: tracking Moonlit subscription revenue, absorbing payment processing fees, and distributing the dedicated Dana percentage directly to monasteries.

### 1. Revenue & Dana Pool Ledger
- **Stripe Webhook Sync**: Realtime sync of all `$9.99/mo` charges and renewals.
- **Fee Absorption Math**:
  - `Gross Subscription Revenue`
  - `Payment Processing Fee (absorbed 100% by MeritMoon)`
  - `Net Dedicated Dana Allocation Pool (e.g. 25% clean dedicated)`
- **Live Pool Balance**: Unallocated Dana funds available for monthly distribution.

### 2. Monastery Dana Support Allocator
- Select monasteries and allocate distribution percentages or fixed support amounts.
- Record transfer proof (bank transfer reference, receipt image).
- Auto-generate monthly public Dana report displayed on client **Me** tab.

### 3. Individual Donor Wall
- Review and verify custom direct donations made by patrons.
- Publish donor name (with opt-in permission) to the **Me** Dana Impact wall.
- Dispatch personalized master gratitude notes.

---

## 📡 8. Live Telemetry & Push Dispatcher

### 1. Realtime Sanctuary Telemetry (ActionCable)
- **Sitting Now Global Gauge**: Live counter of active sitting meditators across all paths.
- **Active Sits Map**: Geolocation density breakdown (privacy-safe city/country level).
- **Concurrent Stream Bandwidth**: Audio CDN delivery traffic.

### 2. Push Dispatcher (OneSignal)
- Broadcast emergency announcements or global practice invitations.
- Inspect delivery logs, bounce rates, and device token states.

---

## 🖥️ 9. Admin UI Layout & Navigation

Built with `rexone-web` React 19 / TypeScript design system components (`src/design/`):

```
┌──────┬─────────────────────────────────────────────────────────────────┐
│ 🌕   │  Admin Portal: MeritMoon Sanctuary                   @sayadaw_u │
├──────┼─────────────────────────────────────────────────────────────────┤
│ 📚   │  Dashboard Summary                                              │
│ Paths│  - Active Meditators: 12,480                                    │
│      │  - Sitting Now: 1,420 under the moon                            │
│ 🧘   │  - Unanswered Doubts: 12 [Review Studio →]                      │
│Studio│  - Dana Pool Balance: $4,850.00                                 │
│      ├─────────────────────────────────────────────────────────────────┤
│ 💬   │  Quick Links                                                    │
│Circle│  [+ New Path]  [Assign Insight]  [Dana Support]  [Audit Ledger] │
│      │                                                                 │
│ 💰   │                                                                 │
│ Dana │                                                                 │
│      │                                                                 │
│ 👤   │                                                                 │
│Users │                                                                 │
│      │                                                                 │
│ ⚙️   │                                                                 │
│Config│                                                                 │
└──────┴─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Implementation Roadmap

1. **Phase 1: Foundation Models & Storage**
   - Run migrations for `paths`, `nights`, `sits`, `sit_records`, `sit_reflections`, `sit_doubts`, `sit_insights`.
   - Setup polymorphic `assets` with Garage S3 storage key engine.
2. **Phase 2: Sayadaw Insight & Doubts Studio**
   - Build admin React 19 review inbox (`/admin/doubts`).
   - Implement reusable insight assignment and multi-doubt bulk linking.
   - ActionCable WebSocket & OneSignal push integration.
3. **Phase 3: The Circle Client Integration**
   - Flutter and Web client Circle stream with runtime `CirclePolicy` gating.
   - Distinct Reflections feed and Doubts & Insights feed with gold pinning.
4. **Phase 4: Dana Ledger & Fixed 4:00 AM Dawn Return Cron**
   - SolidQueue midnight/dawn evaluation job anchored to `user_paths.timezone` at 4:00 AM.
   - Stripe subscription webhooks with fee-absorption math and monastery support tracking.
