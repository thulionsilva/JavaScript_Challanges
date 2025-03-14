import { useParams } from 'react-router-dom';
import "../App.css";
import produtos from "../produtos.json";

function Produto() {
    const { id } = useParams();
    const produto = produtos.find(p => p.ID === parseInt(id));
    return (
        <div className="produto">
            <h1>Produto {id}</h1>
            <img src={process.env.PUBLIC_URL + produto.Imagem} alt={produto.Nome} />
            <h2>{produto.Nome}</h2>
            <p>{produto.Descrição}</p>
            <p>R$ {produto.Preço}</p>
            <button>Comprar</button>
        </div>
    );
}       
export default Produto;
