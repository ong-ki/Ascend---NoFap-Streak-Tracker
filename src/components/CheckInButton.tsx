import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface CheckInButtonProps {
  hasCheckedInToday: boolean;
  onCheckIn: () => void;
  isLight?: boolean;
}

export const CheckInButton: React.FC<CheckInButtonProps> = ({
  hasCheckedInToday,
  onCheckIn,
  isLight = true,
}) => {
  const [rippling, setRippling] = useState(false);

  const handleClick = () => {
    if (hasCheckedInToday || rippling) return;
    setRippling(true);
    onCheckIn();
    setTimeout(() => {
      setRippling(false);
    }, 1200);
  };

  if (hasCheckedInToday) {
    return (
      <div
        className={`w-full py-3.5 px-6 rounded-[18px] flex items-center justify-center gap-2.5 border transition-all duration-700 select-none ${
          isLight
            ? 'bg-[#A8B89A]/10 border-[#A8B89A]/40 text-[#4A5D3F]'
            : 'bg-[#A8B89A]/10 border-[#A8B89A]/30 text-[#A8B89A]'
        }`}
      >
        <Check className="w-4 h-4 stroke-[1.5]" />
        <span className="font-serif-jp text-xs sm:text-sm tracking-wider">
          Day Honored in Stillness
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`relative w-full overflow-hidden rounded-[18px] py-3.5 px-6 border transition-all duration-500 select-none focus:outline-none ${
        isLight
          ? 'bg-transparent border-[#DCD6CA] hover:border-[#C9A66B] text-[#2B2A2F] active:bg-black/[0.02]'
          : 'bg-transparent border-white/15 hover:border-[#C9A66B]/50 text-[#F2EFEB] active:bg-white/[0.02]'
      }`}
    >
      {/* Soft ink-ripple animation without confetti */}
      {rippling && (
        <span
          className={`absolute inset-0 rounded-full animate-ink-ripple pointer-events-none mx-auto my-auto ${
            isLight ? 'bg-[#D9534F]/15' : 'bg-[#E8B4BC]/15'
          }`}
          style={{ width: '120px', height: '120px' }}
        />
      )}

      {/* Button Content: Quiet, outlined, minimal in English */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        <span className="font-serif-jp text-xs sm:text-sm tracking-[0.15em] font-light">
          Stayed Mindful Today
        </span>
      </div>
    </button>
  );
};
