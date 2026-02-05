import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    brand: String,
    category: String,

    price: Number,
    mrp: Number,
    rating: Number,
    ratingCount: Number,
    unitsSold: Number,
    stock: Number,

    metadata: {
      model: String,
      color: String,
      ram: Number,
      storage: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
