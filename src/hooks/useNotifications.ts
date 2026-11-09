import { useState, useEffect, useCallback } from 'react';
import { getZenStageMessage, ZEN_MILESTONE_NOTIFICATIONS } from '../constants/reminders';

export function useNotifications(enabled: boolean, reminderTime: string, currentDays: number) {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [lastNotificationDate, setLastNotificationDate] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const res = await Notification.requestPermission();
        setPermission(res);
        return res === 'granted';
      } catch (e) {
        console.error('Notification permission error', e);
        return false;
      }
    }
    return false;
  }, []);

  // Send a notification
  const sendNotification = useCallback((title: string, body: string) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          silent: false,
        });
      } catch (e) {
        console.error('Failed to trigger notification', e);
      }
    }
  }, []);

  // Trigger test notification
  const sendTestNotification = useCallback(() => {
    const { stage, message } = getZenStageMessage(currentDays);
    sendNotification(`Enso · ${stage}`, message);
  }, [currentDays, sendNotification]);

  // Daily reminder checker
  useEffect(() => {
    if (!enabled || permission !== 'granted') return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;

      const todayStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

      if (currentTimeStr === reminderTime && lastNotificationDate !== todayStr) {
        // Send daily poetic reminder
        const { stage, message } = getZenStageMessage(currentDays);
        sendNotification(`Daily Reflection · Day ${currentDays} (${stage})`, message);
        setLastNotificationDate(todayStr);

        // Check if milestone today
        if (ZEN_MILESTONE_NOTIFICATIONS[currentDays]) {
          setTimeout(() => {
            sendNotification('Milestone Achieved', ZEN_MILESTONE_NOTIFICATIONS[currentDays]);
          }, 3000);
        }
      }
    }, 30000); // check every 30 seconds

    return () => clearInterval(interval);
  }, [enabled, permission, reminderTime, currentDays, lastNotificationDate, sendNotification]);

  return {
    permission,
    requestPermission,
    sendNotification,
    sendTestNotification,
  };
}
