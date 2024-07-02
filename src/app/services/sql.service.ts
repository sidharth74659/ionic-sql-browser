import { Injectable } from '@angular/core';
import initSqlJs, { Database } from 'sql.js/dist/sql-wasm';


@Injectable({
  providedIn: 'root'
})
export class SqlService {
  private db!: Database;

  constructor() { }

  async initializeDatabase() {
    const SQL = await initSqlJs({
      locateFile: file => `assets/${file}`
    });
    this.db = new SQL.Database();
  }

  getSqlCommands() {
    return ([
      { value: "SELECT * FROM users;", displayText: "Select all users" },
      { value: "INSERT INTO users (name, email) VALUES ('john_doe', 'john@example.com');", displayText: "Insert a new user" },
      { value: "UPDATE users SET email = 'john_updated@example.com' WHERE name = 'john_doe';", displayText: "Update John Doe's email" },
      { value: "DELETE FROM users WHERE name = 'john_doe';", displayText: "Delete John Doe" }
    ]);
  }
  
  getAdvancedSqlCommands() {
    return ([
      {
        value: `INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com'); INTO users (name, email) VALUES ('Test', 'test@example.com'); SELECT * FROM users; UPDATE users SET email = 'newalice@example.com' WHERE name = 'Alice'; DELETE FROM users WHERE name = 'Alice';SELECT * FROM users;`,
        displayText: "Basic CRUD operations"
      },
      {
        value: `CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, in_stock BOOLEAN, created_at DATETIME);
        INSERT INTO products (name, price, in_stock, created_at) VALUES ('Product1', 9.99, 1, '2021-01-01 10:00:00');
        INSERT INTO products (name, price, in_stock, created_at) VALUES ('Product2', 19.99, 0, '2021-01-02 10:00:00');
        INSERT INTO products (name, price, in_stock, created_at) VALUES ('Product3', 29.99, 1, '2021-01-03 10:00:00');
        SELECT * FROM products;
        `,
        displayText: "Create and insert data into 'products' table"
      },
      {
        value: "CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, product_id INTEGER); INSERT INTO orders (user_id, product_id) VALUES (1, 1); SELECT users.name, products.name FROM users JOIN orders ON users.id = orders.user_id JOIN products ON products.id = orders.product_id;",
        displayText: "Joins"
      },
      {
        value: "SELECT COUNT(*), AVG(price) FROM products;",
        displayText: "Aggregate functions"
      },
      {
        value: "SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products);",
        displayText: "Subqueries"
      },
      {
        value: "INSERT INTO users (name, email) VALUES ('User1', 'user1@example.com'), ('User2', 'user2@example.com'), ('User3', 'user3@example.com');SELECT * FROM users;",
        displayText: "Bulk insertion"
      }
    ]);
  }
/* 
  async initializeDatabase() {
    const SQL = await initSqlJs();
    this.db = new SQL.Database();
  }
 */
  executeQuery(query: string): any[] {
    try {
      const result = this.db.exec(query);
      return result;
    } catch (error) {
      console.error('SQL Error:', error);
      throw error;
    }
  }
}