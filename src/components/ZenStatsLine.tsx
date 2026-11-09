import React from 'react';

interface ZenStatsLineProps {
  bestStreakDays: number;
  totalCleanDays: number;
  resetCount: number;
  isLight?: boolean;
}

export const ZenStatsLine: React.FC<ZenStatsLineProps> = ({
  bestStreakDays,
  totalCleanDays,
  resetCount,
  isLight = true,
}) => {
  return (
    <div
      className={`w-full flex items-center justify-center gap-3 text-xs tracking-wider font-serif-jp py-1 select-none ${
        isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
      }`}
    >
      <div className="flex items-center gap-1.5">
        <span className="opacity-75 font-sans text-[11px]">Best:</span>
        <span className={`font-medium ${isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'}`}>
          {bestStreakDays}d
        </span>
      </div>

      <span className="opacity-30">·</span>

      <div className="flex items-center gap-1.5">
        <span className="opacity-75 font-sans text-[11px]">Total:</span>
        <span className={`font-medium ${isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'}`}>
          {totalCleanDays}d
        </span>
      </div>

      <span className="opacity-30">·</span>

      <div className="flex items-center gap-1.5">
        <span className="opacity-75 font-sans text-[11px]">Resets:</span>
        <span className={`font-medium ${isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'}`}>
          {resetCount}
        </span>
      </div>
    </div>
  );
};
