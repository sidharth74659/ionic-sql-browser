Repo: [ionic-sql-browser](https://github.com/sidharth74659/ionic-sql-browser.git)

### References:
- For SQL plugin: https://github.com/sql-js/sql.js
- For IndexedDB: https://web.dev/articles/storage-for-the-web 
- For Project Setup: Check the section: 'Project Setup' in the README.md file.

### Project Setup:
- check [project-setup.md](./guides/project-setup.md) for setting up the project.
- check [error-handling.md](./guides/error-handling.md) for error handling in the project.

### TODO:
Test the following functions:
- `exportDatabase`
- `importDatabase`
- `testFileSizeLimit`
- `testPersistence`
- `clearDatabase`
- and the list in [testing-list.md](./guides/testing-list.md)

---

```sql
-- - SQL Query Support: Test various types of SQL queries: 
-- a) Basic CRUD operations:
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com'); SELECT * FROM users; UPDATE users SET email = 'newalice@example.com' WHERE name = 'Alice'; DELETE FROM users WHERE name = 'Alice';
-- b) Table creation with different data types:
CREATE TABLE products (id INTEGER PRIMARY KEY,  name TEXT,  price REAL,  in_stock BOOLEAN,  created_at DATETIME );
-- c) Joins:
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, product_id INTEGER); INSERT INTO orders (user_id, product_id) VALUES (1, 1); SELECT users.name, products.name FROM users  JOIN orders ON users.id = orders.user_id  JOIN products ON products.id = orders.product_id;
-- d) Aggregate functions:
SELECT COUNT(*), AVG(price) FROM products;
-- e) Subqueries:
SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products);
-- f) Transactions:
BEGIN TRANSACTION; INSERT INTO products (name, price) VALUES ('New Product', 9.99); UPDATE inventory SET stock = stock - 1 WHERE product_id = LAST_INSERT_ROWID(); COMMIT;
-- g) Bulk insertion:
INSERT INTO users (name, email) VALUES  ('User1', 'user1@example.com'), ('User2', 'user2@example.com'), ('User3', 'user3@example.com');
```

---

The `sql.js` library is a JavaScript implementation of SQLite. It is a port of SQLite to WebAssembly, by compiling the SQLite C code with Emscripten. The library is used to run SQL queries in the browser.
