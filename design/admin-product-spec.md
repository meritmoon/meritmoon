# 🌕 MeritMoon Admin Control Panel — Product Specification

> **The Operational Sanctuary**: The central management platform powering the MeritMoon mobile & web client experience.
> Built directly on top of the **RexOne Ecosystem** (`rexone-core` Rails API, `rexone-web` React/TypeScript SPA, and `rexone_mobile` Flutter).

---

## 🧭 System Overview & RexOne Foundation

The MeritMoon Admin Panel provides comprehensive operational control over courses, meditation content, teacher lineages, monastery Dana distributions, practitioner merits, and community voice curation.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        🌕 MeritMoon Ecosystem                          │
├──────────────────────────┬─────────────────────────────────────────────┤
│  Client Apps             │  Flutter Mobile (iOS / Android) + Web App   │
├──────────────────────────┼─────────────────────────────────────────────┤
│  Admin Control Panel     │  React + TypeScript SPA (`rexone-web` base) │
├──────────────────────────┼─────────────────────────────────────────────┤
│  API & Operations Core   │  Ruby on Rails API (`rexone-core` base)     │
│                          │  - ActionCable WebSockets (Live Telemetry)  │
│                          │  - ActiveStorage / S3 (Audio, Video, Loops) │
│                          │  - Pagy (High-performance Pagination)       │
│                          │  - IAM (Role-Based Access Control)          │
│                          │  - Stripe Engine (Sub & Dana Pool Math)     │
│                          │  - OneSignal (Mindset & Midnight Pushes)    │
└──────────────────────────┴─────────────────────────────────────────────┘
```

---

## 📋 Table of Contents

- [🌕 MeritMoon Admin Control Panel — Product Specification](#-meritmoon-admin-control-panel--product-specification)
  - [🧭 System Overview \& RexOne Foundation](#-system-overview--rexone-foundation)
  - [📋 Table of Contents](#-table-of-contents)
  - [🔐 1. Admin Architecture \& Roles (IAM)](#-1-admin-architecture--roles-iam)
  - [📚 2. Course \& Curriculum Studio](#-2-course--curriculum-studio)
    - [Key Administrative Features](#key-administrative-features)
  - [🏛️ 3. Teacher \& Monastery Center Directory](#️-3-teacher--monastery-center-directory)
    - [1. Teacher Management](#1-teacher-management)
    - [2. Monastery \& Meditation Center Management](#2-monastery--meditation-center-management)
  - [👤 4. Practitioner \& Merits Management](#-4-practitioner--merits-management)
    - [Administrative Actions](#administrative-actions)
  - [💬 5. User Voices Moderation \& Curation](#-5-user-voices-moderation--curation)
    - [Moderation Rules \& Controls](#moderation-rules--controls)
  - [💰 6. Dana Financial Impact Engine](#-6-dana-financial-impact-engine)
    - [1. Revenue \& Dana Pool Ledger](#1-revenue--dana-pool-ledger)
    - [2. Center Disbursement Allocator](#2-center-disbursement-allocator)
    - [3. Individual Donor Wall](#3-individual-donor-wall)
  - [📡 7. Live Telemetry \& Push Dispatcher](#-7-live-telemetry--push-dispatcher)
    - [1. Realtime Sanctuary Telemetry (ActionCable)](#1-realtime-sanctuary-telemetry-actioncable)
    - [2. Push Notification Dispatcher (OneSignal)](#2-push-notification-dispatcher-onesignal)
  - [🖥️ 8. Admin UI Layout \& Navigation](#️-8-admin-ui-layout--navigation)
  - [🎯 Implementation Roadmap](#-implementation-roadmap)

---

## 🔐 1. Admin Architecture & Roles (IAM)

Leveraging `rexone-core` IAM with granular permissions (`Role`, `Permission`, `UserRole`):

| Role                                  | Permissions & Access Scope                                                                                                        |
| :------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| **Super Admin**                       | Full access: System settings, IAM role assignments, Dana ledger approvals, database logs, and destructive operations.             |
| **Course Curator / Content Director** | Course builder, day/session sequencer, audio/video uploads, masterclass configuration, teacher profiling.                         |
| **Voices Moderator**                  | User text reflection review queue, approval, rejection, and selecting featured comments for Course Detail pages.                  |
| **Dana & Financial Auditor**          | Subscription Dana pool auditing, center payout tracking, direct donor management, revenue ledger access. Read-only on curriculum. |
| **Support Specialist**                | Practitioner lookup, reset history inspection, manual session/merit issue resolution, push notification dispatching.              |

---

## 📚 2. Course & Curriculum Studio

The core engine where ancient teachings are structured into progressive daily practices.

```
Course (e.g. "Pa-Auk Anāpāna Foundations")
├── General Info (Title, Slug, Subtitle, Lineage, Loop Video Asset, Cover)
├── Summary (Short Browsing Hook) & Detailed Syllabus Description
├── Tier Selector (0: Free / Forest, 1: Moonlit)
├── Temperament Selector (Carita: Anger-Calming, Greed-Subduing, Restlessness-Stilling, etc.)
├── Duration (Days)
├── Multi-Teacher Team (Main Teacher, Assistant Teacher, Translator)
├── Masterclass (Video Preview + Guided Session)
└── Days (e.g. Day 1 to Day 30)
    └── Lessons / Practice Sittings (Position 1..5 per Day)
        ├── Title & Instructions (Markdown Posture/Prep Notes)
        ├── Master Audio Asset (CDN audio file, exact duration in seconds)
        ├── Position (Position 1 = Morning, Position 2 = Evening)
        └── Published Toggle
