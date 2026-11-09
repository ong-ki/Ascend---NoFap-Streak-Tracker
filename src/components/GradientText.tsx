import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'sakura-gold' | 'indigo-matcha' | 'sumi-charcoal';
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = '',
  gradient = 'sakura-gold',
}) => {
  const getGradient = () => {
    switch (gradient) {
      case 'indigo-matcha':
        return 'from-[#4A5A7A] to-[#A8B89A]';
      case 'sumi-charcoal':
        return 'from-[#2B2A2F] to-[#787680]';
      case 'sakura-gold':
      default:
        return 'from-[#E8B4BC] via-[#D9534F] to-[#C9A66B]';
    }
  };

  return (
    <span
      className={`bg-gradient-to-r ${getGradient()} bg-clip-text text-transparent font-serif-jp ${className}`}
    >
      {children}
    </span>
  );
};
