import { Request, Response } from 'express';
import express from 'express';
import database from './database';
import dotenv from 'dotenv';
import { appendFile, appendFileSync } from 'node:fs';

const app = express();
const port = 3030;

const SCHEMA = process.env.DB_SCHEMA || 'public';

app.use(express.json());

app.post('/api/compras', (req: Request, res: Response) => {
    const { user_name, product_id} = req.body;
    database.query(`INSERT INTO ${SCHEMA}.compras (user_name, product_id) VALUES ($1, $2)`, [user_name, product_id]);
    res.send('Compra realizada com sucesso');
});

//fetch data do banco de dados

app.get('/api/compras', (req, res) => {
    database.query(`SELECT user_name, product_id, MAX(id) as last_added, COUNT(product_id) as quantity FROM ${SCHEMA}.compras where product_id is not null GROUP BY user_name, product_id`, []).then((rows) => {
        res.json(rows);
    });
});

app.delete('/api/compras', (req, res) => {
    if (!req.body.last_added) {
        database.query(`DELETE FROM ${SCHEMA}.compras WHERE user_name = $1 and product_id = $2`, [req.body.user_name, req.body.product_id]);
    }
    else {
        database.query(`DELETE FROM ${SCHEMA}.compras WHERE user_name = $1 and product_id = $2 and id = $3`, [req.body.user_name, req.body.product_id, req.body.last_added]);
    }
    
    res.send('Compras apagadas com sucesso');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

