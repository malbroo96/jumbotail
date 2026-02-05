import express from "express";
import {
  createProduct,
  updateMetadata
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.put("/meta-data", updateMetadata);

export default router;
