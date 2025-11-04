import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import styles from './Toast.module.css';

const Toast = ({ message, type = 'info', onClose }) => {
  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />,
  };

  return (
    <motion.div
      className={`${styles.toast} ${styles[type]}`}
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <div className={styles.icon}>{icons[type]}</div>
      <p className={styles.message}>{message}</p>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close notification">
        <X size={18} />
      </button>
    </motion.div>
  );
};

export default Toast;
