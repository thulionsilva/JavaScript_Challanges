import Produto from "../components/Produto";
import produtos from "../produtos.json";
function Home() {
    return (
      <div className="App">
        <headers className="App-header">
          <p>
            <div className="Teste">
                <h2>Nosso catálogo</h2>
            </div>
          </p>
          <div className="produtos"> 
  
            { produtos.map((produto) => (
              <Produto dados={produto} />
            ))}
            
          </div>
  
          </headers>
  
      </div>
      
    );
  }
  
  export default Home;