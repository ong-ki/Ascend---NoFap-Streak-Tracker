import React from 'react';

interface HankoStampProps {
  label?: string;
  kanji?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  opacity?: number;
}

export const HankoStamp: React.FC<HankoStampProps> = ({
  label,
  kanji,
  size = 'md',
  className = '',
  opacity = 1,
}) => {
  const text = label || kanji || '1D';

  const sizeStyles = {
    sm: 'w-6 h-6 text-[10px] border-[1.2px] rounded-[3px]',
    md: 'w-8 h-8 text-xs border-[1.5px] rounded-[4px]',
    lg: 'w-10 h-10 text-sm border-[1.8px] rounded-[5px]',
  }[size];

  return (
    <div
      style={{ opacity }}
      className={`inline-flex items-center justify-center select-none font-serif-jp border-[#D9534F] text-[#D9534F] bg-[#D9534F]/[0.08] shadow-[inset_0_0_3px_rgba(217,83,79,0.2)] rotate-[-2deg] transition-all duration-500 font-bold ${sizeStyles} ${className}`}
      title={`Seal: ${text}`}
    >
      <span className="leading-none tracking-tight">
        {text}
      </span>
    </div>
  );
};
