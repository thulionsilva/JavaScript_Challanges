import sqlite3 from 'sqlite3';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const SCHEMA = process.env.DB_SCHEMA || 'public';
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5433')
});

const db = {
    query: async (text: string, params: any[]) => {
    const query_result = await pool.query(text, params);
    console.log('executou a query', query_result.rows);
        return query_result.rows;
    }
};

db.query(`CREATE SCHEMA IF NOT EXISTS ${SCHEMA}`, []);
db.query(`CREATE TABLE IF NOT EXISTS "${SCHEMA}".compras (id SERIAL PRIMARY KEY, user_name TEXT, product_id INTEGER)`, []);

db.query(`INSERT INTO "${SCHEMA}".compras (user_name, product_id) VALUES ($1, $2)`, ["John Doe", 1])

/*

const db = new sqlite3.Database('./src/carrinho.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS compras (id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, product_id INTEGER)");
});

db.run("INSERT INTO compras (user_name, product_id) VALUES (?, ?)", ["John Doe", 1]);
*/
export default db;
