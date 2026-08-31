# 🌕 MeritMoon — Official Mascot Guidelines & Animation Specification

> _"Under the shining full moon... The moon is always a full moon. Sitting peacefully in an open grass field with fresh breezes blowing, dancing with the trees and fireflies. The moon is our silent guide, our anchor of stillness, and the living light source of our sanctuary."_

---

## 🧭 1. Mascot Identity & Core Philosophy

The **Full Moon Mascot** (🌕) is the soul and living embodiment of **MeritMoon**. It is neither a cartoon gimmick nor a superficial branding asset; it is a **gentle, mindful companion** that breathes, blinks, watches with kindness, and illuminates every step of the practitioner's journey.

### Fundamental Brand Laws
1. **The Moon is Always Full**: There are no half-moons, crescent cutouts, or gibbous phases for the mascot. The full moon represents the innate, unbroken clarity of the mind.
2. **Canonical Light Source**: In every screen and layout, the moon serves as the **physical light source** (positioned at the top-left). Every card highlight, button shadow, and elevation wash physically derives from this origin point.
3. **Organic Expressions Only**: The mascot expresses peace, contemplation, joy (pīti), and gentle presence. It never shows stress, agitation, rush, or commercial hype.

---

## 📐 2. Anatomical Blueprint & Exact Geometry

The mascot is constructed from precise geometric ratios based on its bounding diameter ($D = 2R$).

```
                ╭────────────────────────────────╮  ← Halo Ring (136% D)
             ╭──│────── 🌕 Top-Left Light ───────│──╮
           ╭─│──│────────────────────────────────│──│─╮
          ╭──╯  │   #E8F0E0 (Bright Core)        │  ╰──╮
         ╭╯     │    36% X, 32% Y                │     ╰╮
        ╭╯      │                                │      ╰╮
        │       │    👁️  36% Y       👁️  36% Y    │       │
        │       │   27% L           27% R        │       │
        │       │   [ 14% D ]       [ 14% D ]    │       │
        │       │                                │       │
        │       │  😊   (Ruby Blush 52% Y)       │       │
        │       │    ╰─────────◡─────────╯       │       │
        ╰╮      │       Smile Arc 22% B          │      ╭╯
         ╰╮     │                                │     ╭╯
          ╰──╮  │   #5A7055 (Deep Forest Edge)   │  ╭──╯
           ╰─│──│────────────────────────────────│──│─╯
             ╰──│────────────────────────────────│──╯
                ╰────────────────────────────────╯
```

### A. Proportions & Coordinate Specs

| Anatomical Part | Relative Size / Ratio | Coordinate / Placement | Color / Gradient Token |
| :--- | :--- | :--- | :--- |
| **Lunar Sphere** | $100\% D$ ($R = 50\%$) | Center $(X: 50\%, Y: 50\%)$ | **Silver-Bright Lunar Gradient**:<br>`radial-gradient(circle at 36% 28%, #FFFFFF 0%, #F7FAF5 32%, #E2EDE0 65%, #C4D8C0 85%, #A5BFA0 100%)` |
| **Outer Halo Ring** | $136\% D$ ($1.36 \times D$) | Concentric $(X: 50\%, Y: 50\%)$ | `1px solid rgba(255, 255, 255, 0.35)` with 4s pulse |
| **Eyes (Left & Right)** | $13\% D$ diameter circle + **Catchlight Glint** | $Y: 36\%$ from top<br>Left: $28\%$ from L edge<br>Right: $28\%$ from R edge | Deep Obsidian `#0D1C10`<br>+ Specular Catchlight dot at $(22\%, 20\%)$ in `#FFFFFF` (32% eye diameter) |
| **Innocent Smile Arc** | Width: $32\% D$<br>Height: $12\% D$<br>Stroke: $2.2\text{px} - 2.8\text{px}$ | Bottom: $22\%$ from bottom edge ($Y: 66\% \rightarrow 78\%$ curve)<br>Centered horizontally | `#0D1C10` with `stroke-linecap: round`<br>**Pure, delicate, shallow upward curve** capturing the sweetness, purity, and calmness of an innocent child meditating |
| **Ruby Blush (L & R)** | Width: $19\% D$<br>Height: $9\% D$ | $Y: 51\%$ from top<br>Left: $9\%$ from L edge<br>Right: $9\%$ from R edge | Rosy-Ruby `#E15F73` at $0.35 - 0.40$ opacity with $2.5\text{px}$ blur |
| **Lunar Edge Rim** | $100\% D$ | Concentric stroke | `#FFFFFF` at $0.55$ opacity ($0.8\text{px}$ width) |

