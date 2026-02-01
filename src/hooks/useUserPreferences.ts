import { useCallback } from 'react';
import { UserPreferences, DietaryRestriction, UserStats } from '@/types';
import { useLocalStorage } from './useLocalStorage';

const PREFERENCES_KEY = 'smart-basket-preferences';
const STATS_KEY = 'smart-basket-stats';

const defaultPreferences: UserPreferences = {
  dietaryRestrictions: [],
  preferredStores: [],
  ecoFriendlyPriority: false,
  notificationsEnabled: true,
  preferNational: false,
  lowSugar: false,
  lowSodium: false,
};

const defaultStats: UserStats = {
  totalLists: 0,
  totalItemsPurchased: 0,
  moneySaved: 0,
  ecoPointsEarned: 0,
  averageBasketSize: 0,
};

export function useUserPreferences() {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(PREFERENCES_KEY, defaultPreferences);
  const [stats, setStats] = useLocalStorage<UserStats>(STATS_KEY, defaultStats);

  const toggleDietaryRestriction = useCallback((restriction: DietaryRestriction) => {
    setPreferences(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction],
    }));
  }, [setPreferences]);

  const togglePreferredStore = useCallback((storeId: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredStores: prev.preferredStores.includes(storeId)
        ? prev.preferredStores.filter(s => s !== storeId)
        : [...prev.preferredStores, storeId],
    }));
  }, [setPreferences]);

  const setEcoFriendlyPriority = useCallback((value: boolean) => {
    setPreferences(prev => ({ ...prev, ecoFriendlyPriority: value }));
  }, [setPreferences]);

  const setNotificationsEnabled = useCallback((value: boolean) => {
    setPreferences(prev => ({ ...prev, notificationsEnabled: value }));
  }, [setPreferences]);

  const setPreferNational = useCallback((value: boolean) => {
    setPreferences(prev => ({ ...prev, preferNational: value }));
  }, [setPreferences]);

  const setLowSugar = useCallback((value: boolean) => {
    setPreferences(prev => ({ ...prev, lowSugar: value }));
  }, [setPreferences]);

  const setLowSodium = useCallback((value: boolean) => {
    setPreferences(prev => ({ ...prev, lowSodium: value }));
  }, [setPreferences]);

  const updateStats = useCallback((updates: Partial<UserStats>) => {
    setStats(prev => ({ ...prev, ...updates }));
  }, [setStats]);

  const incrementListCount = useCallback(() => {
    setStats(prev => ({ ...prev, totalLists: prev.totalLists + 1 }));
  }, [setStats]);

  const addPurchasedItems = useCallback((count: number) => {
    setStats(prev => ({
      ...prev,
      totalItemsPurchased: prev.totalItemsPurchased + count,
      averageBasketSize: prev.totalLists > 0
        ? (prev.totalItemsPurchased + count) / (prev.totalLists + 1)
        : count,
    }));
  }, [setStats]);

  const addSavings = useCallback((amount: number) => {
    setStats(prev => ({ ...prev, moneySaved: prev.moneySaved + amount }));
  }, [setStats]);

  const addEcoPoints = useCallback((points: number) => {
    setStats(prev => ({ ...prev, ecoPointsEarned: prev.ecoPointsEarned + points }));
  }, [setStats]);

  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
  }, [setPreferences]);

  const resetStats = useCallback(() => {
    setStats(defaultStats);
  }, [setStats]);

  return {
    preferences,
    stats,
    toggleDietaryRestriction,
    togglePreferredStore,
    setEcoFriendlyPriority,
    setNotificationsEnabled,
    setPreferNational,
    setLowSugar,
    setLowSodium,
    updateStats,
    incrementListCount,
    addPurchasedItems,
    addSavings,
    addEcoPoints,
    resetPreferences,
    resetStats,
  };
}
