import { useState, useEffect, useCallback, useMemo } from 'react';
import { StreakData, AppSettings, RelapseRecord, UrgeRecord } from '../types';
import { calculateStreakDuration, getTodayDateString, getNextMilestoneInfo, StreakDuration } from '../utils/date';
import { Haptics } from '../utils/haptics';
import { SoundPlayer } from '../utils/sound';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'ascend_nofap_streak_data_v1';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  notificationsEnabled: true,
  reminderTime: '21:00',
  hapticsEnabled: true,
  soundEnabled: true,
  pinLockEnabled: false,
  pinCode: '',
  viewMode: 'mobile-frame',
};

// Initial default state for new users
function getInitialData(): StreakData {
  if (typeof window === 'undefined') {
    return {
      startDate: new Date().toISOString(),
      bestStreakDays: 0,
      totalCleanDays: 0,
      checkInDates: [],
      relapses: [],
      urgesResisted: 0,
      urgeLogs: [],
      settings: DEFAULT_SETTINGS,
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...parsed,
        settings: {
          ...DEFAULT_SETTINGS,
          ...(parsed.settings || {}),
        },
      };
    }
  } catch (e) {
    console.error('Failed to parse streak data from local storage', e);
  }

  // Default: start now
  const now = new Date();
  return {
    startDate: now.toISOString(),
    bestStreakDays: 0,
    totalCleanDays: 0,
    checkInDates: [],
    relapses: [],
    urgesResisted: 0,
    urgeLogs: [],
    settings: DEFAULT_SETTINGS,
  };
}

export function useStreak() {
  const [data, setData] = useState<StreakData>(getInitialData);
  const [duration, setDuration] = useState<StreakDuration>(() => calculateStreakDuration(data.startDate));

  // Sync to local storage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [data]);

  // Live ticking counter every second
  useEffect(() => {
    // Initial compute
    setDuration(calculateStreakDuration(data.startDate));

    const interval = setInterval(() => {
      const newDur = calculateStreakDuration(data.startDate);
      setDuration(newDur);

      // Check if best streak needs updating
      if (newDur.days > data.bestStreakDays) {
        setData((prev) => ({
          ...prev,
          bestStreakDays: newDur.days,
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data.startDate, data.bestStreakDays]);

  const todayStr = getTodayDateString();
  const hasCheckedInToday = useMemo(() => {
    return data.checkInDates.includes(todayStr);
  }, [data.checkInDates, todayStr]);

  const milestoneInfo = useMemo(() => {
    return getNextMilestoneInfo(duration.days);
  }, [duration.days]);

  // Daily quiet check-in (Very light haptic feedback, soft ink ripple, no confetti)
  const checkInToday = useCallback(() => {
    if (hasCheckedInToday) return;

    if (data.settings.hapticsEnabled) {
      Haptics.light();
    }
    if (data.settings.soundEnabled) {
      SoundPlayer.playSuccessChime();
    }

    setData((prev) => {
      const newCheckIns = [...prev.checkInDates, todayStr];
      const newTotal = prev.totalCleanDays + 1;
      return {
        ...prev,
        checkInDates: newCheckIns,
        totalCleanDays: newTotal,
      };
    });
  }, [hasCheckedInToday, todayStr, data.settings.hapticsEnabled, data.settings.soundEnabled]);

  // Supportive relapse handler
  const recordRelapse = useCallback((trigger = '', reflection = '') => {
    if (data.settings.hapticsEnabled) {
      Haptics.warning();
    }

    const currentDays = duration.days;
    const relapseRecord: RelapseRecord = {
      id: `relapse_${Date.now()}`,
      timestamp: Date.now(),
      streakDaysAtRelapse: currentDays,
      trigger,
      reflection,
    };

    const newStartDate = new Date().toISOString();

    setData((prev) => {
      const updatedBest = Math.max(prev.bestStreakDays, currentDays);
      return {
        ...prev,
        startDate: newStartDate,
        bestStreakDays: updatedBest,
        relapses: [relapseRecord, ...prev.relapses],
      };
    });
  }, [data.settings.hapticsEnabled, duration.days]);

  // SOS Urge resisted handler
  const recordUrgeResisted = useCallback((actionTaken = '', note = '') => {
    if (data.settings.hapticsEnabled) {
      Haptics.light();
    }
    if (data.settings.soundEnabled) {
      SoundPlayer.playSuccessChime();
    }

    const urgeRecord: UrgeRecord = {
      id: `urge_${Date.now()}`,
      timestamp: Date.now(),
      actionTaken,
      note,
    };

    setData((prev) => ({
      ...prev,
      urgesResisted: prev.urgesResisted + 1,
      urgeLogs: [urgeRecord, ...prev.urgeLogs],
    }));
  }, [data.settings.hapticsEnabled, data.settings.soundEnabled]);

  // Adjust streak start date (e.g. for users importing an existing streak)
  const setCustomStartDate = useCallback((dateIso: string) => {
    setData((prev) => ({
      ...prev,
      startDate: dateIso,
    }));
  }, []);

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings,
      },
    }));
  }, []);

  // Reset all data
  const resetAllData = useCallback(() => {
    const fresh = {
      startDate: new Date().toISOString(),
      bestStreakDays: 0,
      totalCleanDays: 0,
      checkInDates: [],
      relapses: [],
      urgesResisted: 0,
      urgeLogs: [],
      settings: DEFAULT_SETTINGS,
    };
    setData(fresh);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Export & Import
  const exportDataJson = useCallback(() => {
    return JSON.stringify(data, null, 2);
  }, [data]);

  const importDataJson = useCallback((jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.startDate) {
        setData(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  return {
    data,
    duration,
    hasCheckedInToday,
    milestoneInfo,
    checkInToday,
    recordRelapse,
    recordUrgeResisted,
    setCustomStartDate,
    updateSettings,
    resetAllData,
    exportDataJson,
    importDataJson,
  };
}
