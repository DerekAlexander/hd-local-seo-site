import styles from './Section.module.css';

export default function Section({
  children,
  background = 'light',
  fullWidth = false,
  className = '',
  ...props
}) {
  return (
    <section
      className={`${styles.section} ${styles[background]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      {...props}
    >
      <div className={styles.container}>
        {children}
      </div>
    </section>
  );
}
