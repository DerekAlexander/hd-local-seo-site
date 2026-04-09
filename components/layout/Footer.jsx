import styles from './Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <Image
          src="/images/footer-logo-1-134.png"
          alt="Footer Logo"
          width={120}
          height={40}
          className={styles.footerLogo}
        />
      </div>
      <div className={styles.navIcons}>
        <Image src="/images/home-150.png" alt="Home" width={24} height={24} />
        <Image src="/images/mission-149.png" alt="Mission" width={24} height={24} />
        <Image src="/images/portfolio-151.png" alt="Portfolio" width={24} height={24} />
      </div>
      <div className={styles.links}>
        <a href="#about" className={styles.link}>about</a>
        <a href="#services" className={styles.link}>services</a>
        <a href="#portfolio" className={styles.link}>portfolio</a>
      </div>
      <p className={styles.copyright}>
        Copyright © 2025 HydrodubShop LLC- All Rights Reserved.
      </p>
    </footer>
  );
}
