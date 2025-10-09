import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import AuthPage from './pages/AuthPage.jsx';
import Navbar from './components/Navbar.jsx';
import styles from './pages/Dashboard.module.css';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

// O Layout Autenticado agora é mais simples
const AuthenticatedLayout = ({ children }) => (
  <div>
    <Navbar />
    <main>{children}</main>
  </div>
);

// O Dashboard agora tem um cabeçalho e um conteúdo principal
const Dashboard = () => (
  <div>
    <header className={styles.pageHeader}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>Dashboard</h1>
      </div>
    </header>
    <div className={styles.pageContent}>
      <div className={styles.contentWrapper}>
        <div className={styles.card}>
          <p>
            Este é o conteúdo principal, visível apenas para usuários logados.
            A interface agora está mais limpa e organizada.
          </p>
          <p>
            A partir daqui, você pode construir qualquer funcionalidade que precise de um usuário
            autenticado, como uma página de perfil, configurações da conta, ou o conteúdo
            principal da sua aplicação.
          </p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            Carregando...
        </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <AuthenticatedLayout>
              <Dashboard />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
      <Route 
        path="/forgot-password" 
        element={user ? <Navigate to="/" /> : <ForgotPassword />} 
      />
      <Route 
        path="/reset-password" 
        element={user ? <Navigate to="/" /> : <ResetPassword />} 
      />
      <Route
        path="/auth"
        element={user ? <Navigate to="/" /> : <AuthPage />}
      />
    </Routes>
  );
}

export default App;