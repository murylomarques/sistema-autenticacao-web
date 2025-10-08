import { Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react'; // Importe useContext
import { AuthContext } from './context/AuthContext'; // Importe nosso contexto
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const { user, logout } = useContext(AuthContext); // Use o contexto

  return (
    <div>
      <nav>
        {user ? (
          // Se o usuário estiver logado
          <div>
            <span>Bem-vindo, {user.username}!</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          // Se não estiver logado
          <div>
            <Link to="/login">Login</Link> | <Link to="/register">Registro</Link>
          </div>
        )}
      </nav>

      <hr />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            user ? (
              <h2>Seu Dashboard Secreto</h2>
            ) : (
              <h2>Página Inicial Pública</h2>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;