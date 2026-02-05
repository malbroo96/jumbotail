// Simple product model placeholder
class Product {
  constructor({ id, name, price, score }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.score = score || 0;
  }
}

module.exports = Product;
