import React from 'react';

import Footer from '../Footer';
import Header from '../Header';
import styles from './Layout.module.scss';

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
