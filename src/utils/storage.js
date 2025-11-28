const STORAGE_KEY = 'weather_os_favorites';

export const getFavorites = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to read favorites from localStorage", e);
    return [];
  }
};

export const addFavorite = (cityId) => {
  const favorites = getFavorites();
  if (!favorites.includes(cityId)) {
    const newFavorites = [...favorites, cityId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    return newFavorites;
  }
  return favorites;
};

export const removeFavorite = (cityId) => {
  const favorites = getFavorites();
  const newFavorites = favorites.filter(id => id !== cityId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  return newFavorites;
};

export const isFavorite = (cityId) => {
  const favorites = getFavorites();
  return favorites.includes(cityId);
};
