import React from 'react';

import styles from './Button.module.scss';

interface IButton {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  isDisable?: boolean;
}

const Button: React.FC<IButton> = ({ onClick, children, className, isDisable }) => {
  return (
    <button disabled={isDisable} onClick={onClick} className={className || styles.button}>
      {children}
    </button>
  );
};

export default Button;
