import React from 'react';
import styles from './Modal.module.css';
import warn from '../../assets/img/warn.svg';

interface ModalProps {
  open: boolean;
  close: () => void;
  confirm: () => void;
  error: string;
}

const Modal: React.FC<ModalProps> = ({ open, error, close, confirm }) => {
  if (!open) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.warnSection}>
        <img src={warn} alt="warn" />
        <h4>Are you sure to delete this article?</h4>
      </div>
      <div className={styles.actions}>
        <button onClick={close} type="button">
          No
        </button>
        <button className={styles.confirm} onClick={confirm} type="button">
          Yes
        </button>
      </div>
      <div className={styles.error}>{error}</div>
    </div>
  );
};

export default Modal;
