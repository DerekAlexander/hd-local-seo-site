'use client';

import Image from 'next/image';
import Button from '../ui/Button';
import styles from './Hero.module.css';

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      <Image
        src="/images/node-269.png"
        alt="San Antonio landscape"
        fill
        className={styles.backgroundImage}
        priority
      />
      <div className={styles.content}>
        <h1 className={styles.headline}>Visibility in your Hands</h1>
        <p className={styles.subheading}>bringing leads, phone calls, and revenue</p>
        <div className={styles.cta}>
          <Button 
            size="lg" 
            onClick={() => scrollToSection('pricing')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
