# 🌕 MeritMoon — Product Specification

> _"People think AI is the future. And other technologies... I'd say it's wrong. Peace is the future. The world needs peace starting from one's inner mind. This cannot be faked. They are contributing for a future prosperous with peace if they go Moonlit."_

---

## Terminology

> For the comprehensive master lexicon, forbidden terminology, Burmese translations, and copywriting guidelines, see [`vocabulary.md`](./vocabulary.md). For visual mascot blueprints, expressions, and animation models, see [`mascot-guidelines.md`](./mascot-guidelines.md).

| Term            | Meaning                                                                                                                                                                                                                                       |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Merits**      | The fundamental measure of course progress and spiritual cultivation (Day Merits, Course Merits). Replaces arbitrary points or streak numbers.                                                                                                |
| **Reset**       | Automatic. Triggered when a Forest Path user fails to complete a day's sessions before midnight cutoff. Course active merits return to Day 1. The server remembers max merits reached so taking the Moonlit Path restores them.               |
| **Restart**     | Intentional. User chooses to start a course over from scratch to earn again merits. All active merits reset to Day 1. Lifetime accomplishment records are preserved, but active ownership of an OWNED ✓ course is removed until re-completed. |
| **Owned ✓**     | A course completed through its final day. Unlocked in the practitioner's permanent sanctuary. Can be retaken or freely re-listened.                                                                                                           |
| **User Voices** | Text comments written by practitioners for each day of practice. "Voice" is the poetic name for the practitioner's authentic written reflection.                                                                                              |
| **Dana**        | Generosity offering. The portion of Moonlit subscription revenue flowing directly to meditation teachers and centers. _Dana is powered as a merit_, which is why Moonlit practitioners never lose their course merits.                        |

---

## Table of Contents

