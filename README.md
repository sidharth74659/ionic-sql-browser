
---

```sql
- SQL Query Support: Test various types of SQL queries: 
a) Basic CRUD operations:
`INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com'); SELECT * FROM users; UPDATE users SET email = 'newalice@example.com' WHERE name = 'Alice'; DELETE FROM users WHERE name = 'Alice';`
b) Table creation with different data types:
`CREATE TABLE products (   id INTEGER PRIMARY KEY,  name TEXT,  price REAL,  in_stock BOOLEAN,  created_at DATETIME );`
c) Joins:
`CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, product_id INTEGER); INSERT INTO orders (user_id, product_id) VALUES (1, 1); SELECT users.name, products.name FROM users  JOIN orders ON users.id = orders.user_id  JOIN products ON products.id = orders.product_id;`
d) Aggregate functions:
`SELECT COUNT(*), AVG(price) FROM products;`
e) Subqueries:
`SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products);`
f) Transactions:
`BEGIN TRANSACTION; INSERT INTO products (name, price) VALUES ('New Product', 9.99); UPDATE inventory SET stock = stock - 1 WHERE product_id = LAST_INSERT_ROWID(); COMMIT;`
g) Bulk insertion:
`INSERT INTO users (name, email) VALUES  ('User1', 'user1@example.com'), ('User2', 'user2@example.com'), ('User3', 'user3@example.com');`
```