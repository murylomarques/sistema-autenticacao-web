import axios from 'axios';

// A URL base da nossa API. Todas as chamadas usarão este prefixo.
// Lembre-se de que sua API Spring Boot está rodando na porta 8080.
const API_URL = 'http://localhost:8080/api/auth/';

/**
 * Função para registrar um novo usuário.
 * @param {string} username - O nome de usuário.
 * @param {string} email - O e-mail do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {Promise} - A promessa da resposta da API.
 */
const register = (username, email, password) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password,
  });
};
const forgotPassword = (email) => {
    return axios.post(API_URL + 'forgot-password', {
      email,
    });
  };
  
  const resetPassword = (token, newPassword) => {
    return axios.post(API_URL + 'reset-password', {
      token,
      newPassword,
    });
  };
/**
 * Função para logar um usuário.
 * @param {string} username - O nome de usuário.
 * @param {string} password - A senha do usuário.
 * @returns {Promise} - A promessa da resposta da API.
 */
const login = (username, password) => {
  return axios.post(API_URL + 'signin', {
    username,
    password,
  });
  // No futuro, salvaremos o token JWT aqui.
};
const logout = () => {
    // Como o JWT é stateless, o logout no front-end é simplesmente
    // remover o token do armazenamento local.
    // O back-end não precisa ser notificado.
    localStorage.removeItem('user');
  };
  
// Exporta as funções para que possam ser usadas em outras partes da aplicação.
const AuthService = {
  register,
  login,
  logout,
  forgotPassword, 
  resetPassword,  
  
};

export default AuthService;