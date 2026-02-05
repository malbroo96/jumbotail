import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/Product.js";

dotenv.config();

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI;
    const dbName = process.env.DB_NAME || "ecommerce_search";

    if (!mongoUri) {
      throw new Error(
        "MONGO_URI is not set in environment. Please set it in .env",
      );
    }

    await mongoose.connect(mongoUri, { dbName });

    const products = [];

    for (let i = 10; i <= 20; i++) {
      for (let storage of [64, 128, 256]) {
        products.push({
          title: `iPhone ${i} ${storage}GB`,
          description: `Apple iPhone ${i} with ${storage}GB storage`,
          brand: "Apple",
          category: "mobile",
          price: 40000 + i * 2000 + storage * 50,
          mrp: 50000 + i * 2000,
          rating: 3.8 + Math.random(),
          ratingCount: Math.floor(Math.random() * 1000),
          unitsSold: Math.floor(Math.random() * 50000),
          stock: Math.floor(Math.random() * 100),
          metadata: {
            model: `iPhone ${i}`,
            storage,
            ram: 6,
          },
        });
      }
    }

    await Product.insertMany(products);

    // Verify insertion: count documents in the collection
    const total = await Product.countDocuments();
    console.log(
      `✅ Seeded products. Collection 'products' has ${total} documents.`,
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seedDatabase();
