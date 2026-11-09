import React, { useState } from 'react';
import { MilestoneTimeline } from '../components/MilestoneTimeline';
import { CalendarView } from '../components/CalendarView';
import { StreakData } from '../types';
import { Haptics } from '../utils/haptics';

interface ProgressScreenProps {
  data: StreakData;
  currentDays: number;
  isLight?: boolean;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  data,
  currentDays,
  isLight = true,
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'calendar'>('timeline');

  return (
    <div className="flex flex-col min-h-full py-4 pb-28 space-y-6">
      {/* Header */}
      <div className="text-center pt-2">
        <span
          className={`text-[11px] font-serif-jp tracking-[0.3em] uppercase ${
            isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
          }`}
        >
          THE PATH
        </span>
        <h1
          className={`text-xl font-serif-jp tracking-wider mt-0.5 ${
            isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
          }`}
        >
          Progress & Continuity
        </h1>
      </div>

      {/* Minimalist Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-[14px] border border-[#DCD6CA] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
          <button
            onClick={() => {
              Haptics.light();
              setActiveTab('timeline');
            }}
            className={`px-4 py-1.5 rounded-[10px] text-xs font-serif-jp tracking-wider transition-all ${
              activeTab === 'timeline'
                ? isLight
                  ? 'bg-white text-[#2B2A2F] shadow-sm'
                  : 'bg-[#2A2A2D] text-[#F2EFEB] shadow-sm'
                : isLight
                ? 'text-[#787680]'
                : 'text-[#9A98A0]'
            }`}
          >
            Milestones
          </button>

          <button
            onClick={() => {
              Haptics.light();
              setActiveTab('calendar');
            }}
            className={`px-4 py-1.5 rounded-[10px] text-xs font-serif-jp tracking-wider transition-all ${
              activeTab === 'calendar'
                ? isLight
                  ? 'bg-white text-[#2B2A2F] shadow-sm'
                  : 'bg-[#2A2A2D] text-[#F2EFEB] shadow-sm'
                : isLight
                ? 'text-[#787680]'
                : 'text-[#9A98A0]'
            }`}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="w-full">
        {activeTab === 'timeline' ? (
          <MilestoneTimeline currentDays={currentDays} isLight={isLight} />
        ) : (
          <CalendarView
            checkInDates={data.checkInDates}
            relapses={data.relapses}
            isLight={isLight}
          />
        )}
      </div>
    </div>
  );
};
