import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <nav>
        {/* Aqui podemos colocar um menu de navegação no futuro */}
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* A rota "/" será a nossa página principal ou de login no futuro */}
        <Route path="/" element={<h2>Página Inicial</h2>} />
      </Routes>
    </div>
  )
}

export default App