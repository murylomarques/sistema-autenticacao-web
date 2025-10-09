import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../services/AuthService';
import AuthLayout from '../components/AuthLayout';
import styles from './ResetPassword.module.css'; // Usando seu próprio estilo

const ResetPassword = () => {
  // Hooks para ler a URL e navegar
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Estados do formulário
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Efeito que roda uma vez para pegar o token da URL
  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    }
  }, [searchParams]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validação client-side
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    try {
      await AuthService.resetPassword(token, password);
      toast.success("Senha redefinida com sucesso! Agora você pode fazer o login.");
      // Redireciona para a página de login após um pequeno atraso
      setTimeout(() => {
        navigate('/auth');
      }, 2000);
    } catch (error) {
      const resMessage = (error.response?.data?.message) || "Token inválido ou expirado.";
      toast.error(resMessage);
    } finally {
      setLoading(false);
    }
  };

  // Se o usuário chegar na página sem um token na URL, mostra um erro
  if (!token) {
    return (
      <AuthLayout>
        <div className={styles.errorMessage}>
          <strong>Token Inválido</strong>
          <p>O link de redefinição de senha é inválido ou está faltando. Por favor, solicite um novo link.</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/forgot-password" className={styles.backLink}>
            &larr; Solicitar Novo Link
          </Link>
        </div>
      </AuthLayout>
    );
  }
  
  // Se tiver um token, mostra o formulário
  return (
    <AuthLayout>
      <div className={styles.header}>
        <h2 className={styles.title}>Crie uma Nova Senha</h2>
        <p className={styles.subtitle}>Sua nova senha deve ser diferente da anterior.</p>
      </div>

      <form onSubmit={handleResetPassword} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="password">Nova Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirme a Nova Senha</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
            className={styles.input}
          />
        </div>
        
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Salvando...' : 'Redefinir Senha'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;