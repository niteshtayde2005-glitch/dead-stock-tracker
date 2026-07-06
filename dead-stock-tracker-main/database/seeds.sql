-- Sample data for Dead Stock Tracker

-- Insert sample users
INSERT INTO users (email, password, name, role) VALUES
('admin@example.com', '$2a$10$YourHashedPasswordHere', 'Admin User', 'admin'),
('manager@example.com', '$2a$10$YourHashedPasswordHere', 'Manager User', 'manager');

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic items and components'),
('Apparel', 'Clothing and textile items'),
('Hardware', 'Hardware and tools'),
('Software', 'Software licenses and products'),
('Office Supplies', 'Office equipment and supplies');

-- Insert sample products (dead stock items)
INSERT INTO products (sku, name, category, quantity, cost, last_sale_date, location, supplier, created_by) VALUES
('SKU-001', 'Old Laptop Model A', 'Electronics', 5, 450.00, '2024-01-15', 'Warehouse A', 'TechSupply Inc', 1),
('SKU-002', 'Outdated Phone Model B', 'Electronics', 12, 150.00, '2023-12-20', 'Warehouse B', 'MobileGear Ltd', 1),
('SKU-003', 'Vintage Printer XL500', 'Office Supplies', 3, 300.00, '2023-11-10', 'Warehouse A', 'OfficeMax', 1),
('SKU-004', 'Winter Jacket 2020', 'Apparel', 45, 25.00, '2024-02-01', 'Warehouse C', 'Fashion Co', 1),
('SKU-005', 'Discontinued Router v1', 'Electronics', 8, 80.00, '2023-10-25', 'Warehouse B', 'NetworkPro', 1),
('SKU-006', 'Old Hard Drive 500GB', 'Electronics', 20, 45.00, '2023-09-15', 'Warehouse A', 'StorageMax', 1),
('SKU-007', 'Legacy Software License', 'Software', 2, 500.00, '2023-08-30', 'Digital', 'SoftwareLand', 1),
('SKU-008', 'Retro Monitor CRT', 'Electronics', 6, 120.00, '2023-07-20', 'Warehouse B', 'DisplayTech', 1),
('SKU-009', 'Old Keyboard Model', 'Electronics', 15, 35.00, '2024-01-05', 'Warehouse A', 'PeripheralGear', 1),
('SKU-010', 'Discontinued Mouse Pad', 'Office Supplies', 100, 5.00, '2023-06-15', 'Warehouse C', 'OfficeMax', 1);

-- Insert sample inventory transactions
INSERT INTO inventory_transactions (product_id, transaction_type, quantity_change, reason, performed_by) VALUES
(1, 'sale', -1, 'Customer purchase', 1),
(2, 'restock', 5, 'New stock arrival', 1),
(3, 'adjustment', -2, 'Damaged items removed', 2),
(4, 'write-off', -5, 'Items damaged beyond repair', 1),
(5, 'sale', -2, 'Customer purchase', 2);