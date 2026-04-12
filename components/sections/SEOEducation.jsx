'use client';

import Image from 'next/image';
import styles from './SEOEducation.module.css';

const DEFAULT_TITLE = 'What Is SEO?';
const DEFAULT_BODY =
  'SEO (Search Engine Optimization) is how your business shows up when people Google "roofing near me" or "emergency plumber." It\'s free visibility-no ads, no monthly bills to Google.';

const baseCards = [
  {
    icon: '/images/icon-35.svg',
    title: DEFAULT_TITLE,
    description: DEFAULT_BODY,
  },
  {
    icon: '/images/icon-42.svg',
    title: 'Why It Matters',
    description: 'Google Ads (PPC):\nYou pay every time someone clicks. Stop paying, visibility stops.\nSEO: You earn visibility by fixing your website and online presence. Once it works, it works.',
  },
  {
    icon: '/images/icon-49.svg',
    title: 'Your visibility counts',
    description: 'Most local service businesses ignore SEO or do it wrong. They either:\n- Have a dead website no one can find\n- Have good content but horrible technical setup\n- Get buried by competitors who actually invested',
  },
];

export default function SEOEducation({ title = DEFAULT_TITLE, body = DEFAULT_BODY }) {
  const cards = [
    {
      ...baseCards[0],
      title: title || DEFAULT_TITLE,
      description: body || DEFAULT_BODY,
    },
    ...baseCards.slice(1),
  ];

  return (
    <section className={styles.section}>
      <div className={styles.cardGrid}>
        <div className={styles.cards}>
          {cards.map((card, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.iconWrap}>
                <img src={card.icon} alt={card.title} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.bottomSection}>
          <Image
            src="/images/analyze-data-5-54.png"
            alt="Analytics"
            width={40}
            height={40}
            className={styles.bottomImage}
          />
          <p className={styles.bottomText}>
            We fix all three. In 30 days, you&apos;ll see movement. In 90 days, qualified leads start coming.
          </p>
        </div>
      </div>
    </section>
  );
}
