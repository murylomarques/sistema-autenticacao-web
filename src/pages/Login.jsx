import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  // Estados para controlar os campos do formulário
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Estados para feedback visual (mensagens de erro e estado de carregamento)
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Obtendo a função de login do nosso contexto de autenticação
  const { login } = useContext(AuthContext);
  // Hook do React Router para nos permitir navegar programaticamente
  const navigate = useNavigate();

  // Função chamada quando o formulário é submetido
  const handleLogin = async (e) => {
    // Previne o comportamento padrão do formulário de recarregar a página
    e.preventDefault();

    // Limpa mensagens antigas e ativa o estado de carregamento
    setMessage('');
    setLoading(true);

    try {
      // Chama a função login do AuthContext, que por sua vez chama o AuthService
      await login(username, password);
      
      // Se o login for bem-sucedido, navega para a página inicial
      navigate('/');
    } catch (error) {
      // Se ocorrer um erro, constrói uma mensagem de erro amigável
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      
      setMessage(resMessage);
    } finally {
      // Desativa o estado de carregamento, independentemente de sucesso ou falha
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Página de Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? <span>Carregando...</span> : <span>Login</span>}
          </button>
        </div>
      </form>

      {/* Exibe a mensagem de erro, se houver uma */}
      {message && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;