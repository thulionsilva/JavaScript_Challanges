import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';


const db = new sqlite3.Database('./src/carrinho.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS compras (id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, product_id INTEGER)");
});

db.run("INSERT INTO compras (user_name, product_id) VALUES (?, ?)", ["John Doe", 1]);

export default db;
