import { Request, Response } from 'express';
import express, {Application} from 'express';
import database from './database';
import dotenv from 'dotenv';
import { appendFile, appendFileSync } from 'node:fs';

type compraType = {
    "user_name": string;
    "product_id": number;
    "last_added": number;
    "quantity": number;
}

type LoginRequestBody = {
    username: string;
    password: string;
}

type UpdateRequestBody = {
    username: string;
    password: string;
    email: string;
    nome: string;
}

type ComprasRequestBody = {
    user_name: string;
    product_id: number;
}

type ComprasDeleteRequestBody = {
    user_name: string;
    product_id: number;
    last_added: number | null;
}


type ComprasQuery = {
    user_name: string;
}
const app: Application = express();
const port: number = 3030;

app.use(express.json());

app.post('/api/login', (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    const {username, password}  = req.body;
    database.all(`SELECT user_name, password FROM store_users WHERE user_name = ? and password = ? limit 1`, [username, password], (err, rows) => {
    res.json(rows);});
});

app.get('/api/userData', (req: Request<{}, {}, {}, ComprasQuery>, res: Response) => {
    if (!req.query.user_name) {
        res.status(400).send('user_name is required');
        return;
    }
    database.all(`SELECT user_name, email, nome FROM store_users WHERE user_name = ?`, [req.query.user_name], (err, rows) => {
        res.json(rows);
    });
});

app.post('/api/updateProfile', (req: Request<{}, {}, UpdateRequestBody>, res: Response) => {
    const {username, password, email, nome}  = req.body;
    database.run(`UPDATE store_users SET password = ?, email = ?, nome = ? WHERE user_name = ?`, [password, email, nome, username]);
    res.send('Perfil atualizado com sucesso');
});

app.post('/api/compras', (req: Request<{}, {}, ComprasRequestBody>, res: Response) => {
    const { user_name, product_id } = req.body;
    database.run(`INSERT INTO compras (user_name, product_id) VALUES (?, ?)`, [user_name, product_id]);
    res.send('Compra realizada com sucesso');
});

app.get('/api/compras', (req: Request<{}, {}, {}, ComprasQuery>, res: Response) => {
    if (!req.query.user_name) {
        res.status(400).send('user_name is required');
        return;
    }
    database.all(`SELECT user_name, product_id, MAX(id) as last_added, COUNT(product_id) as quantity
         FROM compras 
         where product_id is not null and user_name = ? GROUP BY user_name, product_id`,
         [req.query.user_name], (err: Error, rows: compraType) => {
        res.json(rows);
    });
});

app.delete('/api/compras', (req: Request<{}, {}, ComprasDeleteRequestBody>, res: Response) => {
    if (!req.body.last_added) {
        database.run(`DELETE FROM compras WHERE user_name = ? and product_id = ?`, [req.body.user_name, req.body.product_id]);
    }
    else {
        database.run(`DELETE FROM compras WHERE user_name = ? and product_id = ? and id = ?`, [req.body.user_name, req.body.product_id, req.body.last_added]);
    }
    
    res.send('Compras apagadas com sucesso');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