- [🌕 MeritMoon — Product Specification](#-meritmoon--product-specification)
  - [Terminology](#terminology)
  - [Table of Contents](#table-of-contents)
  - [🌙 1. Vision](#-1-vision)
  - [🛤️ 2. Two Paths](#️-2-two-paths)
    - [The Forest Path (Free)](#the-forest-path-free)
    - [The Moonlit Path ($9.99/month)](#the-moonlit-path-999month)
    - [Moonlit Recovery — Restoring Merits After a Reset](#moonlit-recovery--restoring-merits-after-a-reset)
  - [🪷 3. The Merits System \& Progress](#-3-the-merits-system--progress)
  - [📚 4. Course System \& Masterclasses](#-4-course-system--masterclasses)
    - [Course Structure](#course-structure)
    - [Content Types](#content-types)
    - [Masterclasses](#masterclasses)
    - [User Voice Comments](#user-voice-comments)
    - [Course Display (Tab 2: Courses)](#course-display-tab-2-courses)
  - [🧘 5. Session Mechanics \& Live Transcript](#-5-session-mechanics--live-transcript)
    - [Starting a Session](#starting-a-session)
    - [During a Session](#during-a-session)
    - [Daily Cycle \& Midnight Cutoff](#daily-cycle--midnight-cutoff)
  - [🔄 6. Reset, Restart \& Course Ownership](#-6-reset-restart--course-ownership)
    - [Reset vs. Restart](#reset-vs-restart)
    - [Restarting an OWNED ✓ Course](#restarting-an-owned--course)
  - [🔀 7. Single Enrollment \& Switching](#-7-single-enrollment--switching)
    - [Format Options](#format-options)
  - [🙏 8. Dana Impact System](#-8-dana-impact-system)
    - [The Power of Dana](#the-power-of-dana)
    - [Dana Transparency (Tab 5: Profile)](#dana-transparency-tab-5-profile)
    - [Direct Donations](#direct-donations)
    - [For Forest Path Users](#for-forest-path-users)
    - [When App Is New (No Dana Yet)](#when-app-is-new-no-dana-yet)
  - [📱 9. App Navigation \& Tabs](#-9-app-navigation--tabs)
    - [Bottom Navigation (5 Tabs)](#bottom-navigation-5-tabs)
    - [Tab 1: Sanctuary (Home)](#tab-1-sanctuary-home)
    - [Tab 2: Courses](#tab-2-courses)
    - [Tab 3: Sit (Center Tab)](#tab-3-sit-center-tab)
    - [Tab 4: Journey](#tab-4-journey)
    - [Tab 5: Profile](#tab-5-profile)
  - [🔔 10. Notifications \& Alerts](#-10-notifications--alerts)
    - [Push Notifications](#push-notifications)
    - [In-App Confirmation Dialogs](#in-app-confirmation-dialogs)
  - [🔍 11. Transparency Requirements](#-11-transparency-requirements)
  - [✅ 12. Edge Cases — Resolved](#-12-edge-cases--resolved)
  - [📋 13. Future Roadmap & Considerations](#-13-future-roadmap--considerations)

---

## 🌙 1. Vision

MeritMoon is a **discipline-first mental cultivation platform** rooted in ancient, time-honored meditation traditions. The practices here are thousands of years old. They endure not because they are trendy, but because they meet the mind with depth, honesty, and care.

Every design decision exists to serve one purpose: **genuine inner transformation through unbroken daily practice.**

There are no superficial streak counters. No gamified badges for opening the app. The only thing at stake is **real course merits** — and that is serious enough on its own. If people love the practice, they come back. We do not manipulate practitioners with streak anxiety. Cultivating and protecting real merits is the true spiritual journey.

---

## 🛤️ 2. Two Paths

### The Forest Path (Free)

| Aspect                    | Rule                                                                      |
| :------------------------ | :------------------------------------------------------------------------ |
| **Price**                 | Free, always                                                              |
| **Course access**         | All courses, earned step by step through daily practice                   |
| **Daily completion miss** | Active course merits reset to Day 1. Server remembers max merits reached. |
| **Course ownership**      | Complete final day → OWNED ✓                                              |
| **Merits protection**     | ❌ None — miss the day's cutoff and active merits reset                   |
| **Switching courses**     | Current course resets to Day 1 (unless OWNED ✓)                           |

### The Moonlit Path ($9.99/month)

| Aspect                       | Rule                                                                                                                  |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| **Price**                    | $9.99/month                                                                                                           |
| **Course access**            | All courses, instant full access                                                                                      |
| **Daily completion miss**    | Course merits **preserved** — continue from where you left off                                                        |
| **Why merits are preserved** | **Dana is powered as a merit.** Supporting teachers and centers shields your merits from resetting.                   |
| **Course ownership**         | Complete final day → OWNED ✓                                                                                          |
| **Switching courses**        | Current course **stays saved** at current day/merits (until subscription ends)                                        |
| **Dana Contribution**        | Percentage of subscription revenue goes directly to teachers & meditation centers (MeritMoon covers transaction fees) |

### 🛡️ The "Moonlit Promise" & No-Marketplace Policy

> **The Sacred Promise of Moonlit**: Once a practitioner steps onto the **Moonlit Path**, they enter a true sanctuary. They will **never** encounter an unexpected paywall, locked teacher masterclass, or upsell banner inside the app.

1. **No Fragmented Paywalls / Marketplace Chaos**:
   - There are **no individual course price tags**, no standalone course sales, and no volatile teacher-set price changes.
   - Having a paid subscription and hitting a *"Pay $29 to unlock this teacher"* banner destroys trust and breaks the serene meditation atmosphere. In MeritMoon, Moonlit means **100% all-inclusive, unrestricted access** to every course, teacher, soundscape, and wisdom transmission.
2. **No Decision Fatigue for the Meditator**:
   - Practitioners come to quiet their minds, not to compare pricing options, calculate course discounts, or manage shopping carts.
3. **Pure Dana-Driven Teacher Support**:
   - Teachers and meditation centers are supported through the pooled **Dana Impact Fund** funded by Moonlit memberships and direct offerings, removing commercial pricing pressures from venerable teachers.

> [!IMPORTANT]
> There is **no streak counter** anywhere in MeritMoon. Motivation comes from genuine practice, inner peace, and the meaningful consequence of earning and preserving merits.

### Moonlit Recovery — Restoring Merits After a Reset

If a Forest Path practitioner experiences a **reset** (missed the daily midnight cutoff), the server permanently remembers their highest reached day:

```
Forest: Day 1 → Day 2 → ... → Day 10 → ⏰ Missed Day → Reset to Day 1
                                                             ↓
                                                  Practitioner joins Moonlit
                                                             ↓
                                                  Days 1–10 merits restored
                                                  Continue from Day 10
```

If a Forest practitioner reset to Day 1, practiced up to Day 3, and then joined Moonlit:

```
Forest: Day 10 → ⏰ Reset to Day 1 → Day 2 → Day 3 → Joins Moonlit
                                                             ↓
                                                  Days 1–10 merits restored
                                                  (server remembers max = Day 10)
                                                  Continue from Day 10
```

> [!NOTE]
> The server always preserves the user's highest reached merits for each course. A **reset** sets active practice back to Day 1, but the historical record remains intact. Purchasing Moonlit immediately restores access to all previously earned merits.

---

## 🪷 3. The Merits System & Progress

Progress across MeritMoon is measured in **Merits**:

1. **Daily Merits**: Earned by completing all assigned meditation sessions for a course day before midnight.
2. **Dana as Merit**: Moonlit practitioners power their practice with Dana (generosity), which is recognized as an active spiritual merit that prevents course progress from resetting.
3. **Earn Again Merits**: When a practitioner chooses to **Restart** a course, they are prompted to _earn again merits_, embarking on a completely fresh, intentional journey.
4. **Permanent Accomplishment Records**: Even if active merits are reset or restarted, the practitioner's lifetime profile preserves the historical record of what they have accomplished (total meditation hours, completed courses, and milestone achievements).

---

## 📚 4. Course System & Curricula Architecture

### Lineages & Monasteries
Courses are rooted in authentic meditation traditions (*Lineages*) and often hosted by revered meditation centers (*Monasteries*):
- **Pa-Auk Lineage**: *Samatha leading to Vipassana, nimitta, deep absorptions, 4 elements.*
- **The-Inn-Gu Lineage**: *Vedana Vipassana, observation of intense sensations.*
- **Yay-Soon Lineage**: *Direct mindful awareness and insight.*
- **Myay-Zin Lineage**: *Mindful grounding and breath.*
- **Mahasi Lineage**: *Noting rising & falling.*
- **Mogok Lineage**: *Dependent origination and mental formations.*

### Character Dispositions & Temperament (*Carita*)
Meditation is tailored medicine for the mind. MeritMoon rejects artificial "easy/hard" difficulty rankings, categorizing courses by **Mental Temperament (*Carita*)**:
1. **Anger-Calming** (*Dosa-carita*): For minds prone to irritation and aversion → Loving-kindness (*Mettā*), patience.
2. **Greed-Subduing** (*Rāga-carita*): For minds prone to attachment and craving → Body contemplation (*Asubha*), mindfulness of physical nature.
3. **Restlessness-Stilling** (*Vitakka-carita*): For overactive, scattered thoughts → Breath concentration (*Anāpāna*), single-pointed anchor.
4. **Confusion-Clearing** (*Moha-carita*): For bewilderment and mental cloudiness → Clear comprehension, mindful grounding.
5. **Sloth-Awakening** (*Thīna-middha*): For drowsiness and sluggish energy → Perception of light, walking meditation, energy awakening.
6. **Wisdom-Inquiry** (*Buddhi-carita*): For analytical and investigative minds → 4 Elements (*Dhātu*), Vipassana insight.
7. **Faith-Devotion** (*Saddhā-carita*): For peace and emotional balance → Recollections of the Triple Gem (*Buddhanussati*).

### Multi-Teacher Collaboration & Roles
A course can feature multiple teachers collaborating under specific traditional roles:
- **Principal Teacher / Sayadaw**: The lead meditation master delivering root instruction.
- **Assistant Teacher**: Supporting guide providing practical daily drills and guidance.
- **Dhamma Translator**: Multilingual Dhamma interpreter translating discourse.
*Teacher profiles are stored independently and pointed to `users` accounts via RBAC (`teacher_admin` role).*

### Course Structure & Sequencing
- **Overview & Syllabus**: Every course includes both a concise **Summary** (browsing hook) and an in-depth **Description** (detailed practice syllabus).
- **Days & Multi-Session Structure**: A course spans $N$ **Days** (e.g. 30 days), containing 1 to 5 sequenced sessions per day (`day: 1, position: 1` = Morning Breath; `day: 1, position: 2` = Evening Metta).
- **Single Master Audio Stream**: Each practice session plays **1 pure master audio track** (clean voice mastered with subtle natural acoustics in production) to prevent dual-stream frequency clashing (Hz masking).
- **Publishing Rule**: A course can **only** be marked published if all child lessons inside are published.
- **Enrollment & Analytics**: Tracked in `users_courses` with `completed_lessons` stored as a JSONB array, and denormalized `enrolled_users_count` and `completed_users_count` metrics.

```
Course (e.g., "Pa-Auk Anāpāna Foundations")
├── Lineage: Pa-Auk | Monastery: Pa-Auk Tawya
├── Temperament: Restlessness-Stilling (Vitakka-carita)
├── Teachers: Sayadaw (Lead) + Assistant Teacher
├── Masterclass (Video Preview + Guided Sitting)
├── Summary & Detailed Syllabus Description
├── Featured User Voices (Curated reflections)
│
├── Day 1 (Earn Day 1 Merits)
│   ├── Pre-text (preparation: terminology, environment, posture)
│   ├── Session 1 (Position 1: Finding Your Anchor, 10 min)
│   └── Session 2 (Position 2: Evening Metta, 15 min)
│
├── Day 2 (Day 2 Merits)
│   └── Session 1 (Position 1: Staying with the Touch-Point, 15 min)
│
├── ...
├── 🏔️ Milestone (e.g., Samatha complete → Vipassana begins)
└── Day N (Final Day)
    └── 🎉 COURSE COMPLETE → OWNED ✓
```

### Content Types

| Type                      | Description                                                                                                                                  |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pre-text**              | Displayed before a session begins. Explains terminology, mental preparation, posture, and room setup so no session time is wasted adjusting. |
| **Sitting meditation**    | Eyes closed, audio-guided sitting. The core foundation.                                                                                      |
| **Walking meditation**    | Mindful standing/walking. Pre-text instructs space preparation.                                                                              |
| **Lying down meditation** | Body scan and deep relaxation. Pre-text guides posture.                                                                                      |
| **Silent sitting**        | Audio guidance at the beginning and end with unguided silence in between.                                                                    |
| **Partial guidance**      | Audio for opening minutes, sustained silence, and concluding chime.                                                                          |

### Masterclasses

Every course features an introductory **Masterclass** (freely accessible without enrollment):

- **Video preview**: Teacher explaining the lineage, philosophy, and practical transformation.
- **Guided preview session**: A direct experiential taste of the technique.
- Designed to open the practitioner's eyes and cultivate genuine aspiration to enroll.

### User Voice Comments

- **User Voices are written text comments** ("Voice" represents the practitioner's authentic reflection).
- Practitioners can leave a text comment for each specific day upon completing its sessions.
- **Featured User Voices**: Curated reflections highlighted on the Course Detail page to inspire new enrollments.

### Course Display (Tab 2: Courses)

- Course cards feature **subtle loop video backgrounds** (gentle movement, fireflies drifting).
- Inside Course Detail: Masterclass → About → Featured User Voices → Day list.
- **Future locked days do NOT display titles** — preserving the sacred element of discovery.
- Teachers are featured synchronously alongside courses.

---

## 🧘 5. Session Mechanics & Live Transcript

### Starting a Session

Tab 3 (**Sit**) is the elevated center tab. It directs the practitioner straight into their current required session.

| State                             | What Tab 3 Displays                                                     |
| :-------------------------------- | :---------------------------------------------------------------------- |
| **No course enrolled**            | "Your journey begins with a course" → Browse Courses CTA                |
| **Session available**             | Pre-text → preparation guidance → "Begin Session" CTA                   |
| **All today's sessions complete** | Congratulations → recommendation to carry mindful awareness until sleep |
| **Waiting for next day**          | Countdown to midnight unlock                                            |

> [!NOTE]
> There are no unguided/custom timer sessions in Tab 3 currently. Every session is rooted in an enrolled course.

### During a Session

| Element                           | Rule & Behavior                                                                                                                                                                  |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Audio Guidance**                | Master audio plays with crystal-clear guidance, partial silence, or bookended instructions.                                                                                      |
| **Live Transcript**               | **One sentence long**. Does **not** show yet-to-speak words. Words appear in real-time as spoken, and the entire sentence replaces only when transitioning to the next sentence. |
| **Visual Immersion**              | Full-screen meditative view: breathing moon mascot, timer, and subtle glowing ring.                                                                                              |
| **Screen Sleep**                  | Phone sleep is supported. When timer reaches zero, a **peaceful bell alarm** chimes.                                                                                             |
| **Rewind Mechanics**              | Can rewind **10 seconds** per tap. Cannot fast-forward beyond maximum reached point.                                                                                             |
| **Rewind Balance**                | 3 rewinds grant up to 3 fast-forwards (only up to highest listened point).                                                                                                       |
| **Leaving Tab 3**                 | ❌ **Session progress lost.** Must re-sit from the beginning of that session.                                                                                                    |
| **Closing App / Backgrounding**   | ❌ Session progress lost.                                                                                                                                                        |
| **Phone Call — Declined/Snoozed** | ✅ Session continues uninterrupted.                                                                                                                                              |
| **Phone Call — Accepted**         | ❌ Session progress lost.                                                                                                                                                        |

> [!CAUTION]
> **Session integrity is strict.** Leaving Tab 3 or taking a phone call cancels active session progress. Practitioners are clearly notified of this rule before pressing "Begin Session".

### Daily Cycle & Midnight Cutoff

- When all sessions for a day are finished → Day Merits are secured 🎉.
- Practitioners are encouraged to maintain mindfulness until sleep.
- **Next day unlocks at exactly midnight** in the practitioner's enrollment timezone.
- If a Forest user does not complete all sessions before the next midnight cutoff, active course merits reset to Day 1 (restorable via Moonlit).
- If a session is in active progress at midnight, **the active session is never interrupted**; completing it secures the day.

---

## 🔄 6. Reset, Restart & Course Ownership

### Reset vs. Restart

| Scenario    | Nature                                    | Effect on Forest Path                                                                                | Effect on Moonlit Path                                                |
| :---------- | :---------------------------------------- | :--------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| **Reset**   | Automatic (missed daily midnight cutoff)  | Active merits return to Day 1. Server stores max progress. Joining Moonlit restores all earned days. | **No reset.** Dana is powered as a merit, preserving all course days. |
| **Restart** | Intentional (user chooses to start fresh) | Active merits reset to Day 1. Prompts user to _earn again merits_.                                   | Active merits reset to Day 1. Prompts user to _earn again merits_.    |

### Restarting an OWNED ✓ Course

- When a practitioner has completed all days of a course, it is marked **OWNED ✓** (accessible forever).
- If the practitioner intentionally chooses to **Restart** an owned course:
  - **Active ownership status is removed** for that active run.
  - The practitioner must complete all days again to re-own it.
  - **Rationale**: The practitioner desires the genuine discipline and sacred gravity of a fresh, unbroken journey.
  - **Accomplishment records**: Lifetime records still reflect that they completed the course historically.

---

## 🔀 7. Single Enrollment & Switching

Practitioners can only be actively enrolled in **one course at a time** to maintain undivided focus:

| Path        | Switching Situation                               | Result                                                                                                  |
| :---------- | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------ |
| **Forest**  | Enrolled in Course A (Day 7) → Switch to Course B | Course A active merits reset to Day 1 (server saves Day 7 for Moonlit recovery). Course B starts Day 1. |
| **Forest**  | Course A is OWNED ✓ → Enroll in Course B          | Course A remains permanently owned. Course B begins Day 1.                                              |
| **Moonlit** | Enrolled in Course A (Day 7) → Switch to Course B | Course A stays saved at Day 7. Course B starts Day 1.                                                   |
| **Moonlit** | Subscription ends while Course A is paused        | Reverts to Forest rules upon lapse.                                                                     |

### Format Options

| Format                    | Description                                               |
| :------------------------ | :-------------------------------------------------------- |
| **Video**                 | Teacher explaining the philosophy, what to expect         |
| **Single guided session** | A taste of the meditation technique — shorter, accessible |
| **Both**                  | Video introduction + guided preview session               |

Masterclasses are **freely accessible** (no enrollment required) and prominently featured on the Courses tab and inside course detail pages.

---

## 🙏 8. Dana Impact System

### The Power of Dana

- A direct percentage of Moonlit subscription revenue flows to authentic meditation centers and monasteries.
- **MeritMoon absorbs all payment processing and transaction fees** — ensuring the full dedicated percentage reaches the teachers.
- _Dana is powered as a merit_, bridging personal practice with communal generosity.

### Dana Transparency (Tab 5: Profile)

- **Monthly & Cumulative Breakdown**: Total funds distributed and monasteries supported.
- **Monastery & Center Profiles**: Names, locations, lineages, and teacher backgrounds.
- **Teacher Voices**: Short audio/video messages and quotes from lineage masters.
- **Individual Donors**: Dedicated recognition for practitioners who contribute direct offerings beyond their subscription (opt-in).
- **Inspirational Vision**: For Forest users, displays community impact and the spiritual grace of supporting ancient meditation lineages.

### Direct Donations

- Users can reach out to MeritMoon to donate to a **specific center** beyond their subscription
- After successful direct donation, user is **featured as an individual donor** on the Dana Impact page (with consent)
- Creates a visible cycle of generosity that inspires others

### For Forest Path Users

- Dana Impact section is visible on Profile
- Shows **other people's collective impact** — centers supported, teacher voices
- Inspirational messaging: _"How gracious it is to dana the teachers and the methods that transform people."_

### When App Is New (No Dana Yet)

- Show the **vision** of what Dana will accomplish
- _"When you take the Moonlit Path, your contribution flows directly to the teachers who preserve these ancient practices. You're not just meditating — you're funding peace itself."_

---

## 📱 9. App Navigation & Tabs

```
┌──────────────────────────────────────────────┐
38px Moon Mascot 🌕  MeritMoon           [⚙️] Settings
└──────────────────────────────────────────────┘
```

### Bottom Navigation (5 Tabs)

```
┌───────┬───────┬───────┬───────┬───────┐
│   🌿  │   📚  │  🌕   │   🏔️  │   👤  │
│ Sanct │ Cours │  Sit  │ Journ │ Profi │
└───────┴───────┴───────┴───────┴───────┘
```

---

### Tab 1: Sanctuary (Home)

| Zone                     | Content                                                                                                                                             |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Course Progress Hero** | Current course progress bar (Day 7 of 30) + today's session status. If no course: enrollment prompt. If OWNED ✓ courses exist, show last completed. |
| **Daily Insight**        | Wisdom card relevant to the **currently enrolled course**. General wisdom if no course enrolled. Refreshed daily.                                   |
| **Forest Stats**         | Community stats: minds growing, sitting now, teachers supported                                                                                     |

### Tab 2: Courses

| Zone                 | Content                                                          |
| :------------------- | :--------------------------------------------------------------- |
| **Featured Courses** | Loop video cards (GIF-like) with fireflies twinkling around them |
| **Teachers**         | Featured synchronously alongside courses                         |
| **Masterclasses**    | Highlighted as entry points, freely accessible                   |

**Course Detail (push navigation):**

1. Masterclass (video / guided preview)
2. About section
3. Featured User Voices (curated comments from practitioners)
4. Day list (completed ✓, current ▶, future 🔒 — locked days show NO titles)
5. Enrollment CTA

### Tab 3: Sit (Center Tab)

| State                            | Screen                                                                                                       |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| **No course enrolled**           | "Your journey begins with a course" → Browse Courses CTA                                                     |
| **Session available**            | Pre-text → preparation instructions → "Begin Session" CTA                                                    |
| **Active session**               | Full-screen immersive: moon + timer + breathing ring + live transcript + rewind. **No navigation possible.** |
| **Session complete, more today** | Congrats → "Session 2 of 3 ready" → sit now or return later                                                  |
| **All sessions done**            | Day complete 🎉 → practice recommendation → next day at midnight                                             |
| **Waiting for next day**         | Countdown to midnight + encouragement to practice                                                            |
| **Grace period active**          | Grace countdown visible, sessions accessible                                                                 |

### Tab 4: Journey

| Zone                       | Content                                                                                |
| :------------------------- | :------------------------------------------------------------------------------------- |
| **Course Progress**        | Detailed view of current course — day progress, sessions completed, milestones reached |
| **Practice Calendar**      | Monthly grid: emerald ● = completed day, gold ● = today, empty ○ = missed              |
| **Session History**        | Timeline of all completed sessions: date, duration, course, session number             |
| **Achievements & Records** | Personal bests, milestones earned, practice statistics                                 |
| **Owned Courses**          | Library of OWNED ✓ courses — retakeable, re-listenable                                 |

### Tab 5: Profile

| Zone            | Content                                                                      |
| :-------------- | :--------------------------------------------------------------------------- |
| **User Info**   | Avatar, username, member since, total meditation hours                       |
| **Path Status** | Forest / Moonlit badge, manage subscription                                  |
| **Dana Impact** | Full breakdown — monthly/overall, centers, teacher voices, individual donors |

---

## 🔔 10. Notifications & Alerts

### Push Notifications

- **Daily Mindset & Session Reminders**: Thoughtful morning prompts reflecting the day's teaching.
- **Midnight Unlock Alerts**: Notification when the next day's course merits become available.
- **Course Milestones & Completion**: Celebration alerts upon finishing key phases or completing a course.
- **Monthly Dana Reports**: Summary of collective contributions delivered to meditation centers.

### In-App Confirmation Dialogs

- **Before Session Start**: _"Once you begin, leaving this screen will reset your session progress. You must complete the session without leaving."_
- **Leaving Tab 3 Warning**: _"Your active session progress will be lost. Are you sure you want to leave?"_
- **Switching Courses (Forest)**: _"Switching courses will reset your active merits in [Course]. Joining Moonlit can restore your progress up to Day [N]. Continue?"_
- **Switching courses (Moonlit)**: _"Your progress in [Course] will be saved at Day [N]. You can return to it anytime while subscribed."_
- **Restarting a Course**: _"This will reset your active merits and start [Course] completely fresh to earn again merits. Lifetime achievement history will be preserved. Are you sure?"_

---

## 🔍 11. Transparency Requirements

Every rule in MeritMoon is explicit, transparent, and communicated in advance:

1. **No Unexpected Merits Loss**: Reset triggers and midnight deadlines are clearly displayed.
2. **Dana Accounting**: Absolute clarity on fee absorption and center disbursements.
3. **Session Volatility**: Explicit pre-session warning before every timer start.

---

## ✅ 12. Edge Cases — Resolved

| Edge Case                                 | Resolution                                                                                       |
| :---------------------------------------- | :----------------------------------------------------------------------------------------------- |
| **Timezone Changes**                      | Locked to the practitioner's enrollment timezone. Midnight cutoff is fixed to that timezone.     |
| **Connectivity**                          | **Online-only** to guarantee server-side merit verification.                                      |
| **Multi-Device Login**                    | One active device session at a time; logging in on a second device safely invalidates the first. |
| **Phone Call Handling**                   | Declined / snoozed → session continues. Accepted → session cancelled.                            |
| **New Content Added to Completed Course** | OWNED ✓ status is permanent. Owners receive an email inviting them to explore the new days.      |
| **Restarting Owned Course**               | Ownership is removed for the active run until re-completed, allowing a genuine fresh experience. |

---

## 📋 13. Future Roadmap & Considerations

| Feature                      | Notes                                                                       |
| :--------------------------- | :-------------------------------------------------------------------------- |
| **Offline session access**   | Consider for Moonlit users. Needs offline completion verification strategy. |
| **Live gatherings**          | Monthly sessions with course teachers. Planned for post-launch.             |
| **Gratitude dedication**     | Monthly featured donor names. Planned for post-launch.                      |
| **Deaf accessibility**       | Full written transcripts as alternative to audio guidance.                  |
| **Session verification**     | Beyond "don't leave Tab 3" — consider gentle periodic presence checks.      |
| **Refund handling**          | Policy for what happens to Moonlit-saved progress after refund.             |
| **Custom free-sit sessions** | Currently Tab 3 requires enrolled course. Consider freeform timer later.    |
