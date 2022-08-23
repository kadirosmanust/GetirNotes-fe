import React from 'react';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>getirNotes</div>
    </div>
  );
};

export default Header;
