import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Lock, Fingerprint, Delete, ShieldCheck } from 'lucide-react';
import { Haptics } from '../utils/haptics';

interface PinLockModalProps {
  correctPin: string;
  onUnlock: () => void;
  isLight?: boolean;
}

export const PinLockModal: React.FC<PinLockModalProps> = ({
  correctPin,
  onUnlock,
  isLight = false,
}) => {
  const [pin, setPin] = useState<string>('');
  const [errorShake, setErrorShake] = useState<boolean>(false);

  const handleDigit = (digit: string) => {
    Haptics.light();
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);

      if (nextPin.length === 4) {
        if (nextPin === correctPin || correctPin === '') {
          Haptics.success();
          onUnlock();
        } else {
          Haptics.warning();
          setErrorShake(true);
          setTimeout(() => {
            setErrorShake(false);
            setPin('');
          }, 500);
        }
      }
    }
  };

  const handleDelete = () => {
    Haptics.light();
    setPin((prev) => prev.slice(0, -1));
  };

  const handleBiometric = () => {
    Haptics.success();
    // Instant simulated biometric bypass
    onUnlock();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl">
      <div className="w-full max-w-xs mx-auto text-center">
        <div className="w-16 h-16 rounded-3xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-4 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <Lock className="w-7 h-7 text-purple-400" />
        </div>

        <h2 className="text-xl font-black text-white">Ascend Privacy Lock</h2>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          Enter your 4-digit PIN to access your tracker
        </p>

        {/* PIN Dots */}
        <div className={`flex justify-center gap-4 mb-8 ${errorShake ? 'animate-bounce text-rose-500' : ''}`}>
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pin.length > idx;
            return (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  isFilled
                    ? 'bg-purple-500 border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)] scale-110'
                    : 'border-white/20 bg-white/5'
                }`}
              />
            );
          })}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 max-w-[260px] mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-purple-500/20 border border-white/10 text-xl font-bold text-white transition-all active:scale-95 flex items-center justify-center"
            >
              {digit}
            </button>
          ))}

          {/* Biometrics */}
          <button
            onClick={handleBiometric}
            className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 text-purple-400 border border-white/10 transition-all active:scale-95 flex items-center justify-center"
            title="Unlock with Biometrics (Touch/Face ID)"
          >
            <Fingerprint className="w-6 h-6" />
          </button>

          {/* 0 */}
          <button
            onClick={() => handleDigit('0')}
            className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-purple-500/20 border border-white/10 text-xl font-bold text-white transition-all active:scale-95 flex items-center justify-center"
          >
            0
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all active:scale-95 flex items-center justify-center"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
