# 🌕 MeritMoon — Official Vocabulary & Lexicon Specification

> _"People think AI is the future. And other technologies... I'd say it's wrong. Peace is the future. The world needs peace starting from one's inner mind. This cannot be faked. Every word in MeritMoon reflects depth, stillness, and spiritual dignity."_

---

## 📜 1. Lexicon Philosophy & Non-Negotiable Rules

Traditional tech platforms use manipulative gamification and commercial jargon: *"Streaks"*, *"XP"*, *"Badges"*, *"Users"*, *"Courses"*, *"Profiles"*, *"Anonymous"*, *"Reviews"*, *"Transcripts"*, *"Resets"*. 

**MeritMoon permanently bans superficial gamification and transactional tech vocabulary.** 
Every word in MeritMoon is rooted in thousands of years of authentic meditation tradition and our sacred nocturnal sanctuary theme: *the full moon, lone dancing tree in an open grass field, gentle night breeze, quiet fireflies, twinkling stars, and total silence.*

### The Golden Vocabulary Rules
1. **Never use "Streak" or "Day Streak"** $\rightarrow$ Use **"Present Night"** (*"Night 14 of 30"*). Meditators return because they love the truth of practice, not out of streak anxiety. Merits are a sacred spiritual ledger of cultivation (*Pāramī*) — lifetime hours sat, sits completed, and Dana given — never transactional "credits", game points, or coins.
2. **Never use "Day" for path milestones** $\rightarrow$ Use **"Night"** (*"Night 1", "Night 2", "Night 3 of 30"*). MeritMoon is a nocturnal practice haven under the shining full moon.
3. **Never use "User" or "Practitioner" in meditator-facing UI** $\rightarrow$ Use **"Meditator"** (Burmese: **တရားထိုင်သူ** / **တရားယောဂီ**).
4. **Never use "Courses" for Tab 2** $\rightarrow$ Use **"Paths"**. Meditators walk sacred meditation paths, not digital school courses.
5. **Never use "Profile" for Tab 5** $\rightarrow$ Use **"Me"**. A clean, personal, unpretentious space for one's own path, sitting hours, Dana, and settings.
6. **Never omit the middle structure** $\rightarrow$ Practice follows strict three-level hierarchy: **`Path` $\rightarrow$ `Night` $\rightarrow$ `Sit`**.
7. **Never use "Session", "Lesson", or "Sitting"** $\rightarrow$ Use **"Sit"** (e.g., *"Sit 1 of 2"*).
8. **Curriculum Unit vs. User Practice Log**:
   - Prescribed curriculum sit lesson: **`Sit`** (table: `sits`).
   - Meditator's completed practice record: **`Sit Record`** (table: `sit_records`).
