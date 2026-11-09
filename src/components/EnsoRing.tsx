import React from 'react';
import { NextMilestoneInfo } from '../utils/date';
import { ZEN_COLORS } from '../constants/theme';

interface EnsoRingProps {
  milestoneInfo: NextMilestoneInfo;
  currentDays: number;
  size?: number;
  isLight?: boolean;
}

export const EnsoRing: React.FC<EnsoRingProps> = ({
  milestoneInfo,
  currentDays,
  size = 290,
  isLight = true,
}) => {
  const { nextMilestone, daysRemaining, progressPercent, isMaxTierReached } = milestoneInfo;

  // Enso geometry
  const center = size / 2;
  const radius = center - 26;
  const circumference = 2 * Math.PI * radius;

  // The traditional Enso has a deliberate open gap of ~15% at the top right
  const maxArcFraction = 0.86;
  const activeCircumference = circumference * maxArcFraction;
  const strokeDashoffset = circumference - (progressPercent / 100) * activeCircumference;

  // Colors based on theme
  const trackColor = isLight ? 'rgba(215, 206, 192, 0.45)' : 'rgba(255, 255, 255, 0.08)';
  const strokeStart = isLight ? '#E8B4BC' : '#A8B89A'; // Sakura or Matcha
  const strokeEnd = isLight ? '#C9A66B' : '#C9A66B';   // Kincha gold

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      {/* Very faint ambient glow behind Enso */}
      <div
        className={`absolute rounded-full pointer-events-none transition-all duration-1000 ${
          isLight
            ? 'bg-[#E8B4BC]/10 blur-3xl'
            : 'bg-[#A8B89A]/10 blur-3xl'
        }`}
        style={{ width: size * 0.75, height: size * 0.75 }}
      />

      {/* Hand-drawn Calligraphic Enso SVG Ring */}
      <svg
        width={size}
        height={size}
        className="rotate-[-105deg] overflow-visible"
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          {/* Subtle gradient mimicking ink dilution */}
          <linearGradient id="ensoInkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={strokeStart} stopOpacity="0.9" />
            <stop offset="60%" stopColor="#D9534F" stopOpacity="0.85" />
            <stop offset="100%" stopColor={strokeEnd} stopOpacity="0.9" />
          </linearGradient>

          {/* Slight ink bleed filter */}
          <filter id="ensoInkBleed" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint sumi-e background guide circle (broken open enso) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${activeCircumference} ${circumference}`}
          fill="none"
        />

        {/* Dynamic Enso Stroke: brush thickness & tapered end */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#ensoInkGradient)"
          strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          filter="url(#ensoInkBleed)"
          style={{
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        />

        {/* Small ink spatter / brush texture accent at head of stroke */}
        <circle
          cx={center + radius}
          cy={center}
          r="4.5"
          fill={strokeStart}
          opacity="0.8"
        />
      </svg>

      {/* Center Content: Quiet Japanese Minimalist Focus */}
      <div className="absolute flex flex-col items-center justify-center text-center px-6 max-w-[190px]">
        {/* Subtle Kanji Sub-badge */}
        <span
          className={`text-[10px] tracking-[0.25em] font-serif-jp uppercase mb-1 ${
            isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
          }`}
        >
          {isMaxTierReached ? 'Full Mastery' : 'Next Milestone'}
        </span>

        {/* Next Target Title */}
        <h4
          className={`text-sm sm:text-base font-serif-jp tracking-wider ${
            isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
          }`}
        >
          {nextMilestone.title}
        </h4>

        {/* Days remaining in gentle phrasing */}
        {isMaxTierReached ? (
          <p className="text-xs text-[#C9A66B] font-serif-jp mt-1">
            Mastery Reached
          </p>
        ) : (
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span
              className={`text-xl sm:text-2xl font-serif-jp font-light ${
                isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
              }`}
            >
              {daysRemaining}
            </span>
            <span
              className={`text-[11px] font-sans ${
                isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
              }`}
            >
              {daysRemaining === 1 ? 'day left' : 'days left'}
            </span>
          </div>
        )}

        {/* Delicate single hairline progress bar */}
        <div className="w-20 bg-stone-300/30 dark:bg-white/10 h-[1.5px] rounded-full mt-2.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#E8B4BC] to-[#C9A66B] rounded-full transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <span
          className={`text-[10px] tracking-widest mt-1.5 font-sans opacity-70 ${
            isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
          }`}
        >
          {progressPercent}% towards {nextMilestone.days}d
        </span>
      </div>
    </div>
  );
};
