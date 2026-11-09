# Enso — Zen Streak Tracker (React Native Expo & Web)

A minimal, calm, Zen-inspired streak-tracking mobile application. Built with **React Native (Expo)**, **TypeScript**, **React Navigation**, and **Tailwind CSS**. All data is stored 100% locally on the device with zero logins, zero backend, and complete privacy.

Designed to feel like a quiet sanctuary: peaceful, spacious, and uncluttered.

---

## Design Philosophy: Space, Simplicity, Stillness

- **Generous Negative Space:** Generous breathing room on every screen. One clear focus per view.
- **Simplicity:** No cluttered widgets, no heavy drop-shadows, and no loud confetti effects.
- **Stillness:** Gentle, slow animations (600–1200ms easing), calm transitions, and quiet acoustic cues.
- **Shoji Rice-Paper Panels:** Soft frosted-glass cards with low blur, 40–60% opacity, and delicate 1px hairline borders.
- **Calm Palette:**
  - **Washi Paper:** Warm off-white `#F5F1EA` light background with faint grain texture.
  - **Sumi Ink:** Deep charcoal `#1C1C1E` dark mode background.
  - **Blossom Pink:** `#E8B4BC`
  - **Matcha Green:** `#A8B89A` (used for clean days in the calendar)
  - **Indigo:** `#4A5A7A`
  - **Vermilion Red:** `#D9534F` (used sparingly for seal stamps & accents)
  - **Antique Gold:** `#C9A66B`
- **Calligraphic Elements:**
  - **Enso Ring:** Hand-drawn brush ring displaying progress toward the next milestone.
  - **Seal Stamps:** Traditional red square seal stamped onto unlocked milestones with day badges (1D, 7D, 30D, 90D, etc.).
  - **Falling Petals:** 4 faint, slowly drifting blossom petals floating gently across the background.

---

## Core Features

### 1. Home Screen ("Today")
- Centered large streak counter in an elegant thin serif font, with "days clean" beneath it.
- An enso ring progress circle with calligraphic brush-stroke styling toward the next milestone (1, 3, 7, 14, 30, 60, 90, 180, 365 days).
- Single quiet outlined **"Stayed Mindful Today"** check-in button with a soft expanding ink-ripple animation (no confetti).
- Single subtle line of stats: `Best: 12d · Total: 45d · Resets: 2`.
- A quiet **"A new beginning"** text button with a compassionate, shame-free confirmation dialog ("Every day is a fresh start.").

### 2. Urge Help ("Stillness")
- A dedicated quiet sanctuary with a slow **4-4-6 breathing circle** (Inhale 4s / Hold 4s / Exhale 6s) on a serene background.
- Zen quotes and reflections from a random pool (Matsuo Basho, Shunryu Suzuki, Sen no Rikyu).
- 4 quiet suggestions:
  - Walk outside in fresh air
  - Cool water splashed upon your face
  - Deep abdominal breathing into your center
  - Warm cup of green tea held in both hands

### 3. Progress ("Path")
- Minimal vertical timeline of 9 milestones (1, 3, 7, 14, 30, 60, 90, 180, 365 days).
- Unlocked milestones feature an authentic vermilion red seal stamp (1D, 3D, 7D, 14D, 30D, 60D, 90D, 180D, 365D).
- Clean monthly calendar with small minimal dots:
  - **Matcha Green dots (`#A8B89A`)** for clean days
  - **Soft Red dots (`#D9534F`)** for reset days

### 4. Smart Reminders (Local Notifications)
- User-chosen reminder time.
- 5 poetic streak stages with 5+ gentle prompts each:
  - **Days 1–3 (Begin Softly):** "Begin softly. One breath, one day at a time."
  - **Days 4–7 (Building Rhythm):** "The water carves the stone not through violence, but through soft persistence."
  - **Days 8–30 (Discipline & Focus):** "Like an ancient pine on a cliffside, your roots grow deeper each day."
  - **Days 31–90 (Inner Strength & Clarity):** "The clear mirror reflects everything and clings to nothing."
  - **90+ Days (Mastery & Peace):** "Empty your cup so that it may be filled with eternal peace."
- Milestone notifications at 3, 7, 14, 30, 60, 90, 180, and 365 days.

