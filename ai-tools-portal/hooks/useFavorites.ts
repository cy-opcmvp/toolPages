
import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'ai-tools-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      if (saved) {
        const favArray = JSON.parse(saved);
        setFavorites(new Set(favArray));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        const favArray = Array.from(favorites);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favArray));
      } catch (error) {
        console.error('Failed to save favorites:', error);
      }
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = useCallback((toolId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(toolId)) {
        newFavorites.delete(toolId);
      } else {
        newFavorites.add(toolId);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((toolId: string) => {
    return favorites.has(toolId);
  }, [favorites]);

  const getFavoriteTools = useCallback(() => {
    return Array.from(favorites);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
  }, []);

  return {
    favorites,
    isLoaded,
    toggleFavorite,
    isFavorite,
    getFavoriteTools,
    clearFavorites,
    favoriteCount: favorites.size
  };
}
