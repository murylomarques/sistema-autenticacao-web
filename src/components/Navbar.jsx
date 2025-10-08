import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          AuthSystem
        </div>
        <div className={styles.userInfo}>
          <span className={styles.welcomeMessage}>
            Logado como <strong>{user?.username}</strong>
          </span>
          <button onClick={logout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;