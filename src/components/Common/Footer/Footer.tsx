import React from 'react';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>Made by Kadoraw</div>
    </div>
  );
};

export default Footer;
