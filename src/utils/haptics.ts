/**
 * Haptic feedback utility providing smooth haptic pulses
 * Compatible with mobile browsers via navigator.vibrate
 * and matches expo-haptics semantics.
 */

export const Haptics = {
  light: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // ignore on unsupported platforms
      }
    }
  },
  medium: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(30);
      } catch {
        // ignore
      }
    }
  },
  heavy: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 30, 40]);
      } catch {
        // ignore
      }
    }
  },
  success: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([20, 40, 60]);
      } catch {
        // ignore
      }
    }
  },
  warning: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([60, 50, 60]);
      } catch {
        // ignore
      }
    }
  },
};
