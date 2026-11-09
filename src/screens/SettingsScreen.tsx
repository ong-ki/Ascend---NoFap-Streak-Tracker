import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { AppSettings, ThemeMode } from '../types';
import { Haptics } from '../utils/haptics';
import { Bell, Clock, Moon, Sun, Lock, RotateCcw, Code, Download, Upload } from 'lucide-react';

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  onResetData: () => void;
  onExportData: () => string;
  onImportData: (jsonStr: string) => boolean;
  onSendTestNotification: () => void;
  onRequestNotificationPermission: () => Promise<boolean>;
  onOpenExpoModal: () => void;
  isLight?: boolean;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  onResetData,
  onExportData,
  onImportData,
  onSendTestNotification,
  onRequestNotificationPermission,
  onOpenExpoModal,
  isLight = true,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');

  const handleTogglePin = () => {
    if (settings.pinLockEnabled) {
      onUpdateSettings({ pinLockEnabled: false, pinCode: '' });
      Haptics.light();
    } else {
      setShowPinModal(true);
    }
  };

  const handleSavePin = () => {
    if (pinInput.length === 4) {
      onUpdateSettings({ pinLockEnabled: true, pinCode: pinInput });
      setShowPinModal(false);
      setPinInput('');
      Haptics.light();
    }
  };

  return (
    <div className="flex flex-col min-h-full py-4 pb-28 space-y-6">
      {/* Header */}
      <div className="text-center pt-2">
        <span
          className={`text-[11px] font-serif-jp tracking-[0.3em] uppercase ${
            isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
          }`}
        >
          SETTINGS
        </span>
        <h1
          className={`text-xl font-serif-jp tracking-wider mt-0.5 ${
            isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
          }`}
        >
          Quiet Preferences
        </h1>
      </div>

      {/* Very Simple List with Plenty of Spacing */}
      <div className="w-full space-y-3">
        {/* Appearance Theme */}
        <GlassCard isLight={isLight} className="p-4 space-y-3 border-[#DCD6CA] dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-serif-jp tracking-wider text-[#D9534F] block">
                THEME
              </span>
              <span className={`text-xs sm:text-sm font-serif-jp ${isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'}`}>
                Paper & Ink Tone
              </span>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-[12px] border border-[#DCD6CA] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
              <button
                onClick={() => {
                  Haptics.light();
                  onUpdateSettings({ theme: 'light' });
                }}
                className={`px-3 py-1 rounded-[8px] text-xs font-serif-jp flex items-center gap-1.5 transition-all ${
                  settings.theme === 'light'
                    ? 'bg-white text-[#2B2A2F] shadow-sm'
                    : 'text-[#787680]'
                }`}
              >
                <Sun className="w-3.5 h-3.5 stroke-[1.2]" />
                <span>Washi Paper</span>
              </button>

              <button
                onClick={() => {
                  Haptics.light();
                  onUpdateSettings({ theme: 'dark' });
                }}
                className={`px-3 py-1 rounded-[8px] text-xs font-serif-jp flex items-center gap-1.5 transition-all ${
                  settings.theme === 'dark'
                    ? 'bg-[#2A2A2D] text-[#F2EFEB] shadow-sm'
                    : 'text-[#9A98A0]'
                }`}
              >
                <Moon className="w-3.5 h-3.5 stroke-[1.2]" />
                <span>Sumi Ink</span>
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Daily Reminders */}
        <GlassCard isLight={isLight} className="p-4 space-y-3 border-[#DCD6CA] dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-serif-jp tracking-wider text-[#D9534F] block">
                REMINDERS
              </span>
              <span className={`text-xs sm:text-sm font-serif-jp ${isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'}`}>
                Daily Poetic Notification
              </span>
            </div>

            <button
              onClick={async () => {
                const nextVal = !settings.notificationsEnabled;
                if (nextVal) await onRequestNotificationPermission();
                onUpdateSettings({ notificationsEnabled: nextVal });
                Haptics.light();
              }}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                settings.notificationsEnabled ? 'bg-[#A8B89A]' : 'bg-stone-300 dark:bg-stone-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                  settings.notificationsEnabled ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Time Picker */}
          <div className="flex items-center justify-between pt-2 border-t border-[#DCD6CA]/40 dark:border-white/5">
            <span className={`text-xs font-serif-jp ${isLight ? 'text-[#787680]' : 'text-[#9A98A0]'}`}>
              Reminder Moment
            </span>
            <input
              type="time"
              value={settings.reminderTime}
              onChange={(e) => onUpdateSettings({ reminderTime: e.target.value })}
              className={`px-2.5 py-1 rounded-[8px] border text-xs font-mono ${
                isLight
                  ? 'bg-white/80 border-[#DCD6CA] text-[#2B2A2F]'
                  : 'bg-white/5 border-white/10 text-[#F2EFEB]'
              }`}
            />
          </div>

          <button
            onClick={() => {
              Haptics.light();
              onSendTestNotification();
            }}
            className="w-full py-2 rounded-[10px] border border-[#DCD6CA] dark:border-white/10 text-[11px] font-serif-jp hover:border-[#A8B89A] transition-colors"
          >
            Send Test Reflection
          </button>
        </GlassCard>

        {/* Optional PIN Lock */}
        <GlassCard isLight={isLight} className="p-4 space-y-2 border-[#DCD6CA] dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-serif-jp tracking-wider text-[#D9534F] block">
                PRIVACY
              </span>
              <span className={`text-xs sm:text-sm font-serif-jp ${isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'}`}>
                4-Digit Privacy PIN Lock
              </span>
            </div>

            <button
              onClick={handleTogglePin}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                settings.pinLockEnabled ? 'bg-[#A8B89A]' : 'bg-stone-300 dark:bg-stone-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                  settings.pinLockEnabled ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </GlassCard>

        {/* View Expo Codebase */}
        <GlassCard
          isLight={isLight}
          onClick={onOpenExpoModal}
          className="p-4 cursor-pointer hover:border-[#C9A66B]/60 transition-colors border-[#DCD6CA] dark:border-white/10 flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-serif-jp tracking-wider text-[#D9534F] block">
              CODEBASE
            </span>
            <span className={`text-xs sm:text-sm font-serif-jp ${isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'}`}>
              Expo (React Native) Full Source
            </span>
          </div>
          <span className="text-xs font-serif-jp text-[#C9A66B] px-2.5 py-1 rounded-[8px] border border-[#C9A66B]/30">
            View Files
          </span>
        </GlassCard>

        {/* Data Reset */}
        <GlassCard isLight={isLight} className="p-4 border-[#DCD6CA] dark:border-white/10">
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full text-center py-2 text-xs font-serif-jp text-[#D9534F] hover:underline"
            >
              Reset All History
            </button>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-xs font-serif-jp text-[#D9534F]">
                Are you sure? This will gently clear your local log.
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1 rounded-[8px] border border-stone-300 text-xs font-serif-jp"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onResetData();
                    setShowResetConfirm(false);
                    Haptics.light();
                  }}
                  className="px-3 py-1 rounded-[8px] bg-[#D9534F] text-white text-xs font-serif-jp"
                >
                  Clear Data
                </button>
              </div>
            </div>
          )}
        </GlassCard>
      </div>

      {/* Set PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <GlassCard isLight={isLight} className="p-6 max-w-xs w-full text-center">
            <h3 className="text-sm font-serif-jp mb-1">Set 4-Digit PIN</h3>
            <p className="text-xs opacity-60 font-sans mb-4">Choose a code for privacy:</p>
            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
              className="w-32 mx-auto text-center text-xl tracking-[0.4em] py-1.5 rounded-[10px] border border-stone-300 dark:border-white/10 bg-transparent font-mono mb-4 focus:outline-none focus:border-[#C9A66B]"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowPinModal(false);
                  setPinInput('');
                }}
                className="flex-1 py-1.5 rounded-[10px] text-xs font-serif-jp border border-stone-300"
              >
                Cancel
              </button>
              <button
                disabled={pinInput.length !== 4}
                onClick={handleSavePin}
                className="flex-1 py-1.5 rounded-[10px] text-xs font-serif-jp bg-[#D9534F] text-white disabled:opacity-40"
              >
                Save
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
