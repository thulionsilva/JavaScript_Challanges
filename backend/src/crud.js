const database = require('./database');
const express = require('express');
const app = express();
const port = 3030;

app.use(express.json());

app.post('/api/compras', (req, res) => {
    const { user_name, product_id, quantity } = req.body;
    database.run("INSERT INTO compras (user_name, product_id, quantity) VALUES (?, ?, ?)", [user_name, product_id, quantity]);
    res.send('Compra realizada com sucesso');
});

app.get('/api/compras', (req, res) => {
    database.all("SELECT * FROM compras", (err, rows) => {
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
