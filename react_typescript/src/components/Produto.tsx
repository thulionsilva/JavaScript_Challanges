import "../App.css";

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

function Produto(props:{ dados: ProdutoType }) {
    const pagina = "http://localhost:3000/produto/" + props.dados.ID
    return (
      <div className="Book">
        <div className="image-div">
          {/*}
        <button className="carrinho-button" onClick={() => props.adicionarAoCarrinho(props.dados)}>
            <img className="carrinho-image" src={process.env.PUBLIC_URL + "/shopping_cart.png"} alt="Carrinho" />
        </button>*/}
        <a href={pagina} target="_blank" rel="noopener noreferrer">
          <img src={process.env.PUBLIC_URL + props.dados.Imagem} className="cover" alt="logo"/>
        </a>
        </div>
        <h6>{props.dados.Nome}</h6>
        <h6 className="preco">R${props.dados.Preço}</h6>
      </div>
    );
  }

  export default Produto;