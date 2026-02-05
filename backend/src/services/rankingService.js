// rankingService.js — placeholder ranking logic
exports.rank = (products, opts = {}) => {
  // simple score-based sort (placeholder)
  return products.sort((a, b) => (b.score || 0) - (a.score || 0));
};
