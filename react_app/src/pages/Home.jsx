import Produto from "../components/Produto";
import produtos from "../produtos.json";
function Home() {
    return (
      <div className="App">
        <div className="App-header">
            <div className="Teste">
                <h2>Nosso catálogo</h2>
            </div>
          <div className="produtos"> 
  
            { produtos.map((produto) => (
              <Produto dados={produto} />
            ))}
            
          </div>
  
          </div>
  
      </div>
      
    );
  }
  
  export default Home;