9. **Never allow meditators to toggle audio guidance on/off** $\rightarrow$ Guidance is strictly **Master-determined**. If a Sit includes **Guidance**, the meditator listens and follows along. There is no custom timer bypass.
10. **Never use "Live Transcript", "Subtitles", or "Audio Guidance"** $\rightarrow$ Use **"Guidance"** (spoken audio instruction paired with an elemental 1-sentence real-time text reveal).
11. **Never use "Reset" for missing dawn** $\rightarrow$ Use **"Return"** (*"Your path returned to Night 1"*). Gentle, natural, like a traveler returning to the clearing. In codebase: `return` / `returned_at`.
12. **Never use "Restart", "Wipe", or "Start Over"** $\rightarrow$ Use **"Begin Anew"** (*"Begin anew with a beginner's mind to cultivate fresh practice"*). In codebase: `begin_anew` (no legacy).
13. **Never use "User Voice" or "Sitting Reflection"** $\rightarrow$ Use **"Reflection"** (`sit_reflections`).
14. **Never use "Inquiry" or "Question" for master questions** $\rightarrow$ Use **"Doubt"** (`sit_doubts`). Sincere, humble, and traditional (*vicikicchā*), cleared by the Master.
15. **Never use "Answer" or "Guidance" for master responses** $\rightarrow$ Use **"Insight"** (`sit_insights`). Wise, illuminating, and dignified. Can be assigned to multiple similar doubts to prevent repetitive inflation.
16. **Never use "Teacher" as the primary title in UI** $\rightarrow$ Use **"Master"** (or **"Sayadaw"** for ordained monastics). Deeply honorable, reverent, and traditional.
17. **Never use "Anonymous"** $\rightarrow$ Use **"A Meditator"**. The Master *always* knows your true identity in admin, but to the public Circle your name appears simply as **A Meditator**.
18. **Never use "Hidden", "Veiled", or "Locked" for uncompleted sittings** $\rightarrow$ Use **"Awaiting"**. Warm, welcoming, and free of any feeling of discrimination or ranking. It simply awaits your sit tonight.
19. **Post-Sit Circle State** $\rightarrow$ **"Open"**. Entering The Circle is an achievement earned through sitting.
20. **Never use "Owned" for completed courses** $\rightarrow$ Use **"Complete"**. A complete path never returns to Night 1 automatically, even if switching to the Forest path. It only begins anew if intentionally chosen.
21. **Never use "Pre-Text"** $\rightarrow$ Use **"Preparation"**. Mindful posture, terminology, and room orientation before closing the eyes.
22. **Never use "Bell", "Alarm", or "Buzzer"** $\rightarrow$ Use **"Chime"**. A peaceful monastery sound at sit conclusion.
23. **Never use "Daily Reminder" or "Streak Alert"** $\rightarrow$ Use **"Nightfall"** (*"Night is falling..."*).
25. **Fixed 4:00 AM Dawn & Timezone Anchoring** $\rightarrow$ Nocturnal boundary is fixed to **4:00 AM Dawn local time** anchored at path enrollment (`dawn: "04:00"`). Non-customizable. Does not drift during travel. Server strictly evaluates UTC.
26. **Code Naming Standards (Zero Legacy / Law U14)**:
   - The Circle $\rightarrow$ `circle` (compact)
   - Begin Anew $\rightarrow$ `begin_anew`
   - Present Night $\rightarrow$ `present_night`
   - Dawn $\rightarrow$ `dawn`
   - Nature $\rightarrow$ `natures` (ordered array in `paths`, first is primary) and `nature` (in `nights`)
   - Return $\rightarrow$ `return`
   - Night Sequencer $\rightarrow$ `nights.night` (1..N, sequential night along path; zero bloated `position`)
   - Sit Sequencer $\rightarrow$ `sits.sit` (1..5, sequential sit within night; zero bloated `position`)
27. **"Dana" is not charity or tipping** $\rightarrow$ **Dana** is a sacred practice of generosity that *powers merits protection*.

---

## 🗂️ 2. Comprehensive Master Lexicon

### A. Identity & The Five Tabs

| Sacred Term | Definition | Allowed Contexts | ❌ Forbidden Terms |
| :--- | :--- | :--- | :--- |
| **Meditator** | A person cultivating the mind through daily meditation. | All UI copy, notifications, headers. | *"User", "Practitioner", "Player", "Subscriber", "Customer", "Client"* |
| **A Meditator** | The respectful public display name when a meditator masks their name in The Circle (Master still sees their true identity). | The Circle, shared reflections and doubts. | *"Anonymous", "Incognito", "Secret User", "Guest"* |
| **Sanctuary** | The meditator's quiet opening under the moon (Tab 1). | App tab 1 title, welcome header. | *"Home feed", "Dashboard", "Portal"* |
| **Paths** | The catalog of authentic meditation curricula (Tab 2). | App tab 2 title, catalog browsing, tradition lists. | *"Courses", "Classes", "Lessons Catalog", "Library"* |
| **Sit** | The elevated center tab (Tab 3) where active practice happens. | App tab 3 title, action buttons, sit cards. | *"Workout", "Play", "Start Session", "Exercise"* |
| **Journey** | The timeline of practice calendar, history, and completed paths (Tab 4). | App tab 4 title, history views. | *"Analytics", "Stats", "Progress Tracker", "Log"* |
| **Me** | The personal space holding your path, sitting hours, Dana, and settings (Tab 5). | App tab 5 title, personal settings header. | *"Profile", "Account", "User Center", "My Page"* |

