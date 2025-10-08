import { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

// 1. Cria o Contexto
const AuthContext = createContext();

// 2. Cria o Provedor do Contexto
const AuthProvider = ({ children }) => {
  // 3. Estado para guardar os dados do usuário
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 4. Efeito para carregar o usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // 5. Funções de Login e Logout
  const login = async (username, password) => {
    const response = await AuthService.login(username, password);
    localStorage.setItem('user', JSON.stringify(response.data));
    setUser(response.data);
  };

  const logout = () => {
    AuthService.logout(); // (Vamos criar esta função no AuthService)
    localStorage.removeItem('user');
    setUser(null);
  };

  // 6. O valor que será compartilhado com todos os componentes
  const value = {
    user,
    loading,
    login,
    logout,
  };

  // 7. Retorna o Provedor com o valor, envolvendo os componentes filhos
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };