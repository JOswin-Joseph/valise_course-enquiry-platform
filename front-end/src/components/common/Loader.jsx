import { motion } from 'framer-motion';
import styles from './Loader.module.css';

const Loader = ({ size = 'medium', fullScreen = false }) => {
  const sizeMap = {
    small: '24px',
    medium: '40px',
    large: '60px',
  };

  const loaderSize = sizeMap[size] || sizeMap.medium;

  const loader = (
    <motion.div
      className={styles.loader}
      style={{
        width: loaderSize,
        height: loaderSize,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreen}>
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;
