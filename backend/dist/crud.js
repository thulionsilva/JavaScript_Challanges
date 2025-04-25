"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const port = 3030;
app.use(express_1.default.json());
app.post('/api/compras', (req, res) => {
    const { user_name, product_id } = req.body;
    database_1.default.run("INSERT INTO compras (user_name, product_id) VALUES (?, ?)", [user_name, product_id]);
    res.send('Compra realizada com sucesso');
});
app.get('/api/compras', (req, res) => {
    database_1.default.all("SELECT user_name, product_id, MAX(id) as last_added, COUNT(product_id) as quantity FROM compras where product_id is not null GROUP BY user_name, product_id", (err, rows) => {
        res.json(rows);
    });
});
app.delete('/api/compras', (req, res) => {
    if (!req.body.last_added) {
        database_1.default.run("DELETE FROM compras WHERE user_name = ? and product_id = ?", [req.body.user_name, req.body.product_id]);
    }
    else {
        database_1.default.run("DELETE FROM compras WHERE user_name = ? and product_id = ? and id = ?", [req.body.user_name, req.body.product_id, req.body.last_added]);
    }
    res.send('Compras apagadas com sucesso');
});
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
