import React, { useState } from 'react';
import { useStreak } from './hooks/useStreak';
import { useNotifications } from './hooks/useNotifications';
import { DeviceFrame } from './components/DeviceFrame';
import { HomeScreen } from './screens/HomeScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { UrgeScreen } from './screens/UrgeScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { PinLockModal } from './components/PinLockModal';
import { ExpoProjectViewer } from './components/ExpoProjectViewer';
import { FallingSakura } from './components/FallingSakura';
import { Haptics } from './utils/haptics';
import { Sun, Wind, Compass, Sliders } from 'lucide-react';

type Tab = 'home' | 'urge' | 'progress' | 'settings';

export default function App() {
  const {
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
  } = useStreak();

  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isExpoModalOpen, setIsExpoModalOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(() => data.settings.pinLockEnabled);

  // Smart local notification hook with poetic Zen messages
  const {
    permission,
    requestPermission,
    sendTestNotification,
  } = useNotifications(
    data.settings.notificationsEnabled,
    data.settings.reminderTime,
    duration.days
  );

  // Light washi mode is default in Wabi-sabi
  const isLight = data.settings.theme === 'light';

  const handleTabChange = (tab: Tab) => {
    Haptics.light();
    setActiveTab(tab);
  };

  return (
    <div
      className={`min-h-screen relative overflow-x-hidden transition-colors duration-700 ${
        isLight
          ? 'bg-[#F5F1EA] text-[#2B2A2F] washi-texture'
          : 'bg-[#1C1C1E] text-[#F2EFEB] sumi-texture'
      }`}
    >
      {/* Delicate Slowly Falling Sakura Petals */}
      <FallingSakura />

      {/* Soft Ambient Blurred Gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[140px] opacity-40 transition-colors duration-1000 ${
            isLight ? 'bg-[#E8B4BC]' : 'bg-[#4A5A7A]'
          }`}
        />
        <div
          className={`absolute top-1/2 -right-24 w-80 h-80 rounded-full blur-[140px] opacity-35 transition-colors duration-1000 ${
            isLight ? 'bg-[#C9A66B]' : 'bg-[#A8B89A]'
          }`}
        />
      </div>

      {/* Optional PIN Lock */}
      {isLocked && (
        <PinLockModal
          correctPin={data.settings.pinCode}
          onUnlock={() => setIsLocked(false)}
          isLight={isLight}
        />
      )}

      {/* Main Container */}
      <DeviceFrame
        viewMode={data.settings.viewMode}
        onToggleViewMode={() =>
          updateSettings({
            viewMode: data.settings.viewMode === 'mobile-frame' ? 'responsive' : 'mobile-frame',
          })
        }
        isLight={isLight}
      >
        <div className="relative z-10 min-h-full">
          {/* Active Screen Transition */}
          <div className="transition-opacity duration-500 ease-out">
            {activeTab === 'home' && (
              <HomeScreen
                data={data}
                duration={duration}
                milestoneInfo={milestoneInfo}
                hasCheckedInToday={hasCheckedInToday}
                onCheckIn={checkInToday}
                onRelapse={recordRelapse}
                onOpenSOS={() => setActiveTab('urge')}
                onNavigateTab={(tab) => handleTabChange(tab)}
                isLight={isLight}
              />
            )}

            {activeTab === 'urge' && (
              <UrgeScreen
                onUrgeResisted={recordUrgeResisted}
                isLight={isLight}
              />
            )}

            {activeTab === 'progress' && (
              <ProgressScreen
                data={data}
                currentDays={duration.days}
                isLight={isLight}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsScreen
                settings={data.settings}
                onUpdateSettings={updateSettings}
                onResetData={resetAllData}
                onExportData={exportDataJson}
                onImportData={importDataJson}
                onSendTestNotification={sendTestNotification}
                onRequestNotificationPermission={requestPermission}
                onOpenExpoModal={() => setIsExpoModalOpen(true)}
                isLight={isLight}
              />
            )}
          </div>

          {/* Shoji Rice-Paper Bottom Tab Navigation Bar with 4 Thin Icons & Kanji */}
          <div className="fixed sm:absolute bottom-3 left-4 right-4 z-40">
            <nav
              className={`max-w-xs mx-auto rounded-[22px] border px-4 py-2 flex items-center justify-between transition-all duration-500 ${
                isLight
                  ? 'bg-white/70 border-[#DCD6CA]/70 shadow-[0_6px_20px_rgba(43,42,47,0.04)] backdrop-blur-md'
                  : 'bg-[#222226]/75 border-white/10 shadow-[0_6px_20px_rgba(0,0,0,0.35)] backdrop-blur-md'
              }`}
            >
              {/* Home ("Today") */}
              <button
                onClick={() => handleTabChange('home')}
                className={`flex-1 py-1 flex flex-col items-center justify-center transition-all ${
                  activeTab === 'home'
                    ? 'text-[#D9534F]'
                    : isLight
                    ? 'text-[#787680] hover:text-[#2B2A2F]'
                    : 'text-[#9A98A0] hover:text-[#F2EFEB]'
                }`}
              >
                <Sun className="w-4 h-4 stroke-[1.2]" />
                <span className="font-serif-jp text-[10px] mt-0.5 tracking-wider">
                  Today
                </span>
              </button>

              {/* Urge Help ("Stillness") */}
              <button
                onClick={() => handleTabChange('urge')}
                className={`flex-1 py-1 flex flex-col items-center justify-center transition-all ${
                  activeTab === 'urge'
                    ? 'text-[#D9534F]'
                    : isLight
                    ? 'text-[#787680] hover:text-[#2B2A2F]'
                    : 'text-[#9A98A0] hover:text-[#F2EFEB]'
                }`}
              >
                <Wind className="w-4 h-4 stroke-[1.2]" />
                <span className="font-serif-jp text-[10px] mt-0.5 tracking-wider">
                  Stillness
                </span>
              </button>

              {/* Progress ("Path") */}
              <button
                onClick={() => handleTabChange('progress')}
                className={`flex-1 py-1 flex flex-col items-center justify-center transition-all ${
                  activeTab === 'progress'
                    ? 'text-[#D9534F]'
                    : isLight
                    ? 'text-[#787680] hover:text-[#2B2A2F]'
                    : 'text-[#9A98A0] hover:text-[#F2EFEB]'
                }`}
              >
                <Compass className="w-4 h-4 stroke-[1.2]" />
                <span className="font-serif-jp text-[10px] mt-0.5 tracking-wider">
                  Path
                </span>
              </button>

              {/* Settings ("Settings") */}
              <button
                onClick={() => handleTabChange('settings')}
                className={`flex-1 py-1 flex flex-col items-center justify-center transition-all ${
                  activeTab === 'settings'
                    ? 'text-[#D9534F]'
                    : isLight
                    ? 'text-[#787680] hover:text-[#2B2A2F]'
                    : 'text-[#9A98A0] hover:text-[#F2EFEB]'
                }`}
              >
                <Sliders className="w-4 h-4 stroke-[1.2]" />
                <span className="font-serif-jp text-[10px] mt-0.5 tracking-wider">
                  Settings
                </span>
              </button>
            </nav>
          </div>
        </div>
      </DeviceFrame>

      {/* Expo Codebase Modal */}
      <ExpoProjectViewer
        isOpen={isExpoModalOpen}
        onClose={() => setIsExpoModalOpen(false)}
        isLight={isLight}
      />
    </div>
  );
}
