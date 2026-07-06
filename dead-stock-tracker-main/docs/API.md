# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All endpoints (except `/auth/login` and `/auth/register`) require JWT token in header:
```
Authorization: Bearer {token}
```

---

## Auth Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}

Response: 201
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  },
  "token": "eyJhbGc..."
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  },
  "token": "eyJhbGc..."
}
```

---

## Products Endpoints

### Get All Products
```
GET /products

Response: 200
[
  {
    "id": 1,
    "sku": "SKU-001",
    "name": "Product Name",
    "category": "Electronics",
    "quantity": 10,
    "cost": 100.00,
    "last_sale_date": "2024-01-15",
    "location": "Warehouse A",
    "supplier": "Supplier Inc",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### Get Product by ID
```
GET /products/:id

Response: 200
{
  "id": 1,
  "sku": "SKU-001",
  "name": "Product Name",
  "category": "Electronics",
  "quantity": 10,
  "cost": 100.00,
  "last_sale_date": "2024-01-15",
  "location": "Warehouse A",
  "supplier": "Supplier Inc"
}
```

### Create Product
```
POST /products
Content-Type: application/json

{
  "sku": "SKU-001",
  "name": "Product Name",
  "category": "Electronics",
  "quantity": 10,
  "cost": 100.00,
  "last_sale_date": "2024-01-15",
  "location": "Warehouse A",
  "supplier": "Supplier Inc"
}

Response: 201
{
  "message": "Product created successfully",
  "product": { ... }
}
```

### Update Product
```
PUT /products/:id
Content-Type: application/json

{
  "sku": "SKU-001",
  "name": "Updated Name",
  "quantity": 15,
  ...
}

Response: 200
{
  "message": "Product updated successfully",
  "product": { ... }
}
```

### Delete Product
```
DELETE /products/:id

Response: 200
{
  "message": "Product deleted successfully"
}
```

---

## Inventory Endpoints

### Get Summary
```
GET /inventory/summary

Response: 200
{
  "total_items": 150,
  "total_quantity": 1250,
  "total_value": 125000.00,
  "categories": 5
}
```

### Get Dead Stock
```
GET /inventory/dead-stock

Response: 200
[
  {
    "id": 1,
    "sku": "SKU-001",
    "name": "Old Product",
    "quantity": 5,
    "cost": 50.00,
    "last_sale_date": "2023-10-15",
    "location": "Warehouse A"
  }
]
```

### Get by Category
```
GET /inventory/by-category

Response: 200
[
  {
    "category": "Electronics",
    "item_count": 50,
    "total_quantity": 500,
    "total_value": 50000.00
  }
]
```

### Get Low Stock
```
GET /inventory/low-stock

Response: 200
[
  {
    "id": 1,
    "sku": "SKU-001",
    "name": "Low Stock Item",
    "quantity": 5,
    ...
  }
]
```

---

## Dashboard Endpoints

### Get Analytics
```
GET /dashboard

Response: 200
{
  "summary": {
    "total_products": 150,
    "total_quantity": 1250,
    "total_value": 125000.00
  },
  "deadStockCount": 25,
  "topCategories": [ ... ],
  "recentProducts": [ ... ]
}
```

---

## Reports Endpoints

### Dead Stock Report
```
GET /reports/dead-stock

Response: 200
{
  "report_type": "Dead Stock Report",
  "generated_at": "2024-01-15T10:30:00Z",
  "total_items": 25,
  "total_value": 12500.00,
  "items": [ ... ]
}
```

### Category Report
```
GET /reports/category

Response: 200
{
  "report_type": "Category Report",
  "generated_at": "2024-01-15T10:30:00Z",
  "categories": [
    {
      "category": "Electronics",
      "total_items": 50,
      "total_quantity": 500,
      "total_value": 50000.00,
      "avg_cost": 100.00
    }
  ]
}
```

### Value Report
```
GET /reports/value

Response: 200
{
  "report_type": "Value Report (Top 50)",
  "generated_at": "2024-01-15T10:30:00Z",
  "total_value": 200000.00,
  "items": [ ... ]
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 404 Not Found
```json
{
  "error": "Product not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal Server Error"
}
```