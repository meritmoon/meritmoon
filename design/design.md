# 🌕 MeritMoon Mobile — Brand Guidelines & Atomic Design System

> Extracted directly from [`style.css`](/style.css) and [`script.js`](/script.js). Every token, every value, every behavior is 1:1 with the landing page you built and love.

---

## Design Philosophy

under the shining fullmoon... moon is always full moon... open grass field with fresh breezes blowing on the grasses. sitting under a tree which is also dancing with the breeze... small amount of fireflies appear here and there randomly time by time... twinkling stars in the sky... twinkling fireflies on the ground... at gentle night... no houses no humans no non-organic materials no human-made materials and no disturbing background...

## 📐 Complete Atomic Reference Sheets

```carousel
![1. Color Palette, Gradients, Typography & Glow Shadows](/design/assets/mm_ds_1.jpg)
<!-- slide -->
![2. Buttons, Badges & Pills — States & Specs](/design/assets/mm_ds_2.jpg)
<!-- slide -->
![3. Cards, Moon Mascot Anatomy & Moon-as-Light-Source Physics](/design/assets/mm_ds_3.jpg)
<!-- slide -->
![4. Fireflies, Moonlight Wash, Motion Curves & Micro-interactions](/design/assets/mm_ds_4.jpg)
```

---

## 🌙 The Core Concept: Moon-as-Light-Source

The MeritMoon fullmoon logo sits at the **top-left of the app bar** on every screen. It is not just a logo — it is the **physical light source** for the entire UI.

**Every element** in the app receives its highlight on the **top-left edge** (facing the moon) and casts its shadow to the **bottom-right** (away from the moon).

```
  🌕 MeritMoon          ← light source (top-left)
   ↘  ↘  ↘
  ┌─────────┐
  │  Card   │
  │         │ ▓▓▓  ← shadow falls bottom-right
  └─────────┘ ▓▓▓
```

This creates a **physically coherent** and **emotionally grounded** UI where every surface feels like it's being gently illuminated by the full moon.

---

## 🎨 1. Color Tokens (Exact from `:root`)

### Core Four

| Token       | Hex       | Role                     |
| :---------- | :-------- | :----------------------- |
| `--silver`  | `#C8D8C0` | Moonlight through leaves |
| `--emerald` | `#2E8B57` | Deep forest green        |
| `--ruby`    | `#C24B5A` | Twilight bloom, warnings |
| `--gold`    | `#D4A853` | Warm moonbeam gold       |

### Bright / Dim Variants

|            | Silver    | Emerald   | Ruby      | Gold      |
| :--------- | :-------- | :-------- | :-------- | :-------- |
| **Bright** | `#E8F0E0` | `#4DBF82` | `#E87088` | `#F0C870` |
| **Dim**    | `#7A8C74` | `#1A5235` | `#7A2030` | `#7A5A20` |

### Backgrounds & Frosted Glassmorphism Surfaces

| Token | Value | Role / Usage |
| :--- | :--- | :--- |
| `--bg-deep` | `#020A05` | Canvas scaffold / forest night background |
| `--bg-mid` | `#041209` | Mid-depth background |
| `--bg-surface` | `#071A0D` | Modals, elevated surfaces |
| `--bg-glass-card` | `rgba(8, 26, 15, 0.28)` | Standard frosted glass card fill |
| `--bg-glass-card-hover`| `rgba(12, 38, 22, 0.42)` | Hover state glass fill |
| `--bg-glass-card-lit` | `rgba(14, 44, 25, 0.36)` | Featured course / tier glass fill |
| `--bg-glass-nav` | `rgba(4, 16, 9, 0.65)` | Scrolled frosted navigation bar |
| `--glass-blur` | `24px` | Frosted backdrop blur radius |
| `--glass-blur-heavy` | `32px` | Deep frosted backdrop blur |

### Borders & Specular Glass Outlines

| Token | Value | Role / Usage |
| :--- | :--- | :--- |
| `--border-glass` | `rgba(200, 216, 192, 0.14)` | Delicate frosted card border |
| `--border-glass-hover`| `rgba(77, 191, 130, 0.45)` | Active emerald glass glow border |
| `--border-moss` | `rgba(200, 216, 192, 0.10)` | Subtle structure separator |
| `--border-emerald` | `rgba(46, 139, 87, 0.35)` | Emerald button / badge border |

### Text & High-Contrast Typography Tokens

| Token | Hex / Value | Contrast Ratio | Role / Usage |
| :--- | :--- | :--- | :--- |
| `--text-light` | `#F4FAF0` | > 15:1 | Primary headings, titles, hero copy |
| `--text-mid` | `#CADBC6` | > 10:1 | Body copy, descriptions, card paragraphs |
| `--text-dim` | `#8FA78C` | > 6:1 | Metadata, timestamps, captions |
| `--text-dimmer`| `#6D856B` | > 4.5:1 | Micro-labels, secondary footers |