---

## 🎭 3. Expression Matrix & State Variations

```carousel
![Welcoming State](/mascot.svg)
<!-- slide -->
![Meditative State](/design/assets/mascot-meditating.svg)
<!-- slide -->
![Joyful State](/design/assets/mascot-joyful.svg)
<!-- slide -->
![Brand Mark](/logo.svg)
```

### 1. Welcoming / Alert (`mascot.svg`)
- **Usage**: App bar navigation, default cards, settings header, onboarding.
- **Eyes**: Open, alert, soulful with specular catchlight glints. Actively tracks practitioner cursor or touch location in 3D / 2D space.
- **Mouth**: Delicate, sweet, innocent smile of an earnest child meditator.
- **Halo**: Soft 4-second continuous breath cycle.

### 2. Meditative / Contemplative (`mascot-meditating.svg`)
- **Usage**: Tab 3: Active Sit screen, audio playback, timer countdowns.
- **Eyes**: Closed in downward serene curves (`M 22.5 31 Q 29 23 35.5 31`).
- **Mouth**: Subtle, tranquil resting child smile (`M 30 48 Q 42 59 54 48`).
- **Blush**: **ZERO BLUSH** — in deep meditation, the mind and face settle into pure tranquility, equanimity, and stillness (no excitement or blush).
- **Halo**: Multi-layer concentric breathing rings (Inner $130\%$, Outer $155\%$ with dashed flow).
- **Animation**: 9-second deep breathing synchronization with the practitioner's breath.

### 3. Joyful / Pīti Burst (`mascot-joyful.svg`)
- **Usage**: Day completion modal, course finished celebration, milestone achievement, Dāna dedication.
- **Eyes**: Upward smiling happy crescents (`⌒ ⌒`).
- **Mouth**: Warm, sweet smiling curve.
- **Blush**: Elevated ruby-gold blush glow ($0.38$ opacity).
- **Aura**: 7 golden sparkles (`✦` / `✧` in `#F0C870`) radiating outward with gentle flotation.

### 4. 3D Interactive Web Experience (Three.js on Landing Page)
- **Usage**: Landing page hero visual.
- **3D Directional Lighting**: True 3D shader lighting (`MeshStandardMaterial`) with zenith key light from the top-left (`-3.6, 3.6, 4.2`) casting a soft, gentle 3D crescent shadow across the bottom-right.
- **3D Head Turning**: Sphere smoothly tilts on X and Y axes to follow cursor coordinates with damped `lerp` easing.
- **Proximity & Hover Bliss**:
  - When cursor enters the moon face: smoothly morphs into **ultra-cute, peaceful, calming, and charming** blissful state (eyes transition into bliss crescents `⌒ ⌒`, blushes bloom with warm ruby radiance, smile deepens into pure meditative joy, and golden ✦ sparkles twinkle).
  - The custom cursor is automatically hidden on hover so no white orb obscures the facial features.

### 4. Resting / Midnight
- **Usage**: Late-night idle state, between 00:00 and 04:00.
- **Aura**: Subdued dim silver glow (`rgba(200, 216, 192, 0.15)`), slower 12-second breath cycle.

---

## ⚡ 4. Animation Specifications & Mathematical Models

### A. Harmonic Breathing Cycle (9s Sine Wave)
Used for the meditative sitting screen and background ambient washes.
$$\text{Scale}(t) = 1.0 + 0.08 \cdot \sin\left(\frac{2\pi t}{9}\right)$$
$$\text{Opacity}(t) = 0.60 + 0.40 \cdot \sin\left(\frac{2\pi t}{9}\right)$$

```css
@keyframes wash-breathe {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50%      { transform: scale(1.08); opacity: 1.0; }
}
```

---

### B. Eye Tracking & Clamping Vector Math
When the practitioner moves their finger or mouse, the mascot's eyes gently track the position within an organic eye socket boundary.

