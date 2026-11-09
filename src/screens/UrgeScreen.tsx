import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/GlassCard';
import { ZEN_QUOTES, ZenQuote } from '../constants/quotes';
import { Haptics } from '../utils/haptics';
import { SoundPlayer } from '../utils/sound';
import {
  RotateCcw,
  Footprints,
  Droplets,
  Wind,
  Coffee,
  Check,
} from 'lucide-react';

interface UrgeScreenProps {
  onUrgeResisted?: (action: string) => void;
  isLight?: boolean;
}

type ZenBreathPhase = 'inhale' | 'hold' | 'exhale';

const ZEN_SUGGESTIONS = [
  { id: 'walk', label: 'Walk outside', icon: Footprints, desc: 'Feel the quiet air and steady ground' },
  { id: 'water', label: 'Cool water', icon: Droplets, desc: 'Splash coolness upon your face' },
  { id: 'breath', label: 'Deep breathing', icon: Wind, desc: 'Direct the breath down to your center' },
  { id: 'tea', label: 'Green tea', icon: Coffee, desc: 'Hold a warm cup with both hands' },
];

export const UrgeScreen: React.FC<UrgeScreenProps> = ({
  onUrgeResisted,
  isLight = true,
}) => {
  // 4s Inhale / 4s Hold / 6s Exhale
  const [phase, setPhase] = useState<ZenBreathPhase>('inhale');
  const [phaseSeconds, setPhaseSeconds] = useState<number>(4);

  // Zen quote pool
  const [quoteIndex, setQuoteIndex] = useState<number>(() =>
    Math.floor(Math.random() * ZEN_QUOTES.length)
  );

  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [hasCalmed, setHasCalmed] = useState<boolean>(false);

  // Cycle through 4-4-6 breathing
  useEffect(() => {
    const timer = setInterval(() => {
      setPhaseSeconds((prev) => {
        if (prev > 1) return prev - 1;

        if (phase === 'inhale') {
          setPhase('hold');
          return 4;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 6;
        } else {
          setPhase('inhale');
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  const currentQuote: ZenQuote = ZEN_QUOTES[quoteIndex];

  const handleNextQuote = () => {
    Haptics.light();
    setQuoteIndex((prev) => (prev + 1) % ZEN_QUOTES.length);
  };

  const toggleSuggestion = (id: string) => {
    Haptics.light();
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCalmed = () => {
    Haptics.light();
    SoundPlayer.playSuccessChime();
    setHasCalmed(true);
    if (onUrgeResisted) {
      onUrgeResisted('Mindful breathing in stillness');
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full py-4 pb-28 space-y-6">
      {/* Header */}
      <div className="text-center pt-2">
        <span
          className={`text-[11px] font-serif-jp tracking-[0.3em] uppercase ${
            isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
          }`}
        >
          STILLNESS
        </span>
        <h1
          className={`text-xl font-serif-jp tracking-wider mt-0.5 ${
            isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
          }`}
        >
          Urge Help & Sanctuary
        </h1>
      </div>

      {/* 4-4-6 Breathing Circle (Inhale 4s / Hold 4s / Exhale 6s) */}
      <div className="relative flex flex-col items-center justify-center my-3 select-none">
        <div className="relative flex items-center justify-center w-52 h-52">
          {/* Outer Breathing Halo */}
          <div
            className={`absolute rounded-full transition-all duration-1000 ease-in-out ${
              phase === 'inhale'
                ? 'w-48 h-48 bg-[#A8B89A]/15 border border-[#A8B89A]/30 scale-110'
                : phase === 'hold'
                ? 'w-48 h-48 bg-[#C9A66B]/15 border border-[#C9A66B]/30 scale-110'
                : 'w-36 h-36 bg-[#E8B4BC]/10 border border-[#E8B4BC]/20 scale-90'
            }`}
          />

          {/* Center Bubble with Phase Label */}
          <div
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border transition-all duration-1000 ease-in-out ${
              isLight
                ? 'bg-white/70 border-[#DCD6CA]/80 text-[#2B2A2F]'
                : 'bg-[#222226]/80 border-white/10 text-[#F2EFEB]'
            }`}
          >
            <span className="font-serif-jp text-xs text-[#D9534F] mb-0.5 tracking-wider">
              {phase === 'inhale' ? 'INHALE' : phase === 'hold' ? 'HOLD' : 'EXHALE'}
            </span>
            <span className="text-2xl font-serif-jp font-light my-0.5">
              {phaseSeconds}s
            </span>
            <span
              className={`text-[10px] tracking-widest font-sans opacity-60 ${
                isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
              }`}
            >
              4 · 4 · 6
            </span>
          </div>
        </div>

        <p
          className={`text-[11px] font-serif-jp tracking-wider mt-2 opacity-70 ${
            isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
          }`}
        >
          Let the restlessness pass through you like clean wind.
        </p>
      </div>

      {/* Zen Reflection Card */}
      <GlassCard
        variant="zen"
        isLight={isLight}
        className="w-full max-w-sm p-4 relative border-[#DCD6CA] dark:border-white/10"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-1">
            <span className="text-[10px] font-serif-jp tracking-widest text-[#D9534F] uppercase block">
              {currentQuote.theme}
            </span>
            <p
              className={`font-serif-jp text-xs sm:text-sm leading-relaxed ${
                isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
              }`}
            >
              &ldquo;{currentQuote.text}&rdquo;
            </p>
            <span
              className={`text-[11px] font-sans block opacity-60 pt-0.5 ${
                isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
              }`}
            >
              — {currentQuote.author}
            </span>
          </div>

          <button
            onClick={handleNextQuote}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-stone-400 hover:text-stone-700 transition-colors shrink-0"
            title="Next reflection"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.2]" />
          </button>
        </div>
      </GlassCard>

      {/* 4 Simple Suggestions */}
      <div className="w-full max-w-sm space-y-2">
        <span
          className={`block text-[11px] font-serif-jp tracking-[0.2em] text-center uppercase ${
            isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
          }`}
        >
          Quiet Suggestions
        </span>

        <div className="grid grid-cols-2 gap-2">
          {ZEN_SUGGESTIONS.map((item) => {
            const Icon = item.icon;
            const isDone = completedIds.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleSuggestion(item.id)}
                className={`p-3 rounded-[16px] border text-left transition-all duration-300 flex flex-col justify-between ${
                  isDone
                    ? 'border-[#A8B89A] bg-[#A8B89A]/10'
                    : isLight
                    ? 'border-[#DCD6CA] bg-white/50 hover:bg-white/80'
                    : 'border-white/10 bg-[#222226]/50 hover:bg-[#222226]/80'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className="w-3.5 h-3.5 stroke-[1.2] opacity-75" />
                  {isDone && <Check className="w-3 h-3 text-[#A8B89A]" />}
                </div>
                <div>
                  <div
                    className={`text-xs font-serif-jp font-medium ${
                      isLight ? 'text-[#2B2A2F]' : 'text-[#F2EFEB]'
                    }`}
                  >
                    {item.label}
                  </div>
                  <div
                    className={`text-[10px] font-sans leading-tight mt-0.5 opacity-65 ${
                      isLight ? 'text-[#787680]' : 'text-[#9A98A0]'
                    }`}
                  >
                    {item.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion Button */}
      <div className="w-full max-w-xs pt-1">
        {hasCalmed ? (
          <div className="text-center py-2 text-xs font-serif-jp text-[#A8B89A] flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4 stroke-[1.5]" />
            <span>Stillness is restored</span>
          </div>
        ) : (
          <button
            onClick={handleCalmed}
            className={`w-full py-3 px-4 rounded-[16px] border text-xs font-serif-jp tracking-wider transition-colors ${
              isLight
                ? 'border-[#DCD6CA] hover:border-[#A8B89A] text-[#2B2A2F]'
                : 'border-white/15 hover:border-[#A8B89A] text-[#F2EFEB]'
            }`}
          >
            I Feel Grounded Again
          </button>
        )}
      </div>
    </div>
  );
};
