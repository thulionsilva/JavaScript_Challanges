import Produto from "../components/Produto";
import produtos from "../produtos.json";

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

function Home() {
    return (
      <div className="App">
        <div className="App-header">
            <div className="Teste">
                <h2>Nosso catálogo</h2>
            </div>
          <div className="produtos"> 
  
            { produtos.map((produto:ProdutoType) => (
              <Produto dados={produto} />
            ))}
            
          </div>
  
          </div>
  
      </div>
      
    );
  }
  
  export default Home;
