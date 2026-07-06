const express = require('express');
const pool = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Generate dead stock report
router.get('/dead-stock', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, sku, name, category, quantity, cost, 
        quantity * cost as total_value,
        last_sale_date,
        EXTRACT(DAY FROM NOW() - last_sale_date) as days_without_sale,
        location
      FROM products
      WHERE last_sale_date < NOW() - INTERVAL '90 days'
      OR last_sale_date IS NULL
      ORDER BY total_value DESC
    `);
    
    res.json({
      report_type: 'Dead Stock Report',
      generated_at: new Date(),
      total_items: result.rows.length,
      total_value: result.rows.reduce((sum, item) => sum + (item.total_value || 0), 0),
      items: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate category report
router.get('/category', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        category,
        COUNT(*) as total_items,
        SUM(quantity) as total_quantity,
        SUM(quantity * cost) as total_value,
        AVG(cost) as avg_cost
      FROM products
      GROUP BY category
      ORDER BY total_value DESC
    `);
    
    res.json({
      report_type: 'Category Report',
      generated_at: new Date(),
      categories: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate value report
router.get('/value', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, sku, name, category, quantity, cost,
        quantity * cost as total_value
      FROM products
      ORDER BY total_value DESC
      LIMIT 50
    `);
    
    res.json({
      report_type: 'Value Report (Top 50)',
      generated_at: new Date(),
      total_value: result.rows.reduce((sum, item) => sum + item.total_value, 0),
      items: result.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;