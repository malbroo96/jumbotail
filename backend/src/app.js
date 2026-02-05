import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import productRoutes from "./routes/productRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

dotenv.config();

const app = express();

// Middleware
// const corsOptions = {
//   origin: process.env.FRONTEND_URL || "https://jumbotail.vercel.app/",
//   credentials: true,
// };
app.use(cors("*"));
app.use(express.json());

// MongoDB connection (IMPORTANT PART)
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME || "ecommerce_search";

if (!mongoUri) {
  console.error("❌ MONGO_URI is not set. Please set it in .env");
} else {
  mongoose
    .connect(mongoUri, { dbName })
    .then(() => {
      console.log(
        `✅ MongoDB connected — db: ${mongoose.connection.name} @ ${mongoose.connection.host}`,
      );
    })
    .catch((error) => {
      console.error("❌ MongoDB connection failed:", error);
      // Do not force-exit in production by default; keep process alive for diagnostics
      // process.exit(1);
    });

  // Helpful connection events
  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose disconnected");
  });
}

// Routes
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/search", searchRoutes);

// Health check (optional but very useful)
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
