import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { RelapseRecord } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Haptics } from '../utils/haptics';

interface CalendarViewProps {
  checkInDates: string[]; // YYYY-MM-DD
  relapses: RelapseRecord[];
  isLight?: boolean;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  checkInDates,
  relapses,
  isLight = true,
}) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    Haptics.light();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    Haptics.light();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const relapseDateMap = new Map<string, RelapseRecord>();
  relapses.forEach((r) => {
    const d = new Date(r.timestamp);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    relapseDateMap.set(`${y}-${m}-${day}`, r);
  });

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
    today.getDate()
  ).padStart(2, '0')}`;

  const monthName = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <GlassCard variant="default" isLight={isLight} className="p-4 sm:p-5 border-[#DCD6CA] dark:border-white/10">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <span className="text-[10px] font-serif-jp tracking-[0.25em] text-[#D9534F] block">
            MONTHLY VIEW
          </span>
          <h3
            className={`text-base font-serif-jp tracking-wider ${
              isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
            }`}
          >
            {monthName}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 stroke-[1.2]" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <ChevronRight className="w-4 h-4 stroke-[1.2]" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {daysOfWeek.map((day, idx) => (
          <div
            key={idx}
            className={`text-[10px] font-sans font-light opacity-50 ${
              isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
          const isToday = dateStr === todayStr;
          const isClean = checkInDates.includes(dateStr);
          const hasRelapse = relapseDateMap.has(dateStr);

          return (
            <div
              key={dayNum}
              className={`h-8 rounded-[8px] flex flex-col items-center justify-center text-xs font-serif-jp relative transition-all ${
                isToday
                  ? isLight
                    ? 'border border-[#C9A66B]/60 font-medium'
                    : 'border border-[#C9A66B]/50 font-medium'
                  : ''
              } ${isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'}`}
            >
              <span>{dayNum}</span>

              {/* Small minimal dots: Matcha green for clean, soft red for reset */}
              {isClean && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8B89A] absolute bottom-1" />
              )}
              {hasRelapse && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9534F] absolute bottom-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Subtle Legend */}
      <div className="flex items-center justify-center gap-5 mt-4 pt-3 border-t border-[#DCD6CA]/40 dark:border-white/5 text-[10px] font-serif-jp">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A8B89A]" />
          <span className={isLight ? 'text-[#787680]' : 'text-[#9A98A0]'}>Matcha Green (Clean Day)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9534F]" />
          <span className={isLight ? 'text-[#787680]' : 'text-[#9A98A0]'}>Soft Red (Reset)</span>
        </div>
      </div>
    </GlassCard>
  );
};
