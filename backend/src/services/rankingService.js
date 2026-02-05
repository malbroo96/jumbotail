export function rankProducts(products, query) {
  const q = query.toLowerCase();

  return products
    .map((product) => {
      let score = 0;

      // Text relevance
      if (product.title.toLowerCase().includes(q)) score += 5;
      if (product.description.toLowerCase().includes(q)) score += 2;

      // Bayesian-style rating
      const ratingScore =
        (product.rating * product.ratingCount + 4 * 50) /
        (product.ratingCount + 50);
      score += ratingScore;

      // Sales confidence
      score += Math.log(product.unitsSold + 1);

      // Cheap intent
      if (q.includes("sasta") || q.includes("cheap")) {
        score += 100000 / product.price;
      }

      // Stock penalty
      if (product.stock === 0) score -= 10;

      return { product, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
}
