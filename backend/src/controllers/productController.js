// productController.js — request handlers placeholder
const Product = require("../models/Product");

exports.getProducts = (req, res) => {
  res.json({ message: "List products (placeholder)" });
};

exports.getProduct = (req, res) => {
  res.json({ message: `Get product ${req.params.id}` });
};