---

### B. Practice Hierarchy: Path $\rightarrow$ Night $\rightarrow$ Sit

$$\mathbf{Path} \longrightarrow \mathbf{Night} \longrightarrow \mathbf{Sit}$$

| Sacred Term | Definition | Allowed Contexts | ❌ Forbidden Terms |
| :--- | :--- | :--- | :--- |
| **Path** | The complete meditation curriculum spanning $N$ nights (e.g., *Pa-Auk Foundations*, 30 Nights). | Catalog, sanctuary, enrollment. | *"Course", "Class", "Program"* |
| **Night** | The sequential nocturnal stage along an enrolled path (e.g., *Night 3 of 30*). | Path timeline, calendar, nightly headers. | *"Day", "Module", "Chapter", "Level"* |
| **Sit** | The discrete individual practice unit within a night (e.g., *Sit 1 of Night 1*, *Sit 2 of Night 1*, *Sit 1 of Night 2*). Each night contains 1 to 5 Sits, sequenced cleanly via `sits.sit` (`1..5`). Prescribed in `sits`. | Sit tab index, audio player, practice buttons. | *"Session", "Lesson", "Sitting", "Step", "Track"* |
| **Sit Record** | The verified log of a completed sit session (`sit_records` table). | Journey session history, completion proofs. | *"Session log", "User sit", "Activity log"* |

---

### C. The Two Paths & Merits Architecture

| Sacred Term | Definition | Allowed Contexts | ❌ Forbidden Terms |
| :--- | :--- | :--- | :--- |
| **The Forest Path** *(or **Forest**)* | The free path. Full access to all paths, earned step-by-step through unbroken nightly discipline. Missing a night before 4:00 AM dawn returns active path progress to Night 1. | Path badge, path detail screens, settings. | *"Free Plan", "Basic Tier", "Freemium", "Trial"* |
| **The Moonlit Path** *(or **Moonlit**)* | The $9.99/month path where **Dana is powered as a merit**, shielding active path progress from automatic returns while supporting masters and monasteries. | Path badge, Dana breakdowns, upgrade cards. | *"Premium", "Pro Tier", "Paid Membership", "VIP"* |
| **Merits** | The fundamental measure of spiritual cultivation (*Pāramī*): lifetime hours sat, completed sits, and Dana given. Not a credit or transactional reward system. | Progress headers, milestone dialogs, journey tab. | *"Points", "XP", "Score", "Streaks", "Credits", "Coins"* |
| **Present Night** | The active nocturnal milestone currently being walked (e.g., *"Night 14 of 30"*). Returns to Night 1 upon missed 4:00 AM dawn (Forest) or Begin Anew. In code: `present_night`. | Sanctuary hero card, path detail timeline, journey. | *"Streak", "Day progress", "Level", "Stage"* |
| **Return** | **Automatic event**: Occurs when a Forest Path meditator fails to complete a night's Sits before 4:00 AM dawn. Active path progress returns to Night 1. (Server remembers max night reached for Moonlit recovery). Code: `return` / `returned_at`. | Forest return notice, reminder warnings. | *"Reset", "Streak lost", "Game over", "Expired", "Penalty"* |
| **Begin Anew** | **Intentional action**: The meditator consciously chooses to begin anew from scratch with a beginner's mind. Code: `begin_anew` (no legacy). | Path options menu, journey tab actions. | *"Restart", "Reset course", "Wipe progress", "Re-enroll", "Start over"* |
| **Recovery / Restored Path** | When a Forest meditator joins the Moonlit Path, their path progress up to their historical maximum night is instantly restored. | Moonlit prompt, subscription confirmation. | *"Unblock", "Recover save", "Pay-to-win"* |
| **Complete** | The permanent status granted when a meditator completes the final night of a path. Never returns to Night 1 automatically, even if changing paths or plans. | Journey tab, path detail badge. | *"Owned", "Purchased", "Downloaded", "Completed item"* |
| **Stop / Stopped** | An incomplete path is stopped when switching to another path. Active progress on Forest returns to Night 1 while server preserves highest night. Code: `status: :stopped` (`2`). | Path switching dialog, enrollment. | *"Pause", "Paused", "Freeze", "Put on hold", "Sleep mode"* |
| **Earn Again Merits** | Action on a **Complete** path allowing the meditator to begin anew active journey mode to cultivate fresh practice. | Complete path detail card. | *"Reset completed course", "Play again"* |

