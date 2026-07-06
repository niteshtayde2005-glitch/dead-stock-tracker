const express = require('express');
const pool = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get inventory summary
router.get('/summary', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_items,
        SUM(quantity) as total_quantity,
        SUM(quantity * cost) as total_value,
        COUNT(DISTINCT category) as categories
      FROM products
    `);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dead stock items (no sales for 90+ days)
router.get('/dead-stock', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM products
      WHERE last_sale_date < NOW() - INTERVAL '90 days'
      OR last_sale_date IS NULL
      ORDER BY last_sale_date ASC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get inventory by category
router.get('/by-category', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        category,
        COUNT(*) as item_count,
        SUM(quantity) as total_quantity,
        SUM(quantity * cost) as total_value
      FROM products
      GROUP BY category
      ORDER BY total_value DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get low stock items
router.get('/low-stock', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM products
      WHERE quantity < 10
      ORDER BY quantity ASC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;