const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('carrinho.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS compras (id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, product_id INTEGER)");
});

db.run("INSERT INTO compras (user_name, product_id) VALUES (?, ?)", ["John Doe", 1]);

module.exports = db;