---

### D. Audio Experience, Sits & The Circle

| Sacred Term | Definition | Allowed Contexts | ❌ Forbidden Terms |
| :--- | :--- | :--- | :--- |
| **Preparation** | Orientation explaining posture, terminology, and room setup before closing eyes. | Pre-sit screen in Tab 3. | *"Pre-Text", "Instructions", "Intro", "Description"* |
| **Guidance** | The spoken audio instruction paired with an elemental 1-sentence real-time text reveal. Audio presence is strictly Master-determined; meditators follow along without toggle bypass. | Sit player, audio controls. | *"Live Transcript", "Audio Guidance", "Subtitles", "Speech", "Voice"* |
| **Chime** | The peaceful monastery bell or singing bowl sounded when a Sit completes. | Audio completion, timer sound settings. | *"Alarm", "Buzzer", "Ringtone", "Alert", "Bell"* |
| **Reflection** | What arose in the mind or body during the Sit (sensations, calmness, stillness, obstacles). Stored in `sit_reflections`. | Post-sit card, The Circle feed. | *"Comment", "Review", "Rating", "User Voice"* |
| **Doubt** | An obstacle, struggle, or uncertainty regarding the meditation technique brought to the Master. Stored in `sit_doubts`. | Post-sit card, Master inbox. | *"Question", "Inquiry", "Ticket", "Support query"* |
| **Insight** | The Master's compassionate, wise answer and teaching clearing the meditator's doubt. Stored in `sit_insights` library and can be assigned to multiple similar doubts. | The Circle card, notification banner. | *"Guidance", "Answer", "Reply", "Resolution"* |
| **The Circle** | The sacred community space dedicated to a specific Sit, showing meditators' reflections, doubts, and the Master's insights. In code: `circle`. | Post-sit screen, completed sit view. | *"Forum", "Comment section", "Discussion board", "The Sitting Circle"* |
| **Awaiting** | The welcoming state of The Circle before you complete tonight's Sit. (Opens the moment you sit). | Uncompleted sit view in The Circle. | *"Locked", "Hidden", "Veiled", "Blocked", "Gated"* |
| **Open** | The active state of The Circle once tonight's Sit is complete. | Completed sit view in The Circle. | *"Unlocked", "Accessible"* |
| **4:00 AM Dawn** | The fixed 4:00 AM local time nocturnal boundary anchored at enrollment (`dawn: "04:00"`). Tonight's Sits must be completed before dawn. | Me tab, path detail, notifications. | *"Cutoff", "Deadline", "Reset time", "Cooldown"* |

---

### E. Masters, Traditions & Community

