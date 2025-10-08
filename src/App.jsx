import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import AuthPage from './pages/AuthPage.jsx'; // Certifique-se de que a extensão está aqui se necessário
import Navbar from './components/Navbar.jsx'; // Importe a Navbar

// --- Componente de Layout para Páginas Autenticadas ---
// Este componente envolve as páginas que o usuário vê depois de logar
const AuthenticatedLayout = ({ children }) => {
  return (
    <div>
      <Navbar /> {/* A barra de navegação com o botão de logout */}
      <main style={{ padding: '2rem' }}>
        {children} {/* O conteúdo da página (ex: Dashboard) */}
      </main>
    </div>
  );
};

// --- Componente de Página de Dashboard ---
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard Secreto</h1>
      <p>Este é o conteúdo principal, visível apenas para usuários logados.</p>
    </div>
  );
};

// --- Componente Principal da Aplicação ---
function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            // Se o usuário está logado, mostra o layout autenticado com o Dashboard dentro
            <AuthenticatedLayout>
              <Dashboard />
            </AuthenticatedLayout>
          ) : (
            // Se não, redireciona para a página de autenticação
            <Navigate to="/auth" />
          )
        }
      />
      <Route
        path="/auth"
        element={
          user ? (
            // Se o usuário está logado e tenta acessar /auth, redireciona para o dashboard
            <Navigate to="/" />
          ) : (
            // Se não, mostra a página de login/registro
            <AuthPage />
          )
        }
      />
      
      {/* Você pode adicionar mais rotas protegidas aqui no futuro */}
      {/* Exemplo:
      <Route
        path="/profile"
        element={
          user ? (
            <AuthenticatedLayout>
              <ProfilePage />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
      */}
    </Routes>
  );
}

export default App;