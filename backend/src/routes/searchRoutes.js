import express from "express";
import { searchProducts } from "../controllers/searchController.js";

const router = express.Router();

router.get("/product", searchProducts);

export default router;
