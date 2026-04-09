import styles from './Header.module.css';
import Image from 'next/image';

export default function Header() {
  return (
    <>
      <div className={styles.banner}>
        <p className={styles.bannerText}>San Antonio&apos;s New Local SEO!</p>
      </div>
      <header className={styles.header}>
        <Image
          src="/images/logoblue-1-205.png"
          alt="HydrodubShop Logo"
          width={180}
          height={50}
          className={styles.logo}
          priority
        />
        <nav className={styles.nav}>
          <a href="#services" className={styles.navLink}>Services</a>
          <a href="#about" className={styles.navLinkAlt}>About</a>
          <a href="#portfolio" className={styles.navLink}>Portfolio</a>
        </nav>
        <a href="#contact" className={styles.contactButton}>
          <span className={styles.contactText}>Contact Us</span>
        </a>
      </header>
    </>
  );
}
