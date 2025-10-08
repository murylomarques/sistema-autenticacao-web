import React from 'react';
import styles from './AuthLayout.module.css'; // Importando o CSS que você já tem

// O componente recebe 'children', que é todo o conteúdo que você coloca dentro dele
const AuthLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {children} {/* Aqui é onde o formulário de login/registro será renderizado */}
      </div>
    </div>
  );
};

export default AuthLayout; // Não se esqueça de exportar!