### 5. Settings ("Settings")
- Simple list with generous spacing.
- Washi Paper light mode & Sumi Ink dark mode switch.
- Reminder time picker and instant test notification trigger.
- Optional 4-digit privacy PIN lock.
- Clean data reset and backup.
- Built-in **Expo Full Source Viewer** with copyable native components.

---

## Project Structure

```
├── README.md                      # Project guide & Expo instructions
├── index.html                     # HTML5 shell with Google Fonts
├── metadata.json                  # AI Studio configuration
├── package.json                   # Web runner dependencies
├── tsconfig.json                  # TypeScript configuration
└── src/
    ├── App.tsx                    # Main navigation shell with 4 English tabs & falling petals
    ├── main.tsx                   # React client bootstrap
    ├── index.css                  # Washi texture, shoji styles, and ink ripple animations
    ├── types/
    │   └── index.ts               # Core data models
    ├── constants/
    │   ├── theme.ts               # Centralized color palette, fonts & English labels
    │   ├── milestones.ts          # 9 milestones with seal stamps and philosophies
    │   ├── quotes.ts              # Zen reflections
    │   └── reminders.ts           # 5-stage poetic reminder messages
    ├── hooks/
    │   ├── useStreak.ts           # Streak duration timer, check-in, and localStorage persistence
    │   └── useNotifications.ts    # Smart local reminder scheduler
    ├── utils/
    │   ├── date.ts                # Streak calculations & milestone math
    │   ├── haptics.ts             # Light haptic feedback
    │   └── sound.ts               # Peaceful singing bowl / meditation chime
    ├── components/
    │   ├── GlassCard.tsx          # Frosted shoji rice paper card container
    │   ├── GradientText.tsx       # Soft blossom to gold typography
    │   ├── EnsoRing.tsx           # Calligraphic hand-drawn Enso progress ring
    │   ├── HankoStamp.tsx         # Vermilion red square seal stamp
    │   ├── FallingSakura.tsx      # Faint drifting blossom petals
    │   ├── StreakCounter.tsx      # Thin serif days counter & live H:M:S ticking clock
    │   ├── CheckInButton.tsx      # Outlined minimal check-in with soft ink ripple
    │   ├── ZenStatsLine.tsx       # Single subtle line of stats
    │   ├── RelapseModal.tsx       # Compassionate fresh beginning modal
    │   ├── CalendarView.tsx       # Clean month grid with matcha & red dots
    │   ├── MilestoneTimeline.tsx  # Vertical timeline with seal stamps
    │   ├── PinLockModal.tsx       # 4-digit privacy keypad
    │   ├── DeviceFrame.tsx        # iPhone 16 Pro mockup frame with washi background
    │   └── ExpoProjectViewer.tsx  # In-app Expo code browser
    └── screens/
        ├── HomeScreen.tsx         # "Today"
        ├── UrgeScreen.tsx         # "Stillness"
        ├── ProgressScreen.tsx     # "Path"
        └── SettingsScreen.tsx     # "Settings"
```

---

## How to Run with `npx expo start` (Mobile)

To run as a native mobile app on your phone:

### 1. Initialize Expo Project
```bash
npx create-expo-app enso-app -t expo-template-blank-typescript
cd enso-app
```

### 2. Install Dependencies
```bash
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage expo-notifications expo-linear-gradient expo-blur expo-haptics expo-font @expo-google-fonts/shippori-mincho @expo-google-fonts/noto-sans-jp react-native-reanimated react-native-svg lucide-react-native
```

### 3. Copy Native Files
Copy the files directly from the in-app **"Expo (React Native) Full Source"** viewer (accessible in Settings → View Files) or `src/`:
- `App.tsx`
- `src/components/EnsoRing.tsx` (using `react-native-svg`)
- `src/components/HankoStamp.tsx` (using traditional vermilion styling)
- `src/constants/theme.ts`

### 4. Start Expo
```bash
npx expo start
```
- Press `i` to launch in the iOS Simulator.
- Press `a` to launch in the Android Emulator.
- Or scan the QR code with **Expo Go** on your physical phone!

---

## Web Development Server

The web interactive simulation is running on port 3000:
```bash
npm run dev
```
To verify compilation:
```bash
npm run build
```
