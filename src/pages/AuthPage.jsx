import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';
import styles from './AuthPage.module.css';
import { toast } from 'react-toastify';


const AuthPage = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginUsername, loginPassword);
      navigate('/');
    } catch (error) {
      const resMessage = (error.response?.data?.message) || 'Credenciais inválidas.';
      toast.error(resMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await AuthService.register(regUsername, regEmail, regPassword);
      toast.success(response.data.message + " Agora, faça o login.");
      setIsSignUpActive(false);
      setRegUsername(''); setRegEmail(''); setRegPassword('');
    } catch (error) {
      const resMessage = (error.response?.data?.message) || 'Erro ao registrar.';
      toast.error(resMessage);
    } finally {
      setLoading(false);
    }
  };

  const containerClass = `${styles.container} ${isSignUpActive ? styles.rightPanelActive : ''}`;

  return (
    <div className={styles.pageContainer}>
      <div className={containerClass}>

        {/* Formulário de Registro */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form onSubmit={handleRegister}>
            <h1>Criar Conta</h1>
            <div className={styles.socialContainer}>
              <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>ou use seu e-mail para se registrar</span>
            <div className={styles.inputGroup}>
              <i className="fa fa-user"></i>
              <input
                type="text"
                placeholder="Nome"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <i className="fa fa-envelope"></i>
              <input
                type="email"
                placeholder="E-mail"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Senha"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? '...' : 'Registrar'}
            </button>
          </form>
        </div>

        {/* Formulário de Login */}
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form onSubmit={handleLogin}>
            <h1>Entrar</h1>
            <div className={styles.socialContainer}>
              <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>ou use sua conta</span>
            <div className={styles.inputGroup}>
              <i className="fa fa-user"></i>
              <input
                type="text"
                placeholder="Usuário"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <i className="fa fa-lock"></i>
              <input
                type="password"
                placeholder="Senha"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
     
            <Link to="/forgot-password" className={styles.forgotLink}>Esqueceu sua senha?</Link>
            <button type="submit" disabled={loading}>
              {loading ? '...' : 'Entrar'}
            </button>
          </form>
        </div>

        {/* Painel de Transição */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1>Bem-vindo de volta!</h1>
              <p>Para continuar conectado, faça login com suas informações pessoais</p>
              <button className={styles.ghost} onClick={() => setIsSignUpActive(false)}>
                Entrar
              </button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1>Olá, amigo!</h1>
              <p>Insira seus dados pessoais e comece sua jornada conosco</p>
              <button className={styles.ghost} onClick={() => setIsSignUpActive(true)}>
                Registrar
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