### Gradients

| Token              | Value                                                            |
| :----------------- | :--------------------------------------------------------------- |
| `--grad-base-135`  | `linear-gradient(135deg, #C8D8C0 0%, #2E8B57 100%)`              |
| `--grad-base-diag` | `linear-gradient(135deg, #E8F0E0 0%, #C8D8C0 40%, #2E8B57 100%)` |
| `--grad-glow-135`  | `linear-gradient(135deg, #C24B5A 0%, #D4A853 100%)`              |

### Glow Box-Shadows

```css
--glow-silver:
  0 0 24px rgba(200, 216, 192, 0.35), 0 0 60px rgba(200, 216, 192, 0.12);
--glow-emerald:
  0 0 24px rgba(46, 139, 87, 0.45), 0 0 60px rgba(46, 139, 87, 0.15);
--glow-ruby: 0 0 24px rgba(194, 75, 90, 0.55), 0 0 60px rgba(194, 75, 90, 0.2);
--glow-gold:
  0 0 24px rgba(212, 168, 83, 0.55), 0 0 60px rgba(212, 168, 83, 0.2);
```

---

## ✏️ 2. Typography Stack

| Role                         | Font                     | Weight             | Details                                                   |
| :--------------------------- | :----------------------- | :----------------- | :-------------------------------------------------------- |
| **Display / Nav / Eyebrows** | `Moonjelly` (custom OTF) | 300, 700           | `letter-spacing: 0.14–0.3em`, `text-transform: uppercase` |
| **Section Headings**         | `Cormorant Garamond`     | 300, 400, 600, 700 | Elegant serif, `line-height: 1.15`                        |
| **Body Text**                | `Fauna One`              | 400                | `font-size: 1.05rem`, `line-height: 1.75`                 |

### Gradient Text Effect (`.grad-text`)

```css
background: var(--grad-base-diag);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
filter: drop-shadow(0 0 18px rgba(46, 139, 87, 0.5));
```

---

## 🔘 3. Buttons

### `.btn--forest` (Primary CTA)

```css
border-radius: 50px;
background: var(--grad-base-135); /* silver → emerald */
color: var(--bg-deep); /* #020A05 dark text */
box-shadow: var(--glow-emerald);
font-family: var(--font-display); /* Moonjelly */
font-size: 0.82rem;
letter-spacing: 0.14em;
text-transform: uppercase;
padding: 14px 36px;
```

- **Hover**: `translateY(-3px) scale(1.03)`, combined `--glow-silver` + `--glow-emerald`
- **Hover overlay**: Ruby-to-gold gradient at `opacity: 0.18` (Piti spark)
- **Icon**: Leaf emoji `🌿` or crescent `☽`

### `.btn--ghost` (Secondary)

```css
background: transparent;
color: var(--silver);
border: 1px solid var(--border-glow); /* rgba(200,216,192,0.22) */
```

- **Hover**: `border-color: var(--silver)`, `background: rgba(200,216,192,0.07)`, `--glow-silver`

---

## 🃏 4. Cards

### `.pcard` (Standard Promise/Feature Card)

```css
background: var(--bg-card); /* rgba(5,18,10,0.85) */
border: 1px solid var(--border-moss); /* rgba(200,216,192,0.1) */
border-radius: 24px;
padding: 40px 32px;
backdrop-filter: blur(14px);
```

- **Hover**: `translateY(-6px)`, border brightens to `--border-glow`
- **Top gradient line** on hover: `background: var(--grad-base)`, `height: 1px`
- **Bottom bar** on hover: `var(--grad-glow)` ruby-to-gold, 2px, `--glow-gold`

### `.pcard--lit` (Featured/Highlighted Card)

```css
background: linear-gradient(
  145deg,
  rgba(5, 18, 10, 0.96),
  rgba(8, 30, 16, 0.94)
);
border-color: var(--border-emerald); /* rgba(46,139,87,0.3) */
box-shadow: 0 0 50px rgba(46, 139, 87, 0.12);
```

### `.ccard` (Course Card)

Same glass surface with progress meter bar at bottom (emerald gradient fill).

---

## 🌕 5. Moon Mascot Anatomy

> 📖 **Full Specification**: See the dedicated [Mascot Guidelines & Animation Specification](./mascot-guidelines.md) for complete vector blueprints, eye-tracking math, Poisson blinking, and Flutter implementation code.

