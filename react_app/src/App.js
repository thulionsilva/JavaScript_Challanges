import logo from './capa.jpg';
import './App.css';
import PDF from './/documents//Bogdan M. Wilamowski, J. David Irwin - Industrial Communication Systems.pdf';

function Teste() {
  return (
    <div className="Teste">
      <h2>My first Function Based Component</h2>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <headers className="App-header">
        <div> year </div>
        <div>
          <a href={PDF} target="_blank" rel="noopener noreferrer">
          <h4>Industrial Communication Systems</h4>
          <img src={logo} className="cover" alt="logo"/>
        </a>
        </div>
        <p>
          <Teste />
        </p>
        </headers>

    </div>
    
  );
}

export default App;
