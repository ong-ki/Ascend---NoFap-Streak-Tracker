/**
 * Zen & Wabi-Sabi Central Design System & Theme
 * Rooted in space (Ma), simplicity (Kanso), and quiet stillness (Seijaku).
 * Pure English language.
 */

export const ZEN_COLORS = {
  // Foundations
  washi: '#F5F1EA',          // Warm off-white washi paper tone
  washiMuted: '#EDE8DE',     // Subtle shoji pane tint
  washiCard: 'rgba(255, 255, 255, 0.62)',
  washiBorder: '#DCD6CA',

  sumi: '#1C1C1E',           // Deep charcoal sumi-ink
  sumiMuted: '#242428',      // Slightly lighter charcoal
  sumiCard: 'rgba(28, 28, 30, 0.65)',
  sumiBorder: 'rgba(255, 255, 255, 0.08)',

  // Muted Accents
  sakura: '#E8B4BC',         // Soft blossom pink
  sakuraMuted: 'rgba(232, 180, 188, 0.15)',
  
  matcha: '#A8B89A',         // Calming green tea
  matchaMuted: 'rgba(168, 184, 154, 0.15)',

  indigo: '#4A5A7A',         // Traditional Japanese indigo
  indigoMuted: 'rgba(74, 90, 122, 0.15)',

  vermilion: '#D9534F',      // Traditional seal red
  vermilionMuted: 'rgba(217, 83, 79, 0.12)',

  kincha: '#C9A66B',         // Antique gold
  kinchaMuted: 'rgba(201, 166, 107, 0.15)',

  // Text
  textLightPrimary: '#2B2A2F',
  textLightSecondary: '#787680',
  textLightFaint: '#A6A4AD',

  textDarkPrimary: '#F2EFEB',
  textDarkSecondary: '#9A98A0',
  textDarkFaint: '#5C5B63',
} as const;

export const ZEN_FONTS = {
  serif: "'Shippori Mincho', 'Noto Serif JP', serif",
  sans: "'Noto Sans JP', 'Inter', sans-serif",
} as const;

export const ZEN_LABELS = {
  today: 'Today',
  stillness: 'Stillness',
  path: 'Path',
  settings: 'Settings',
  day: 'Day',
  continuity: 'Continuity',
  rest: 'Rest',
  breath: 'Breath',
  tea: 'Green Tea',
  walk: 'Quiet Walk',
  water: 'Cool Water',
  mindfulness: 'Mindfulness',
  enso: 'Enso',
} as const;