```

### Key Administrative Features

1. **Course Publishing Validator**:
   - Strict integrity rule: A course **cannot** be toggled to `published: true` if any lesson inside is in draft / `published: false` state.
2. **Dual Description Editors**:
   - **Summary Editor**: Concise one-paragraph preview shown in carousels and cards.
   - **Description Editor**: Rich Markdown editor for deep syllabus, doctrinal context, and practice instructions.
3. **Temperament (*Carita*) Selector**:
   - Configures practice suitability: `anger_calming`, `greed_subduing`, `restlessness_stilling`, `confusion_clearing`, `sloth_awakening`, `wisdom_inquiry`, `faith_devotion`.
4. **Multi-Teacher Team Assigner (`teachers_courses`)**:
   - Assigns multiple teachers to a single course with roles:
     - `0: main_teacher` (Principal Sayadaw / Root Teacher)
     - `1: assistant_teacher` (Supporting instructor)
     - `2: translator` (Dhamma interpreter)
5. **Day & Session Sequencer (`day` + `position`)**:
   - Structure multi-session days seamlessly (e.g. Day 1 has Position 1 + Position 2; Day 2 has Position 1).
   - Single pure audio stream per lesson (no dual ambient mixing on client).
6. **Enrollment & Completion Metrics**:
   - Displays real-time denormalized counters: `enrolled_users_count`, `completed_users_count`, and completion rate.

### 🛡️ Unified Monetization & Pricing Philosophy (No Marketplace SKUs)

- **No Fragmented Course Prices**: Admins and teachers cannot attach individual price tags or create separate paywalls per course.
- **The Moonlit Promise**: Moonlit subscribers (`$9.99/mo`) hold 100% unrestricted access to every course and teacher on the platform with zero extra paywalls.
- **Teacher Compensation via Dana Pool**: Teachers and monasteries are supported via the communal Dana Impact Fund rather than commercial per-course sales or volatile teacher pricing decisions.

---

## 🏛️ 3. Lineages, Monasteries & Teachers Directory

Maintains the authentic lineages, teachers, and physical monastic centers receiving Dana.

### 1. Lineage Management (`lineages`)
- **Traditions**: Pa-Auk, The-Inn-Gu, Yay-Soon, Myay-Zin, Mahasi, Mogok.
- **Fields**: Name, historical overview description, region of origin, display order.

### 2. Monastery & Center Management (`monasteries`)
- **Center Details**: Name, Lineage (optional link), country, location/city, description, cover artwork.
- **Disbursement Profile**: Secure banking / transfer details, contact abbot/treasurer, payout currency.
- **Impact Gallery**: Photos of monastery grounds, living quarters, food offering ceremonies funded by Dana.

### 3. Teacher Management (`teachers`)
- **Profile Fields**: Name, Monastic Title (e.g., *Sayadaw, Venerable, Senior Meditation Teacher*), Affiliated Monastery, Photo, Biography, Assigned Courses.
- **User Account Linking**:
  - Teacher profile can be created initially by an admin with `user_id: nil`.
  - Once the teacher registers their user account, the admin links their `user_id` and grants the `teacher_admin` RBAC role.
- **Teacher Audio/Video Voices**: Short blessing clips or audio reflections featured on the Dana Impact screen.

---

## 👤 4. Practitioner & Merits Management

Provides customer support and transparent visibility into practitioner journeys without violating personal meditation sanctity.

```
Practitioner Profile View
├── Identity: Avatar, Name, Email, Username, Timezone, Device Info
├── Subscription: Forest (Free) vs Moonlit ($9.99/mo Active / Lapsed)
├── Active Enrollment: "The Breath" (Day 8 of 30) — 8 Earned Day Merits
├── Merits Ledger: Max Merits: Day 14 | Reset Count: 1 | Restored via Moonlit: Yes
├── Lifetime Achievements: 42.5 Total Hours | 1 Completed Course (OWNED ✓)
└── Active Session Integrity: Single Device Token (Active: Pixel 8 Pro)
```

### Administrative Actions

- **Merits Audit Log**: Trace exact timestamps of day completions, midnight resets, and Moonlit restorations.
- **Manual Merit Adjustment**: Capability for support specialists to fix accidental resets (e.g. verified technical failure during session) with mandatory reason logging.
- **Single Active Device Reset**: Disconnect/logout remote sessions if a user switches phones or reports stolen hardware.

---

## 💬 5. User Voices Moderation & Curation

Practitioners submit written text reflections ("Voices") upon completing a course day. The admin panel provides a streamlined queue to curate authentic social proof.

```
┌────────────────────────────────────────────────────────────────────────┐
│ 💬 User Voices Curation Queue (14 Pending)                             │
├──────────────┬──────────────────┬──────────────┬─────────────┬─────────┤
│ Practitioner │ Course & Day     │ Reflection   │ Status      │ Action  │
├──────────────┼──────────────────┼──────────────┼─────────────┼─────────┤
│ @mindful_joy │ The Breath (D3)  │ "The silence │ [Pending]   │ [Approve│
│              │                  │ between the  │             │  Reject │
│              │                  │ breaths..."  │             │  Feature│
└──────────────┴──────────────────┴──────────────┴─────────────┴─────────┘
```

### Moderation Rules & Controls

1. **Approve / Reject**: Basic safety and spam moderation.
2. **Feature on Course Detail ("Featured Voices")**: Flag top reflections to be highlighted on the public course page to inspire prospective practitioners.
3. **Day Tagging**: Associate reflection directly with Day 1, Day 7, or Course Completion.
4. **Anonymity Controls**: Toggle display format (Full username, `@first_initial***`, or Anonymous).

---

## 💰 6. Dana Financial Impact Engine

The financial heart of MeritMoon: tracking Moonlit subscription revenue, absorbing payment processing fees, and distributing the dedicated Dana percentage directly to monastic centers.

### 1. Revenue & Dana Pool Ledger

- **Stripe Webhook Sync**: Realtime sync of all `$9.99/mo` charges and renewals.
- **Fee Absorption Math**:
  - `Gross Subscription Revenue`
  - `Payment Processing Fee (absorbed 100% by MeritMoon)`
  - `Net Dedicated Dana Allocation Pool (e.g. 25% clean dedicated)`
- **Live Pool Balance**: Unallocated Dana funds available for monthly distribution.

### 2. Center Disbursement Allocator

- Select centers and allocate distribution percentages or fixed amounts.
- Record payout proof (bank transfer reference, receipt image).
- Auto-generate monthly public Dana report displayed on client Profile tab.

### 3. Individual Donor Wall

- Review and verify custom direct donations made by patrons.
- Publish donor name (with opt-in permission) to the Profile Dana Impact wall.
- Dispatch personalized teacher gratitude notes.

---

## 📡 7. Live Telemetry & Push Dispatcher

### 1. Realtime Sanctuary Telemetry (ActionCable)

- **Sitting Now Global Gauge**: Live counter of active sitting practitioners across all courses.
- **Active Sits Map**: Geolocation density breakdown (privacy-safe city/country level).
- **Concurrent Stream Bandwidth**: Audio CDN delivery traffic.

### 2. Push Notification Dispatcher (OneSignal)

- **Automated Cron Jobs**:
  - _Midnight Unlock Trigger_: Scheduled at 00:00 per practitioner enrollment timezone.
  - _Daily Mindset Prompt_: Sent at 07:30 practitioner local time with the morning wisdom reflection.
- **Broadcast Studio**: Send urgent service notices, monthly Dana impact updates, or new course announcements to all practitioners or specific segments (e.g., Moonlit only, Forest only).

---

## 🖥️ 8. Admin UI Layout & Navigation

Built with the **Sanctuary Night Theme** (`#020A05` deep green-black canvas, Cormorant Garamond headings, emerald/gold accents, and glass cards).

