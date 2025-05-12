
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Carrinho from './pages/Carrinho';
import Produto from './pages/Produto';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <nav className="menu">
          <a className="menu-item" href="http://localhost:3000/">Home</a>
          <a className="menu-item" href="http://localhost:3000/sobre">Sobre</a>
          <a className="menu-item" href="http://localhost:3000/contato">Contato</a>
          <a className="menu-item" href="http://localhost:3000/carrinho">Carrinho</a>
          <a className="menu-item" href="http://localhost:3000/login">Login</a>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/produto/:id" element={<Produto />} />
        </Routes>

        </div>

    </div>
    
  );
}

export default App;