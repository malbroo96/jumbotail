import Product from "../models/Product.js";
import { rankProducts } from "../services/rankingService.js";

export const searchProducts = async (req, res) => {
  try {
    const { query = "" } = req.query;

    const products = await Product.find({});
    const rankedProducts = rankProducts(products, query);

    res.json({ data: rankedProducts });
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};
