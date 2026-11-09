import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Maximize2 } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  viewMode: 'mobile-frame' | 'responsive';
  onToggleViewMode: () => void;
  isLight?: boolean;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  viewMode,
  onToggleViewMode,
  isLight = true,
}) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  if (viewMode === 'responsive') {
    return (
      <div className="min-h-screen w-full flex justify-center p-0 sm:p-4 md:p-6">
        <div className="w-full max-w-md min-h-screen">{children}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-0 sm:p-6 md:p-8 select-none">
      {/* Top Floating View Switcher */}
      <div className="hidden sm:flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-stone-300 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md shadow-sm text-xs">
        <span className="font-serif-jp text-stone-500">Mobile Simulator</span>
        <button
          onClick={onToggleViewMode}
          className="flex items-center gap-1 font-serif-jp text-[#D9534F] hover:underline transition-colors ml-1"
        >
          <Maximize2 className="w-3 h-3 stroke-[1.2]" />
          <span>Full Web</span>
        </button>
      </div>

      {/* iPhone 16 Pro Mockup Frame */}
      <div
        className={`relative w-full sm:w-[400px] h-screen sm:h-[850px] sm:max-h-[94vh] sm:rounded-[48px] sm:border-[8px] sm:shadow-[0_20px_60px_rgba(40,35,30,0.15)] overflow-hidden flex flex-col transition-colors duration-700 ${
          isLight
            ? 'sm:border-[#DCD6CA] bg-[#F5F1EA] washi-texture'
            : 'sm:border-stone-800 bg-[#1C1C1E] sumi-texture'
        }`}
      >
        {/* Hardware Status Bar with Dynamic Island */}
        <div className="w-full h-11 pt-2 px-7 flex items-center justify-between text-xs z-40 shrink-0 pointer-events-none select-none">
          {/* Time in serif */}
          <span
            className={`text-xs font-serif-jp tracking-wider ${
              isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
            }`}
          >
            {timeStr || '09:41'}
          </span>

          {/* Minimal Dynamic Island Pill */}
          <div className="w-24 h-5 bg-black/85 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-[10px] text-[#E8B4BC] font-serif-jp tracking-widest font-normal">
              ENSO
            </span>
          </div>

          {/* Icons with thin stroke */}
          <div
            className={`flex items-center gap-1.5 opacity-60 ${
              isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
            }`}
          >
            <Wifi className="w-3.5 h-3.5 stroke-[1.2]" />
            <Battery className="w-3.5 h-3.5 stroke-[1.2]" />
          </div>
        </div>

        {/* Scrollable Screen Canvas */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-1">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="w-full h-4 pb-1 flex items-center justify-center shrink-0 pointer-events-none">
          <div
            className={`w-28 h-[3px] rounded-full ${
              isLight ? 'bg-stone-400/40' : 'bg-white/20'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