| Sacred Term | Definition | Allowed Contexts | ❌ Forbidden Terms |
| :--- | :--- | :--- | :--- |
| **Master** | The venerable meditation master guiding the path (`masters` table). If ordained (`monastic: true`), addressed as **Sayadaw** or **Venerable**; if lay master (`monastic: false`), addressed as **Master**. | Path headers, audio player, master directory. | *"Coach", "Instructor", "Speaker", "Author", "Guru", "Teacher"* |
| **Monastery** | The sacred physical meditation sanctuaries and forest monasteries hosting the masters and receiving Dana. | Dana impact tab, master profiles. | *"Venue", "Location", "Branch", "Partner", "Center"* |
| **Tradition** | The authentic Theravada teaching tradition and spiritual foundation (*Upanissaya* / **ဥပနိဿယ**) passed down through generations of masters (e.g. *Pa-Auk, The-Inn-Gu, Yay-Soon, Myay-Zin, Mahasi, Mogok*). In database: `traditions` table (`tradition_id`). | Path metadata, monastery profile, search filters. | *"Category", "Genre", "Style", "Tag", "Method", "Technique", "Lineage"* |
| **Masterclass** | An introductory video preview and guided sit where the master explains the profound depth of the path. | Tab 2 header carousel, path detail header. | *"Promo video", "Trailer", "Sample"* |
| **Dana** | Sacred generosity. Direct financial support flowing to monasteries and masters from Moonlit subscriptions. | Dana Impact, path explanations. | *"Donation", "Tip", "Fee", "Tax cut"* |
| **Dana Flow** | The transparent breakdown showing monthly and cumulative support delivered to monasteries. | Tab 5 Me, community report. | *"Charity dashboard", "Revenue split"* |
| **Kappiya** | A lay monastery attendant and steward who handles financial requisites and logistical support for monastics in strict accordance with the Vinaya code. Recorded in `monasteries.support_info`. | Admin support profiles, monastery communications. | *"Agent", "Accountant", "Middleman", "Broker", "Treasurer"* |
| **Support Info** | Secure metadata holding Kappiya contact details, bank transfer recipient information, and data needed to receive Dana support (`support_info` column in `monasteries`). | Admin monastery profiles, Dana support logs. | *"Disbursement info", "Payout details", "Billing info", "Invoice details"* |
| **Nightfall** | The gentle evening push reminder alerting meditators to sit before 4:00 AM dawn (*"Night is falling..."*). | Evening notifications. | *"Reminder", "Daily push", "Streak alert", "Ping"* |
| **Sitting Now** | Real-time live counter of meditators actively practicing worldwide at this exact moment under the moon. | Tab 1 Sanctuary metrics. | *"Active users", "Online users", "Live count"* |
| **Nature** | The mental nature addressed across the path and within each night (*Carita* / **စရိုက်**). Centralized and consistent across the whole app. Rooted in the canonical Theravada 6 Carita (*Cha-carita* / **စရိုက် ၆ ပါး**). Paths define an ordered `natures` array (strongest to weakest, 1–2 recommended; first is primary); each night targets its specific `nature`. Uniform `-ing` cadence: `anger_calming` (*Dosa*), `greed_subduing` (*Rāga*), `restlessness_stilling` (*Vitakka*), `confusion_clearing` (*Moha*), `wisdom_inquiring` (*Buddhi*), `faith_inspiring` (*Saddhā*). | Path cards, catalog filters, night headers. | *"Temperament", "Disposition", "Personality type", "Difficulty level"* |
| **Master Roles** | The compact monastic collaboration roles on a path: **Head** (`0: head` - Principal Master/Sayadaw), **Assistant** (`1: assistant`), and **Translator** (`2: translator`). | Path detail master list, admin studio. | *"Lead_master", "Assistant_master", "Chanting_master", "Teacher"* |

---

### F. Practice Accomplishments & Milestones

| Term | Definition | Notes |
| :--- | :--- | :--- |
| **Milestone** | Celebrating profound milestones along the path (e.g. 7 nights, 30 nights, 100 hours of sitting under the moon). | Kept as standard. |

---

## 🇲🇲 3. English to Burmese (မြန်မာ) Sacred Translation Glossary

