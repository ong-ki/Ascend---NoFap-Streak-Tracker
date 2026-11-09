import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { StreakCounter } from '../components/StreakCounter';
import { EnsoRing } from '../components/EnsoRing';
import { CheckInButton } from '../components/CheckInButton';
import { ZenStatsLine } from '../components/ZenStatsLine';
import { RelapseModal } from '../components/RelapseModal';
import { StreakDuration, NextMilestoneInfo } from '../utils/date';
import { StreakData } from '../types';
import { Haptics } from '../utils/haptics';

interface HomeScreenProps {
  data: StreakData;
  duration: StreakDuration;
  milestoneInfo: NextMilestoneInfo;
  hasCheckedInToday: boolean;
  onCheckIn: () => void;
  onRelapse: (trigger?: string, reflection?: string) => void;
  onOpenSOS: () => void;
  onNavigateTab: (tab: 'progress' | 'urge' | 'settings') => void;
  isLight?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  data,
  duration,
  milestoneInfo,
  hasCheckedInToday,
  onCheckIn,
  onRelapse,
  isLight = true,
}) => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-between min-h-full py-4 pb-28 space-y-6">
      {/* Top Header with Ma (Negative Space) */}
      <div className="w-full text-center pt-2">
        <span
          className={`text-[11px] font-serif-jp tracking-[0.3em] uppercase ${
            isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
          }`}
        >
          TODAY
        </span>
        <h1
          className={`text-xl font-serif-jp tracking-wider mt-0.5 ${
            isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
          }`}
        >
          The Present Day
        </h1>
      </div>

      {/* Primary Focus: Large Streak Counter in Thin Serif */}
      <div className="my-2">
        <StreakCounter duration={duration} isLight={isLight} />
      </div>

      {/* Progress Enso Ring */}
      <div className="my-1">
        <EnsoRing
          milestoneInfo={milestoneInfo}
          currentDays={duration.days}
          size={270}
          isLight={isLight}
        />
      </div>

      {/* Single Subtle Stats Line */}
      <div className="w-full px-4">
        <ZenStatsLine
          bestStreakDays={data.bestStreakDays}
          totalCleanDays={data.totalCleanDays}
          resetCount={data.relapses.length}
          isLight={isLight}
        />
      </div>

      {/* Action Zone: Quiet Check-in & Subtle Reset */}
      <div className="w-full max-w-xs space-y-3 pt-2">
        <CheckInButton
          hasCheckedInToday={hasCheckedInToday}
          onCheckIn={onCheckIn}
          isLight={isLight}
        />

        {/* Small quiet Reset text link */}
        <div className="text-center">
          <button
            onClick={() => {
              Haptics.light();
              setIsResetModalOpen(true);
            }}
            className={`text-[11px] font-serif-jp tracking-wider transition-colors hover:underline ${
              isLight ? 'text-[#A6A4AD] hover:text-[#D9534F]' : 'text-[#5C5B63] hover:text-[#D9534F]'
            }`}
          >
            A new beginning
          </button>
        </div>
      </div>

      {/* Gentle Reset Dialog */}
      <RelapseModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmRelapse={onRelapse}
        currentStreakDays={duration.days}
        isLight={isLight}
      />
    </div>
  );
};
