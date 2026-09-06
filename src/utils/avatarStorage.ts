import defaultPortrait from '../assets/images/joe_jose_portrait_1788675389619.jpg';

const STORAGE_KEY = 'joe_portfolio_avatar_exact';

export const getStoredAvatar = (): string => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
    } catch {
      // Ignore storage read errors
    }
  }
  // Try direct path in public first, then fallback to bundled asset
  return '/785200414_2272581446823611_4665171888073840017_n.jpg';
};

export const saveStoredAvatar = (dataUrl: string): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, dataUrl);
      window.dispatchEvent(new CustomEvent('avatar-updated', { detail: dataUrl }));
    } catch (e) {
      console.warn('Could not save avatar to localStorage', e);
    }
  }
};

export const clearStoredAvatar = (): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('avatar-updated', { detail: defaultPortrait }));
    } catch {
      // Ignore
    }
  }
};

export const getDefaultPortraitFallback = (): string => {
  return defaultPortrait;
};