```
┌────────────────────────────────────────────────────────────────────────┐
│ 🌕 MeritMoon Ops   [Search ⌘K]                 [Live: 420 Sitting] [👤]│
├──────────────┬─────────────────────────────────────────────────────────┤
│ 📊 Dashboard │  ✦ Sanctuary Overview                                   │
│ 📚 Courses   │  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐  │
│ 🧘 Sessions  │  │ Active Users │ │ Dana Pool    │ │ Sitting Right Now│  │
│ 🏛️ Centers   │  │ 12,480       │ │ $8,450.00    │ │ 420 🧘           │  │
│ 👥 Teachers  │  └──────────────┘ └──────────────┘ └──────────────────┘  │
│ 🪷 Merits    │                                                         │
│ 💬 Voices    │  ✦ Course Engagement & Merits Health                     │
│ 💰 Dana Flow │  [Day Merits Retention Curve: The Breath]               │
│ 🔔 Pushes    │  Day 1 (100%) ──→ Day 7 (74%) ──→ Day 30 (58% Owned)   │
│ ⚙️ Settings  │                                                         │
└──────────────┴─────────────────────────────────────────────────────────┘
```

---

## 🎯 Implementation Roadmap

1. **Phase 1: Course & Curriculum Studio**
   - Course, Day, Session CRUD with audio/loop-video uploads via ActiveStorage.
   - Pre-text markdown editor and guidance style toggles.
2. **Phase 2: Teacher & Monastery Center Directory**
   - Teacher profiles and monastic center management.
3. **Phase 3: User Voices Curation Queue**
   - Inflow moderation, course-level featuring, and client API exposure.
4. **Phase 4: Dana Pool & Financial Engine**
   - Stripe subscription reconciliation, fee absorption ledger, and disbursement tracking.
5. **Phase 5: Realtime Telemetry & Push Notification Center**
   - ActionCable live sitting counter and OneSignal scheduled dispatchers.
