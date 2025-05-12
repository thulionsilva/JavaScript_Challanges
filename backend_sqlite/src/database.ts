import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';


const db = new sqlite3.Database('./src/carrinho.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS compras (id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, product_id INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS store_users (id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, password TEXT, email TEXT)");
    // db.run("DELETE FROM store_users");
});

db.run("INSERT INTO compras (user_name, product_id) VALUES (?, ?)", ["Thulio", 1]);
// db.run("INSERT INTO store_users (user_name, password, email) VALUES (?, ?, ?)", ["Thulio", "1234", "thulionascimento1@gmail.com"]);
export default db;
