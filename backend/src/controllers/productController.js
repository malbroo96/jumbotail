import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ productId: product._id });
  } catch (err) {
    res.status(400).json({ message: "Product creation failed" });
  }
};

export const updateMetadata = async (req, res) => {
  try {
    const { productId, metadata } = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      { $set: { metadata } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ productId, metadata: product.metadata });
  } catch (err) {
    res.status(400).json({ message: "Metadata update failed" });
  }
};
