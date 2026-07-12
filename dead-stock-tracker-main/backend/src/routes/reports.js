const express = require('express');
const pool = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const ExcelJS = require("exceljs");
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
// Export Inventory to Excel
router.get('/export-excel', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        sku,
        name,
        category,
        quantity,
        cost,
        location,
        supplier,
        last_sale_date
      FROM products
      ORDER BY name ASC
    `);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inventory');

    worksheet.columns = [
      { header: 'SKU', key: 'sku', width: 20 },
      { header: 'Product Name', key: 'name', width: 30 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Quantity', key: 'quantity', width: 15 },
      { header: 'Cost', key: 'cost', width: 15 },
      { header: 'Location', key: 'location', width: 20 },
      { header: 'Supplier', key: 'supplier', width: 25 },
      { header: 'Last Sale Date', key: 'last_sale_date', width: 20 },
    ];

    result.rows.forEach((product) => {
      worksheet.addRow(product);
    });

    worksheet.getRow(1).font = {
      bold: true,
      color: { argb: 'FFFFFFFF' },
    };

    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '2563EB' },
    };

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=MR10_Inventory.xlsx'
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to export Excel',
    });
  }
});
module.exports = router;