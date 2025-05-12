import { useParams } from 'react-router-dom';
import "../App.css";
import produtos from "../produtos.json";
import { useAuth } from '../contexts/LoginContext';

type ParamsType = {
    id: string;
}

type ProdutoType = {
    "ID": number;
    "Nome": string,
    "Preço": number,
    "Imagem": string,
    "Descrição": string,
    "Categoria": string,
    "Subcategoria": string,
    "Marca": string
    }

function Produto() {

    const { id } = useParams<ParamsType>();
    const { user } = useAuth();
    const produtosTyped: ProdutoType[] = produtos as ProdutoType[];
    if (!id) {
        return <div>Produto não encontrado</div>;
    }
    const parsedId = parseInt(id, 10);
    const produto = produtosTyped.find(p => p.ID === parsedId);


    const handleBuy = async () => {
        const response = await fetch('http://localhost:3030/api/compras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_name: user, product_id: id}),
        });
        console.log(response);
        window.location.href = '/carrinho';
    }
    if (!produto) {
        return <div>Produto não encontrado</div>;
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
