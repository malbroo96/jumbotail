import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Temporary debug route: returns product count and a sample document
// DELETE or remove this route when finished debugging
router.get('/products-count', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const sample = await Product.findOne().lean();
    res.json({ count, sample });
  } catch (err) {
    res.status(500).json({ error: 'Debug query failed', details: err.message });
  }
});

export default router;
