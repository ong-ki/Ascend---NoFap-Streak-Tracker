export type ThemeMode = 'dark' | 'light' | 'amoled';

export interface Milestone {
  days: number;
  title: string;
  kanji?: string;
  tagline: string;
  description: string;
  icon?: string;
  hankoSeal?: string;
  benefit?: string;
  philosophy?: string;
}

export interface RelapseRecord {
  id: string;
  timestamp: number; // ms
  streakDaysAtRelapse: number;
  trigger?: string;
  reflection?: string;
}

export interface UrgeRecord {
  id: string;
  timestamp: number;
  durationMinutes?: number;
  actionTaken?: string;
  note?: string;
}

export interface StreakData {
  startDate: string; // ISO string of streak start
  bestStreakDays: number;
  totalCleanDays: number;
  checkInDates: string[]; // YYYY-MM-DD format
  relapses: RelapseRecord[];
  urgesResisted: number;
  urgeLogs: UrgeRecord[];
  settings: AppSettings;
}

export interface AppSettings {
  theme: ThemeMode;
  notificationsEnabled: boolean;
  reminderTime: string; // "HH:MM" 24h
  hapticsEnabled: boolean;
  soundEnabled: boolean;
  pinLockEnabled: boolean;
  pinCode: string;
  viewMode: 'mobile-frame' | 'responsive';
}

export interface StageMessages {
  stage: string;
  dayRange: [number, number];
  messages: string[];
}
