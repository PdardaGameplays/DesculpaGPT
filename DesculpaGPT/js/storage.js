/**
 * DesculpaGPT - Gerenciamento de Armazenamento Local (Histórico & Favoritos)
 */

const StorageGPT = (() => {
  const STORAGE_KEY_HISTORY = 'desculpagpt_history_v1';
  const STORAGE_KEY_FAVS = 'desculpagpt_favs_v1';
  const STORAGE_KEY_STATS = 'desculpagpt_stats_v1';

  function getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveToHistory(item) {
    try {
      const history = getHistory();
      // Adiciona no início
      history.unshift({
        id: 'esc_' + Date.now(),
        ...item
      });
      // Mantém no máximo 50
      if (history.length > 50) history.pop();
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));

      incrementStats(item.situation, item.target);
    } catch (e) {}
  }

  function getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_FAVS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function toggleFavorite(item) {
    try {
      let favs = getFavorites();
      const exists = favs.find(f => f.mainExcuse === item.mainExcuse);
      if (exists) {
        favs = favs.filter(f => f.mainExcuse !== item.mainExcuse);
      } else {
        favs.unshift({
          id: 'fav_' + Date.now(),
          ...item
        });
      }
      localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(favs));
      return !exists; // true se adicionou, false se removeu
    } catch (e) {
      return false;
    }
  }

  function isFavorite(text) {
    const favs = getFavorites();
    return favs.some(f => f.mainExcuse === text);
  }

  function getStats() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_STATS);
      return data ? JSON.parse(data) : {
        totalGenerated: 0,
        bySituation: {},
        byTarget: {}
      };
    } catch (e) {
      return { totalGenerated: 0, bySituation: {}, byTarget: {} };
    }
  }

  function incrementStats(situation, target) {
    try {
      const stats = getStats();
      stats.totalGenerated = (stats.totalGenerated || 0) + 1;
      stats.bySituation[situation] = (stats.bySituation[situation] || 0) + 1;
      stats.byTarget[target] = (stats.byTarget[target] || 0) + 1;
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
    } catch (e) {}
  }

  function clearHistory() {
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch (e) {}
  }

  return {
    getHistory,
    saveToHistory,
    getFavorites,
    toggleFavorite,
    isFavorite,
    getStats,
    clearHistory
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageGPT;
}
