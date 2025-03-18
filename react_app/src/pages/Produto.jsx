import { useParams } from 'react-router-dom';
import "../App.css";
import produtos from "../produtos.json";

function Produto() {
    const { id } = useParams();
    const produto = produtos.find(p => p.ID === parseInt(id));

    const handleBuy = () => {
        const response = fetch('http://localhost:3030/api/compras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_name: "João", product_id: id}),
        });
        console.log(response);
    }
    return (
        <div className="App-header">

            <div className="produto-container">
                <img src={process.env.PUBLIC_URL + produto.Imagem} alt={produto.Nome} />
                <div className="produto-info">
                    <h2>{produto.Nome}</h2>
                    <p>{produto.Descrição}</p>
                    <p>R$ {produto.Preço}</p>
                    <button className="buy-button" onClick={handleBuy}>Comprar</button>
                </div>
            </div>

        </div>
    );
}       
export default Produto;
