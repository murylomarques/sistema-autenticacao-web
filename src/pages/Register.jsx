import { useState } from 'react';
import AuthService from '../services/AuthService'; // Importamos nosso serviço

const Register = () => {
  // 1. Estados para gerenciar os campos do formulário
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Estados para gerenciar o feedback ao usuário
  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);

  // 3. Função para lidar com a submissão do formulário
  const handleRegister = async (e) => {
    e.preventDefault(); // Previne o recarregamento padrão da página

    setMessage(''); // Limpa mensagens anteriores
    setSuccessful(false);

    try {
      // 4. Chama o método de registro do nosso serviço
      const response = await AuthService.register(username, email, password);
      setMessage(response.data.message); // Exibe a mensagem de sucesso da API
      setSuccessful(true);
    } catch (error) {
      // 5. Se houver erro, captura a mensagem de erro da API
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setMessage(resMessage);
      setSuccessful(false);
    }
  };

  return (
    <div>
      <h2>Página de Registro</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          />
        </div>
        <div>
          <button type="submit">Registrar</button>
        </div>
      </form>

      {/* 6. Exibe a mensagem de feedback */}
      {message && (
        <div style={{ color: successful ? 'green' : 'red' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;