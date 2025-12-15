-- SQL script to create the database schema and seed data
-- Target: PostgreSQL

-- Create schema (public assumed)
-- Tables: role, "user", product, shopping_list

-- Drop tables if they exist (careful in production)
DROP TABLE IF EXISTS shopping_list;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS role;

-- Create role table
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  permissions JSONB
);

-- Create user table
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INTEGER NOT NULL,
  CONSTRAINT fk_user_role FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE RESTRICT
);

-- Create product table
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  unit VARCHAR(50),
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  image_url VARCHAR(1024),
  description TEXT
);

-- Create shopping_list table
CREATE TABLE shopping_list (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  product_unit VARCHAR(50),
  priority VARCHAR(50),
  status VARCHAR(50),
  CONSTRAINT fk_shopping_product FOREIGN KEY(product_id) REFERENCES product(id) ON DELETE CASCADE
);

-- Seed data from database/database.js

-- Roles
INSERT INTO role (id, name, description, permissions) VALUES
  (1, 'Admin', 'Administrator - full access to all features', '["dashboard","products","shopping-list","settings","users"]'::jsonb),
  (2, 'Buyer', 'Buyer - can only access shopping list', '["shopping-list"]'::jsonb);

-- Users
INSERT INTO "user" (id, name, email, password, role_id) VALUES
  (1, 'Admin User', 'admin@primestock.com', 'admin123', 1),
  (2, 'Buyer User', 'buyer@primestock.com', 'buyer123', 2);

-- Products
INSERT INTO product (id, name, unit, price, stock_quantity, image_url, description) VALUES
  (1, 'Flour (All-Purpose)', 'kg', 5.99, 50, '/uploads/products/flour.jpg', 'High-quality all-purpose flour for baking'),
  (2, 'Sugar (Granulated)', 'kg', 3.49, 75, '/uploads/products/sugar.jpg', 'Pure granulated sugar for baking');

-- Shopping list
INSERT INTO shopping_list (id, product_id, product_name, quantity, product_unit, priority, status) VALUES
  (1, 1, 'Flour (All-Purpose)', 10, 'kg', 'high', 'pending');

-- Set sequences to max(id)+1 to avoid conflicts when inserting without explicit id
SELECT setval(pg_get_serial_sequence('role','id'), (SELECT COALESCE(MAX(id),0) FROM role));
SELECT setval(pg_get_serial_sequence('"user"','id'), (SELECT COALESCE(MAX(id),0) FROM "user"));
SELECT setval(pg_get_serial_sequence('product','id'), (SELECT COALESCE(MAX(id),0) FROM product));
SELECT setval(pg_get_serial_sequence('shopping_list','id'), (SELECT COALESCE(MAX(id),0) FROM shopping_list));

-- Done
