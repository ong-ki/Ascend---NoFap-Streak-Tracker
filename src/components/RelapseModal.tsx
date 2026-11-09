import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { X, Sparkles } from 'lucide-react';

interface RelapseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmRelapse: (trigger?: string, reflection?: string) => void;
  currentStreakDays: number;
  isLight?: boolean;
}

const GENTLE_REFLECTIONS = [
  'Restless late evening',
  'Fatigue & tired body',
  'Quiet boredom',
  'Emotional wave / stress',
  'Digital distraction',
];

export const RelapseModal: React.FC<RelapseModalProps> = ({
  isOpen,
  onClose,
  onConfirmRelapse,
  currentStreakDays,
  isLight = true,
}) => {
  const [selectedTrigger, setSelectedTrigger] = useState<string>('');
  const [note, setNote] = useState<string>('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirmRelapse(selectedTrigger, note);
    onClose();
    setSelectedTrigger('');
    setNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-sm mx-auto">
        <GlassCard
          variant="default"
          isLight={isLight}
          className="p-6 border-[#DCD6CA] dark:border-white/10"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <X className="w-4 h-4 stroke-[1.2]" />
          </button>

          {/* Heading */}
          <div className="text-center mb-4">
            <span className="text-[11px] font-serif-jp tracking-[0.25em] text-[#D9534F] block mb-1">
              FRESH BEGINNING
            </span>
            <h3
              className={`text-lg font-serif-jp ${
                isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
              }`}
            >
              Every Day is a Fresh Start
            </h3>
            <p
              className={`text-xs mt-2 leading-relaxed font-sans ${
                isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
              }`}
            >
              Progress is not lost like water spilt. The {currentStreakDays} day{currentStreakDays === 1 ? '' : 's'} you walked remain part of your story.
            </p>
          </div>

          {/* Quiet Reflection Options */}
          <div className="space-y-2 mb-4">
            <span
              className={`block text-[11px] font-serif-jp tracking-wider ${
                isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
              }`}
            >
              What arose? (Optional)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {GENTLE_REFLECTIONS.map((trig) => {
                const isSelected = selectedTrigger === trig;
                return (
                  <button
                    key={trig}
                    type="button"
                    onClick={() => setSelectedTrigger(isSelected ? '' : trig)}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                      isSelected
                        ? 'border-[#D9534F] text-[#D9534F] bg-[#D9534F]/10'
                        : isLight
                        ? 'border-[#E2DACB] text-[#787680] hover:border-stone-400'
                        : 'border-white/10 text-[#9A98A0] hover:border-white/30'
                    }`}
                  >
                    {trig}
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="A quiet note for yourself..."
              className={`w-full text-xs p-2.5 rounded-[12px] border font-sans mt-2 focus:outline-none transition-colors ${
                isLight
                  ? 'bg-white/70 border-[#DCD6CA] text-[#2B2A2F] focus:border-[#C9A66B]'
                  : 'bg-white/5 border-white/10 text-white focus:border-[#C9A66B]'
              }`}
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2.5 rounded-[12px] text-xs font-serif-jp tracking-wider border transition-all ${
                isLight
                  ? 'border-[#DCD6CA] text-[#787680] hover:bg-black/[0.02]'
                  : 'border-white/15 text-[#9A98A0] hover:bg-white/[0.02]'
              }`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 py-2.5 rounded-[12px] text-xs font-serif-jp tracking-wider bg-[#D9534F] text-white hover:bg-[#C84642] transition-colors"
            >
              Begin Anew
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
