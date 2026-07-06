# Setup Guide

## Prerequisites

- Node.js v14+
- PostgreSQL v12+
- npm or yarn

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and set:
- `DB_HOST`: PostgreSQL host (default: localhost)
- `DB_PORT`: PostgreSQL port (default: 5432)
- `DB_NAME`: Database name (default: dead_stock_tracker)
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `JWT_SECRET`: Your secret key for JWT
- `CORS_ORIGIN`: Frontend URL

### 3. Create Database
```bash
creatdb dead_stock_tracker
```

### 4. Run Migrations
```bash
npm run migrate
```

### 5. Seed Sample Data (Optional)
```bash
npm run seed
```

### 6. Start Backend Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd ../frontend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Frontend
```bash
npm start
```

App will open at `http://localhost:3000`

## Database Setup

### Create Database
```bash
psql -U postgres
CREATE DATABASE dead_stock_tracker;
\q
```

### Run Schema
```bash
psql -U postgres -d dead_stock_tracker -f database/schema.sql
```

### Seed Data
```bash
psql -U postgres -d dead_stock_tracker -f database/seeds.sql
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Inventory
- `GET /api/inventory/summary` - Get inventory summary
- `GET /api/inventory/dead-stock` - Get dead stock items
- `GET /api/inventory/by-category` - Group by category
- `GET /api/inventory/low-stock` - Get low stock items

### Dashboard
- `GET /api/dashboard` - Get dashboard analytics

### Reports
- `GET /api/reports/dead-stock` - Dead stock report
- `GET /api/reports/category` - Category report
- `GET /api/reports/value` - Value report

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error
- Check PostgreSQL is running
- Verify `.env` database credentials
- Ensure database exists

### CORS Errors
- Update `CORS_ORIGIN` in backend `.env`
- Ensure frontend URL matches

## Production Deployment

See deployment documentation for production setup.