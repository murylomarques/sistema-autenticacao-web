import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../services/AuthService';
import AuthLayout from '../components/AuthLayout';
import styles from './ForgotPassword.module.css'; // Usando o novo arquivo de estilo

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Novo estado para controlar a exibição

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // A API sempre retorna sucesso para não revelar e-mails cadastrados
      await AuthService.forgotPassword(email);
      setSubmitted(true); // Ativa a tela de sucesso
    } catch (error) {
      // Mesmo em caso de erro de rede, mostramos uma mensagem genérica
      // O toast pode ser usado para erros inesperados
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  // Se o formulário já foi enviado, mostra a tela de sucesso
  if (submitted) {
    return (
      <AuthLayout>
        <div className={styles.successMessage}>
          <strong>Verifique seu E-mail</strong>
          <p>Se uma conta com o e-mail <strong>{email}</strong> existir, um link para redefinição de senha foi enviado.</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/auth" className={styles.backLink}>
            &larr; Voltar para o Login
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // Se não, mostra o formulário
  return (
    <AuthLayout>
      <div className={styles.header}>
        <h2 className={styles.title}>Esqueceu sua senha?</h2>
        <p className={styles.subtitle}>
          Sem problemas! Insira seu e-mail abaixo e enviaremos um link para você criar uma nova.
        </p>
      </div>

      <form onSubmit={handleForgotPassword} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Endereço de E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className={styles.input}
            placeholder="voce@exemplo.com"
          />
        </div>
        
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
        </button>
      </form>

      <div style={{ textAlign: 'center' }}>
        <Link to="/auth" className={styles.backLink}>
          &larr; Voltar para o Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;