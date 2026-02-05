// seedProducts.js — simple data bootstrap placeholder
const Product = require("../models/Product");

const sample = [
  new Product({ id: 1, name: "Sample Product A", price: 9.99, score: 10 }),
  new Product({ id: 2, name: "Sample Product B", price: 19.99, score: 5 }),
];

module.exports = sample;
