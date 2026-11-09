import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'subtle' | 'zen' | 'glow' | 'accent';
  isLight?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  onClick,
  variant = 'default',
  isLight = true,
}) => {
  const getShojiStyle = () => {
    if (isLight) {
      switch (variant) {
        case 'zen':
        case 'glow':
          return 'bg-[#F5F1EA]/80 border-[#DCD6CA]/70 backdrop-blur-md shadow-[0_2px_14px_rgba(43,42,47,0.04)]';
        case 'accent':
          return 'bg-white/75 border-[#DCD6CA] backdrop-blur-md shadow-[0_4px_16px_rgba(43,42,47,0.04)]';
        case 'subtle':
          return 'bg-white/45 border-[#E2DACB]/40 backdrop-blur-sm';
        case 'default':
        default:
          return 'bg-white/60 border-[#DCD6CA]/70 backdrop-blur-md shadow-[0_4px_16px_rgba(43,42,47,0.03)]';
      }
    }

    // Dark Mode (Sumi-ink charcoal & shoji night paper)
    switch (variant) {
      case 'zen':
      case 'glow':
        return 'bg-[#242428]/70 border-white/[0.09] backdrop-blur-md shadow-[0_2px_16px_rgba(0,0,0,0.35)]';
      case 'accent':
        return 'bg-[#26262B]/75 border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]';
      case 'subtle':
        return 'bg-[#1C1C1E]/40 border-white/[0.04] backdrop-blur-sm';
      case 'default':
      default:
        return 'bg-[#222226]/60 border-white/[0.08] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-[20px] border transition-all duration-500 ease-out ${getShojiStyle()} ${
        onClick ? 'cursor-pointer active:opacity-85' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
