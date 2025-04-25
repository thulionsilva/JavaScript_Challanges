"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const db = new sqlite3_1.default.Database('./src/carrinho.db');
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS compras (id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, product_id INTEGER)");
});
db.run("INSERT INTO compras (user_name, product_id) VALUES (?, ?)", ["John Doe", 1]);
exports.default = db;