| English Term | Standard Burmese Term | Pronunciation & Context |
| :--- | :--- | :--- |
| **MeritMoon** | **မေတ္တာလမင်း (သို့) မေရစ်မွန်း** | Sanctuary brand name |
| **Meditator** | **တရားထိုင်သူ (သို့) တရားယောဂီ** | Respectful designation for meditators |
| **A Meditator** | **တရားထိုင်သူတစ်ဦး (သို့) ယောဂီတစ်ဦး** | Respectful masked identity in The Circle |
| **Sanctuary** | **သာယာချမ်းမြေ့ရာ ရိပ်သာ / Sanctuary** | Personal practice haven (Tab 1) |
| **Paths** | **လမ်းစဉ်များ / တရားလမ်းစဉ်များ** | Meditation paths catalog (Tab 2) |
| **Night** | **ညချမ်းအဆင့် / ညရက်** | Nocturnal milestone along a path (*Night 1, 2..*) |
| **Sit** | **တရားထိုင်ခြင်း / အားထုတ်ခြင်း** | Discrete curriculum sit unit (`sits`) |
| **Sit Record** | **တရားထိုင်ပြီးစီးမှု မှတ်တမ်း** | Verified practice log entry (`sit_records`) |
| **Guidance** | **ဆရာ့အသံတော်နှင့် တရားလမ်းညွှန်** | Spoken audio guidance & real-time text reveal |
| **Chime** | **အေးချမ်းသာယာသော ခေါင်းလောင်းသံ** | Sitting conclusion chime |
| **Journey** | **ခရီးစဉ် / လေ့ကျင့်မှုမှတ်တမ်း** | Practice calendar & accomplishments (Tab 4) |
| **Me** | **မိမိ / ကျွန်ုပ်** | Personal path, Dana & settings (Tab 5) |
| **Master** | **ဆရာတော် / မာစတာ (တရားပြဆရာ)** | General title (`monastic: true` $\rightarrow$ ဆရာတော်) |
| **Tradition** | **တရားလမ်းစဉ် ဥပနိဿယ (ဥပနိဿယ)** | Authentic teaching tradition & spiritual foundation (*Mogok, Mahasi Upanissaya*) |
| **Monastery** | **တောရရိပ်သာ / ဘုန်းတော်ကြီးကျောင်း** | Monasteries receiving Dana |
| **The Forest Path** | **တောရလမ်းစဉ်** | Free unbroken discipline path |
| **The Moonlit Path** | **လရောင်လမ်းစဉ်** | Dana-supported protected path ($9.99/mo) |
| **Merits** | **ကုသိုလ် / ပါရမီ** | Sacred spiritual cultivation ledger |
| **Night Merits** | **ညစဉ်ကုသိုလ်ပါရမီ** | Completed single night cultivation |
| **Path Merits** | **လမ်းစဉ်ကုသိုလ်ပါရမီ** | Accumulated path progress |
| **Preparation** | **စိတ်ပြင်ဆင်ခြင်းနှင့် လမ်းညွှန်** | Pre-sitting posture and room guidance |
| **Reflection** | **ရင်တွင်းခံစားချက် / တရားတွေ့ကြုံမှု** | Meditator's practice report after sit (`sit_reflections`) |
| **Doubt** | **သံသယ / မေးမြန်းချက်** | Obstacle or question brought to Master (`sit_doubts`) |
| **Insight** | **ဆရာ့အလင်းပြစကား / တရားအဖြေ** | Master's wise response that clears the doubt (`sit_insights`) |
| **The Circle** | **တရားထိုင်ဝိုင်း စကားသံများ** | Community space dedicated to a sit (`circle`) |
| **Awaiting** | **တရားထိုင်ရန် စောင့်ဆိုင်းဆဲ** | Welcoming state awaiting tonight's sit |
| **Open** | **ဖွင့်လှစ်ပြီး** | Circle accessible after sitting |
| **Return** | **ပြန်လည်ဆုတ်ခွာခြင်း (အလိုအလျောက်)** | Automatic return to Night 1 upon missed 4:00 AM dawn |
| **Begin Anew** | **အသစ်တဖန် ပြန်လည်စတင်ခြင်း** | Intentional fresh start over with a beginner's mind (`begin_anew`, no legacy) |
| **Stop / Stopped** | **ရပ်နားခြင်း (လမ်းစဉ်ပြောင်းလဲခြင်း)** | Path stopped when switching (`status: :stopped`, `2`) |
| **Complete** | **ပြီးမြောက်အောင်မြင်ပြီး** | Permanent path completion (never auto-returns) |
| **Present Night** | **လက်ရှိည (လက်ရှိအားထုတ်ရမည့်ည)** | Active nocturnal milestone along the path (`present_night`, e.g. Night 14) |
| **4:00 AM Dawn** | **မိုးသောက်ယံ နံနက် ၄ နာရီ** | Fixed local dawn boundary (`dawn: "04:00"`) |
| **Nightfall** | **ညချမ်းအချိန်ရောက်ပြီ** | Evening reminder (*"Night is falling..."*) |
| **Sitting Now** | **လက်ရှိ တရားထိုင်နေသူများ** | Global realtime sitting counter |
| **Nature** | **စိတ်စရိုက်သဘာဝ (စရိုက် ၆ ပါး)** | Canonical Theravada 6 Carita enum (`natures`, `nature`) |
| **Head Master** | **ဦးဆောင်ဆရာတော် / အဓိကဆရာ** | Principal Master delivering root instruction (`seat: 0: head`) |
| **Assistant Master** | **လက်ထောက်ဆရာတော် / တွဲဖက်ဆရာ** | Supporting instructor (`seat: 1: assistant`) |
| **Translator** | **ဓမ္မဘာသာပြန်ဆရာ** | Multilingual Dhamma interpreter (`seat: 2: translator`) |
| **Dana** | **ဒါန / စေတနာသဒ္ဓါတရား** | Generosity offering supporting monasteries |
| **Kappiya** | **ကပ္ပိယကာရက (ကပ္ပိယ)** | Lay attendant handling monastics' support according to Vinaya |
| **Support Info** | **ထောက်ပံ့လှူဒါန်းမှု အချက်အလက်** | Dana support & Kappiya transfer metadata (`support_info`) |

