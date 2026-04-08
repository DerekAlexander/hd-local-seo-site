'use client';

import Image from 'next/image';
import styles from './SEOEducation.module.css';

export default function SEOEducation() {
  const cards = [
    {
      id: 1,
      icon: '/images/icon-241.svg',
      title: 'What Is SEO?',
      description: 'SEO (Search Engine Optimization) is how your business shows up when people Google "roofing near me" or "emergency plumber." It\'s free visibility—no ads, no monthly bills to Google.'
    },
    {
      id: 2,
      icon: '/images/icon-248.svg',
      title: 'Why It Matters',
      description: 'Google Ads (PPC): You pay every time someone clicks. Stop paying, visibility stops. SEO: You earn visibility by fixing your website and online presence. Once it works, it works.'
    },
    {
      id: 3,
      icon: '/images/icon-255.svg',
      title: 'Your visibility counts',
      description: 'Most local service businesses ignore SEO or do it wrong. They either have a dead website no one can find, good content but horrible technical setup, or get buried by competitors who actually invested.'
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 style={{ fontSize: '36px', margin: '0 0 20px 0', color: '#1e1e1e', fontFamily: "'Inter', sans-serif" }}>
          How SEO Works for Contractors
        </h2>
      </div>

      <div className={styles.cards}>
        {cards.map(card => (
          <div key={card.id} className={styles.card}>
            <div className={styles.iconContainer}>
              <Image
                src={card.icon}
                alt={card.title}
                width={60}
                height={60}
              />
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDescription}>{card.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <div>
          <p className={styles.bottomText}>
            We fix all three. In 30 days, you'll see movement. In 90 days, qualified leads start coming.
          </p>
        </div>
        <div>
          <Image
            src="/images/analyze-data-5-260.png"
            alt="Analytics"
            width={400}
            height={300}
            className={styles.illustration}
          />
        </div>
      </div>
    </section>
  );
}
