import React from 'react';

export const FallingSakura: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Petal 1 */}
      <div className="absolute -top-4 left-[15%] w-3 h-4 bg-[#E8B4BC] rounded-[100%_0%_100%_0%] opacity-40 blur-[0.4px] animate-sakura-1" />
      {/* Petal 2 */}
      <div className="absolute -top-4 left-[45%] w-2.5 h-3.5 bg-[#E8B4BC] rounded-[0%_100%_0%_100%] opacity-35 blur-[0.3px] animate-sakura-2" />
      {/* Petal 3 */}
      <div className="absolute -top-4 left-[75%] w-3.5 h-4.5 bg-[#E8B4BC] rounded-[100%_0%_100%_0%] opacity-30 blur-[0.5px] animate-sakura-3" />
      {/* Petal 4 */}
      <div className="absolute -top-4 left-[88%] w-2.5 h-3 bg-[#E8B4BC] rounded-[0%_100%_0%_100%] opacity-40 blur-[0.3px] animate-sakura-4" />
    </div>
  );
};