**Mathematical Formula**:
Let the center of the mascot face be $(X_c, Y_c)$ and pointer position be $(X_p, Y_p)$:
1. Calculate delta vector: $\vec{D} = (X_p - X_c, Y_p - Y_c)$
2. Compute Euclidean distance: $d = \sqrt{D_x^2 + D_y^2}$
3. Clamp maximum translation to $M_{\max} = 1.4\text{px}$:
$$\text{Shift}_x = \frac{D_x}{d} \cdot \min(d \cdot 0.025, 1.4)$$
$$\text{Shift}_y = \frac{D_y}{d} \cdot \min(d \cdot 0.025, 1.4)$$

```javascript
// JavaScript implementation
const dx = e.clientX - fcx;
const dy = e.clientY - fcy;
const dist = Math.sqrt(dx * dx + dy * dy);
const max = 1.4;
const mx = dist > 0 ? (dx / dist) * Math.min(dist * 0.025, max) : 0;
const my = dist > 0 ? (dy / dist) * Math.min(dist * 0.025, max) : 0;
eyes.forEach(eye => eye.style.transform = `translate(${mx}px, ${my}px)`);
```

---

### C. Organic Poisson Micro-Blink Engine
Blinking is randomized between $3.0\text{s}$ and $7.5\text{s}$ to prevent repetitive robotic motion.

```javascript
function blink(face) {
  face.querySelectorAll('.mm-eye').forEach(eye => {
    const base = eye.style.transform || '';
    eye.style.transform = base + ' scaleY(0.08)';
    setTimeout(() => { eye.style.transform = base; }, 110);
  });
}

function scheduleBlink(face) {
  const nextIntervalMs = 3000 + Math.random() * 4500;
  setTimeout(() => {
    blink(face);
    scheduleBlink(face);
  }, nextIntervalMs);
}
```

---

### D. Halo Pulse (4s Cycle)
```css
@keyframes halo-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.14);
    opacity: 0.15;
  }
}
```

---

## 📏 5. Contextual Size Hierarchy

| Context | Render Size ($D$) | Glow Radius | Eye Tracking | Sparkles |
| :--- | :--- | :--- | :--- | :--- |
| **App Bar Navigation Logo** | `38px` | `14px` | Enabled | None |
| **Course & Card Thumbnails** | `40px – 48px` | `18px` | Enabled | None |
| **Step / Day Progress Marker** | `44px` | `16px` | Enabled | On Day Complete |
| **Profile & Dana Impact Hero** | `52px – 56px` | `24px` | Enabled | Subtle Drift |
| **Tab 3: Active Sit Sanctuary** | `180px – 240px` | `60px` | Meditative Mode | Breathing Halo Rings |
| **Footer & Watermark** | `34px` | `10px` | Idle | None |

---

## 📱 6. Mobile Flutter Implementation Blueprint