---

## ✍️ 4. UI Micro-Copy Examples

- **Pre-Sit Card:**
  > *"Take a deep breath. Settle your posture under the tree. Close your eyes when you are ready."*
- **After Sit Completes:**
  > *"Sit complete. Rest in stillness, or leave a **Reflection** or bring a **Doubt** to Master."*
- **Nightfall Notification:**
  > *"Night is falling... Settle under the tree for Night 3: Sit 1 before 4:00 AM dawn."*
- **Before You Sit (The Circle):**
  > *🌕 **Awaiting** — The Circle is awaiting your sit tonight. Sits are meant to be experienced directly, not intellectualized beforehand. Sit under the tree to enter.*
- **Masking Your Name:**
  > `[✓] Display as "A Meditator" in The Circle (Master always sees your true name in admin)`
- **When Master Answers:**
  > *✦ **Sayadaw U Ācinna** shared an **Insight** on your doubt for Night 3: Sit 1.*
- **When Missed 4:00 AM Dawn on Forest:**
  > *🌿 Your path has **returned to Night 1**. The tree awaits your fresh sit tonight. Or join the Moonlit Path to restore all merits.*
- **Sanctuary Header Telemetry:**
  > *🌕 **1,420 Sitting Now** under the moon.*
- **Completed Path Card:**
  > *Pa-Auk Foundations · 30 Nights · **Complete ✓** (Permanently rooted in your Sanctuary).*
