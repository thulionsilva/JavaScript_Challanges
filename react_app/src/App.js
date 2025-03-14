
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Carrinho from './pages/Carrinho';
import Produto from './pages/Produto';

function App() {
  return (
    <div className="App">
      <headers className="App-header">
        <nav className="menu">
          <a className="menu-item" href="http://localhost:3000/">Home</a>
          <a className="menu-item" href="http://localhost:3000/sobre">Sobre</a>
          <a className="menu-item" href="http://localhost:3000/contato">Contato</a>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/produto/:id" element={<Produto />} />
        </Routes>

        </headers>

    </div>
    
  );
}

export default App;
