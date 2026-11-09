import React, { useEffect, useState } from 'react';
import { StreakDuration } from '../utils/date';
import { GradientText } from './GradientText';

interface StreakCounterProps {
  duration: StreakDuration;
  isLight?: boolean;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ duration, isLight = true }) => {
  const [displayDays, setDisplayDays] = useState(0);

  // Slow, gentle count-up on mount (smooth 900ms)
  useEffect(() => {
    const target = duration.days;
    if (target === 0) {
      setDisplayDays(0);
      return;
    }

    const durationMs = 900;
    const steps = 25;
    const stepDuration = durationMs / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = Math.min(target, Math.round((step / steps) * target));
      setDisplayDays(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayDays(target);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [duration.days]);

  return (
    <div className="flex flex-col items-center justify-center text-center py-2 select-none">
      {/* Delicate Overline */}
      <span
        className={`text-xs tracking-[0.3em] font-serif-jp uppercase mb-1 ${
          isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
        }`}
      >
        CONTINUITY
      </span>

      {/* Main Days Counter in Elegant Thin Serif with Soft Japanese Gradient */}
      <div className="my-1">
        <span className="text-7xl sm:text-8xl font-light font-serif-jp tracking-tight">
          <GradientText gradient="sakura-gold">
            {displayDays}
          </GradientText>
        </span>
      </div>

      {/* "days" beneath it */}
      <div className="flex items-center justify-center gap-1.5 mt-1">
        <span
          className={`text-sm tracking-[0.25em] uppercase font-light ${
            isLight ? 'text-[#6E6D7A]' : 'text-[#8E8D96]'
          }`}
        >
          {displayDays === 1 ? 'day clean' : 'days clean'}
        </span>
      </div>

      {/* Quiet live ticking time (hours, minutes, seconds) in faint monospace/sans */}
      <div
        className={`flex items-center gap-2 mt-3 text-[11px] font-sans tracking-widest ${
          isLight ? 'text-[#9A98A0]' : 'text-[#6E6D7A]'
        }`}
      >
        <span>{String(duration.hours).padStart(2, '0')}h</span>
        <span>:</span>
        <span>{String(duration.minutes).padStart(2, '0')}m</span>
        <span>:</span>
        <span>{String(duration.seconds).padStart(2, '0')}s</span>
      </div>
    </div>
  );
};