```dart
import 'dart:math' as math;
import 'package:flutter/material.dart';

class MeditativeMoonMascot extends StatefulWidget {
  final double size;
  final bool isMeditating;
  final bool isJoyful;

  const MeditativeMoonMascot({
    super.key,
    this.size = 180,
    this.isMeditating = false,
    this.isJoyful = false,
  });

  @override
  State<MeditativeMoonMascot> createState() => _MeditativeMoonMascotState();
}

class _MeditativeMoonMascotState extends State<MeditativeMoonMascot>
    with SingleTickerProviderStateMixin {
  late AnimationController _breathController;
  late Animation<double> _breathAnimation;

  @override
  void initState() {
    super.initState();
    _breathController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 9),
    )..repeat(reverse: true);

    _breathAnimation = Tween<double>(begin: 1.0, end: 1.08).animate(
      CurvedAnimation(parent: _breathController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _breathController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _breathAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: widget.isMeditating ? _breathAnimation.value : 1.0,
          child: Container(
            width: widget.size,
            height: widget.size,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: const RadialGradient(
                center: Alignment(-0.28, -0.36),
                radius: 0.68,
                colors: [
                  Color(0xFFFFFFFF), // pure white light
                  Color(0xFFF5FAF3), // radiant silver bright
                  Color(0xFFE4EEE2), // soft silver mid
                  Color(0xFFCAD9C7), // gentle edge
                  Color(0xFFB2C7AF), // outer rim
                ],
                stops: [0.0, 0.25, 0.55, 0.80, 1.0],
              ),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFFFFFFFF).withOpacity(0.45),
                  blurRadius: widget.size * 0.25,
                  spreadRadius: 2,
                ),
                BoxShadow(
                  color: const Color(0xFFC8D8C0).withOpacity(0.25),
                  blurRadius: widget.size * 0.50,
                  spreadRadius: 6,
                ),
              ],
            ),
            child: CustomPaint(
              painter: _MascotFacePainter(
                isMeditating: widget.isMeditating,
                isJoyful: widget.isJoyful,
              ),
            ),
          ),
        );
      },
    );
  }
}

class _MascotFacePainter extends CustomPainter {
  final bool isMeditating;
  final bool isJoyful;

  _MascotFacePainter({required this.isMeditating, required this.isJoyful});

  @override
  void paint(Canvas canvas, Size size) {
    final eyePaint = Paint()
      ..color = const Color(0xFF0D1C10)
      ..style = PaintingStyle.fill;

    final catchlightPaint = Paint()
      ..color = const Color(0xFFFFFFFF).withOpacity(0.95)
      ..style = PaintingStyle.fill;

    final smilePaint = Paint()
      ..color = const Color(0xFF0D1C10)
      ..style = PaintingStyle.stroke
      ..strokeWidth = size.width * 0.024
      ..strokeCap = StrokeCap.round;

    // Blushes (Zero blush when meditating - pure stillness)
    if (!isMeditating) {
      final blushPaint = Paint()
        ..color = (isJoyful ? const Color(0xFFE15F73).withOpacity(0.45) : const Color(0xFFE15F73).withOpacity(0.35))
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3.5);

      canvas.drawOval(
        Rect.fromCenter(
          center: Offset(size.width * 0.33, size.height * 0.53),
          width: size.width * 0.15,
          height: size.height * 0.075,
        ),
        blushPaint,
      );
      canvas.drawOval(
        Rect.fromCenter(
          center: Offset(size.width * 0.67, size.height * 0.53),
          width: size.width * 0.15,
          height: size.height * 0.075,
        ),
        blushPaint,
      );
    }

    // Eyes
    if (isMeditating) {
      final leftPath = Path()
        ..moveTo(size.width * 0.38, size.height * 0.45)
        ..quadraticBezierTo(size.width * 0.42, size.height * 0.49, size.width * 0.46, size.height * 0.45);
      final rightPath = Path()
        ..moveTo(size.width * 0.54, size.height * 0.45)
        ..quadraticBezierTo(size.width * 0.58, size.height * 0.49, size.width * 0.62, size.height * 0.45);
      canvas.drawPath(leftPath, smilePaint);
      canvas.drawPath(rightPath, smilePaint);
    } else if (isJoyful) {
      final leftPath = Path()
        ..moveTo(size.width * 0.38, size.height * 0.47)
        ..quadraticBezierTo(size.width * 0.42, size.height * 0.42, size.width * 0.46, size.height * 0.47);
      final rightPath = Path()
        ..moveTo(size.width * 0.54, size.height * 0.47)
        ..quadraticBezierTo(size.width * 0.58, size.height * 0.42, size.width * 0.62, size.height * 0.47);
      canvas.drawPath(leftPath, smilePaint);
      canvas.drawPath(rightPath, smilePaint);
    } else {
      // Left eye with catchlight
      canvas.drawCircle(Offset(size.width * 0.40, size.height * 0.45), size.width * 0.042, eyePaint);
      canvas.drawCircle(Offset(size.width * 0.388, size.height * 0.438), size.width * 0.013, catchlightPaint);

      // Right eye with catchlight
      canvas.drawCircle(Offset(size.width * 0.60, size.height * 0.45), size.width * 0.042, eyePaint);
      canvas.drawCircle(Offset(size.width * 0.588, size.height * 0.438), size.width * 0.013, catchlightPaint);
    }

    // Smile (Comfortably positioned below mid-face)
    final smilePath = Path()
      ..moveTo(size.width * 0.42, size.height * 0.56)
      ..quadraticBezierTo(size.width * 0.50, size.height * 0.64, size.width * 0.58, size.height * 0.56);
    canvas.drawPath(smilePath, smilePaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
```

---

## 📌 7. Cross-Document Integration
- [`design.md`](./design.md) — Comprehensive brand design tokens, buttons, and CSS variables.
- [`vocabulary.md`](./vocabulary.md) — Official lexicon, Burmese sacred translations, and tone of voice.
- [`content-architecture.md`](./content-architecture.md) — Wireframes and navigation layouts incorporating the moon as light source.
