import React from 'react';
import { ZEN_MILESTONES } from '../constants/milestones';
import { GlassCard } from './GlassCard';
import { HankoStamp } from './HankoStamp';

interface MilestoneTimelineProps {
  currentDays: number;
  isLight?: boolean;
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  currentDays,
  isLight = true,
}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="px-1 text-center sm:text-left">
        <span className="text-[10px] font-serif-jp tracking-[0.25em] text-[#D9534F] block mb-0.5">
          WAYPOINTS
        </span>
        <h3
          className={`text-base font-serif-jp tracking-wider ${
            isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
          }`}
        >
          Path of Transformation
        </h3>
      </div>

      {/* Vertical Minimal Timeline */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-[17px] before:top-3 before:bottom-3 before:w-[1px] before:bg-stone-300 dark:before:bg-stone-700">
        {ZEN_MILESTONES.map((milestone) => {
          const isUnlocked = currentDays >= milestone.days;

          return (
            <div key={milestone.days} className="relative">
              {/* Minimal Node */}
              <div
                className={`absolute -left-[27px] top-4 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  isUnlocked
                    ? 'border-[#D9534F] bg-[#D9534F]'
                    : isLight
                    ? 'border-stone-300 bg-[#F5F1EA]'
                    : 'border-stone-700 bg-[#1C1C1E]'
                }`}
              >
                {isUnlocked && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>

              {/* Milestone Card */}
              <GlassCard
                variant={isUnlocked ? 'default' : 'subtle'}
                isLight={isLight}
                className={`p-4 transition-all duration-500 border-[#DCD6CA] dark:border-white/10 ${
                  isUnlocked ? 'opacity-100' : 'opacity-55'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-sm font-serif-jp font-medium ${
                          isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
                        }`}
                      >
                        {milestone.title}
                      </h4>
                      <span
                        className={`text-[10px] font-sans px-1.5 py-0.5 rounded-[4px] border ${
                          isUnlocked
                            ? 'border-[#A8B89A] text-[#4A5D3F] dark:text-[#A8B89A]'
                            : 'border-stone-300 dark:border-stone-700 text-stone-400'
                        }`}
                      >
                        {milestone.days}d
                      </span>
                    </div>

                    <p
                      className={`text-xs font-serif-jp leading-relaxed ${
                        isLight ? 'text-[#6E6D7A]' : 'text-[#9A98A0]'
                      }`}
                    >
                      {milestone.description}
                    </p>

                    <p
                      className={`text-[11px] font-serif-jp opacity-70 pt-1 ${
                        isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
                      }`}
                    >
                      {milestone.philosophy}
                    </p>
                  </div>

                  {/* Hanko Stamp for Unlocked Milestones / Locked placeholder */}
                  <div className="shrink-0 flex items-center justify-center pt-1">
                    {isUnlocked ? (
                      <HankoStamp label={milestone.hankoSeal} size="md" />
                    ) : (
                      <div className="w-8 h-8 rounded-[4px] border border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-center opacity-40">
                        <span className="font-serif-jp text-[11px] text-stone-400 font-bold">
                          {milestone.hankoSeal}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};
