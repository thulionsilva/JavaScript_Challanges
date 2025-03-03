//import logo from './produto1.jpg';
import './App.css';
import produtos from './produtos.json';
//import PDF from './/documents//Bogdan M. Wilamowski, J. David Irwin - Industrial Communication Systems.pdf';

//https://api.whatsapp.com/send/?phone=5581997573181&text=urlencodedtext



function Cabecalho() {
  return (

    <div className="Teste">
      
      <h2>Nosso catálogo</h2>
    </div>
  );
}

/*
function Book(props) {
  return (
    <div className="Book">
    <a href={props.Path} target="_blank" rel="noopener noreferrer">
    <h4>Industrial Communication Systems</h4>
    <img src={props.logo} className="cover" alt="logo"/>
  </a>
  </div>
  );
}

*/
function Produto(props) {
  const numero = 5581996563134
  const texto = "Olá! Gostei do produto " + props.dados.Nome + " ID: " + props.dados.ID + " e quero comprar. Me envie o link para pagamento."
  const url = `https://api.whatsapp.com/send/?phone=${numero}&text=${texto}`
  return (
    <div className="Book">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={process.env.PUBLIC_URL + props.dados.Imagem} className="cover" alt="logo"/>
      </a>
      <h6>{props.dados.Nome}</h6>
      <p className="descricao">{props.dados.Descrição}</p>
      <h6 className="preco">R${props.dados.Preço}</h6>
    </div>
  );
}



function App() {
  return (
    <div className="App">
      <headers className="App-header">
        <p>
          <Cabecalho />
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

export default App;
