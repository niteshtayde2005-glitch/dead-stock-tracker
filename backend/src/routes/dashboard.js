const express = require('express');
const pool = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get dashboard analytics
router.get('/', authMiddleware, async (req, res) => {
  try {
    const summaryResult = await pool.query(`
      SELECT 
        COUNT(*) as total_products,
        SUM(quantity) as total_quantity,
        SUM(quantity * cost) as total_value
      FROM products
    `);

    const deadStockResult = await pool.query(`
      SELECT COUNT(*) as count FROM products
      WHERE last_sale_date < NOW() - INTERVAL '90 days'
      OR last_sale_date IS NULL
    `);

    const categoryResult = await pool.query(`
      SELECT category, COUNT(*) as count, SUM(quantity * cost) as value
      FROM products
      GROUP BY category
      LIMIT 5
    `);

    const recentResult = await pool.query(`
      SELECT * FROM products
      ORDER BY created_at DESC
      LIMIT 10
    `);

    res.json({
      summary: summaryResult.rows[0],
      deadStockCount: deadStockResult.rows[0].count,
      topCategories: categoryResult.rows,
      recentProducts: recentResult.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;