```css
/* Radial gradient — the radiant silver-bright moon surface */
background: radial-gradient(
  circle at 36% 30%,
  #ffffff 0%,
  /* pure luminous white */ #f5faf3 25%,
  /* radiant silver-bright */ #e4eee2 55%,
  /* soft silver-mid */ #cad9c7 80%,
  /* gentle silver rim */ #b2c7af 100%
);
box-shadow:
  0 0 24px rgba(255, 255, 255, 0.45),
  0 0 60px rgba(200, 216, 192, 0.22);

/* Face elements */
.mm-eye {
  background: #0d1c10;
  top: 36%;
  width: 13%;
  height: 13%;
}
.mm-eye::after {
  /* Specular Glint Catchlight */
  top: 20%;
  left: 22%;
  width: 32%;
  height: 32%;
  background: #ffffff;
}
.mm-smile {
  border: 2.6px solid #0d1c10;
  border-top: none;
  border-radius: 0 0 50px 50px;
  bottom: 18%; /* Positioned comfortably below mid-face */
  width: 44%;
  height: 20%;
}
.mm-blush {
  background: rgba(225, 95, 115, 0.35); /* Rosy-ruby blush */
  filter: blur(2.5px);
  top: 51%;
}
.mm-halo {
  border: 1px solid rgba(255, 255, 255, 0.35);
  width: 136%;
  animation: halo-pulse 4s;
}
.mm-shine {
  color: var(--gold-bright); /* ✦ ✧ sparkles */
}
```

### Sizes (by context)

| Context            | Size   |
| :----------------- | :----- |
| Nav (app bar logo) | `38px` |
| Card icon          | `48px` |
| Step indicator     | `44px` |
| Course card        | `40px` |
| Pricing / About    | `56px` |
| Footer             | `34px` |

### Interactive Behaviors

- **Eye tracking**: Eyes follow user's finger/cursor position with `1.4px` max offset
- **Blink**: Random `scaleY(0.08)` blink every 3–7.5 seconds
- **Halo pulse**: Scale `1 → 1.14`, opacity `0.6 → 0.15`, 4s cycle

---

## ✨ 6. Atmospheric Elements

### Fireflies

```css
.firefly {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--gold-bright); /* #F0C870 */
  box-shadow: 0 0 6px 2px var(--gold-bright);
}
/* 25% chance: emerald variant #4DBF82 */
/* Duration: 6–18s | Random delays | Float drift with opacity pulse */
```

Keyframe: `opacity: 0 → 0.8 → 0.4 → 0.7 → 0` with gentle XY drift.

### Moonlight Wash

```css
background: radial-gradient(
  ellipse at center,
  rgba(200, 216, 192, 0.07) 0%,
  rgba(46, 139, 87, 0.04) 35%,
  rgba(200, 216, 192, 0.02) 60%,
  transparent 75%
);
animation: wash-breathe 9s ease-in-out infinite;
/* Scale: 1 → 1.08, Opacity: 0.6 → 1 */
```

### Card Ambient Glow (Touch/Hover Tracked)

```css
/* Radial spotlight follows finger position on card surface */
background:
  radial-gradient(
    circle at ${x}% ${y}%,
    rgba(200, 216, 192, 0.055) 0%,
    transparent 55%
  ),
  var(--bg-card);
```

---

## ⚡ 7. Motion System

| Token           | Curve                               | Usage                      |
| :-------------- | :---------------------------------- | :------------------------- |
| `--ease-forest` | `cubic-bezier(0.22, 1, 0.36, 1)`    | All standard transitions   |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful micro-interactions |

### Reveal Animation

```css
.reveal-fade {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.75s var(--ease-forest),
    transform 0.75s var(--ease-forest);
}
/* Staggered: each sibling += 80ms delay */
```

### Button Hover Sparks (Piti Burst)

On primary button hover: 7 tiny `✦` / `✧` sparkles burst outward with gold/silver colors, `0.65s` duration, with `drop-shadow(0 0 3px var(--gold))`.

---

## 🏛️ 8. Mobile App Bar Structure

```
┌──────────────────────────────────────────┐
│ 🌕  MeritMoon                       [⚙️] │
│  ↑   ↑                                  │
│  │   └─ Gradient wordmark (Moonjelly)    │
│  └───── 38px moon mascot (light source)  │
│         with pulsing halo & eye tracking │
└──────────────────────────────────────────┘
         ↘ ↘ ↘ ↘ ↘ ↘ ↘
    Light rays illuminate all content below
    Shadows on every element fall bottom-right
```

> [!IMPORTANT]
> The **moon logo is the canonical light source**. In Flutter, implement this as a consistent `boxShadow` offset of approximately `(4, 6)` with the appropriate glow color on all elevated surfaces. Cards closer to the moon (higher on screen) have slightly brighter top-left highlights.
