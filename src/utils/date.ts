import { MILESTONES } from '../constants/milestones';
import { Milestone } from '../types';

export interface StreakDuration {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
}

export function calculateStreakDuration(startDateIso: string): StreakDuration {
  const start = new Date(startDateIso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - start);

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMilliseconds: diff,
  };
}

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateToLocal(dateString: string): string {
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return dateString;
  } catch {
    return dateString;
  }
}

export interface NextMilestoneInfo {
  nextMilestone: Milestone;
  prevMilestoneDays: number;
  daysRemaining: number;
  progressPercent: number; // 0 to 100
  isMaxTierReached: boolean;
}

export function getNextMilestoneInfo(currentDays: number): NextMilestoneInfo {
  // Find first milestone where days > currentDays
  const next = MILESTONES.find((m) => m.days > currentDays);

  if (!next) {
    const maxMilestone = MILESTONES[MILESTONES.length - 1];
    return {
      nextMilestone: maxMilestone,
      prevMilestoneDays: MILESTONES[MILESTONES.length - 2]?.days || 180,
      daysRemaining: 0,
      progressPercent: 100,
      isMaxTierReached: true,
    };
  }

  // Find previous milestone threshold
  const prevIdx = MILESTONES.findIndex((m) => m.days === next.days) - 1;
  const prevDays = prevIdx >= 0 ? MILESTONES[prevIdx].days : 0;

  const span = next.days - prevDays;
  const progressInSpan = Math.max(0, currentDays - prevDays);
  const progressPercent = Math.min(100, Math.max(0, Math.round((progressInSpan / span) * 100)));

  return {
    nextMilestone: next,
    prevMilestoneDays: prevDays,
    daysRemaining: Math.max(0, next.days - currentDays),
    progressPercent,
    isMaxTierReached: false,
  };
}
