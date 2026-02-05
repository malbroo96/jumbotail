// searchController.js — search endpoint placeholder
const rankingService = require("../services/rankingService");

exports.search = (req, res) => {
  const q = req.query.q || "";
  const results = rankingService.rank([]); // placeholder
  res.json({ query: q, results });
};
