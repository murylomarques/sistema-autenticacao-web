// src/components/Navbar.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  // Pegamos o usuário e a função logout do nosso contexto
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <span className={styles.welcomeMessage}>
        Bem-vindo, <strong>{user?.username}</strong>!
      </span>
      <button onClick={logout} className={styles.logoutButton}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;