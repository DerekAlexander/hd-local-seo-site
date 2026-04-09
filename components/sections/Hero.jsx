'use client';

import styles from './Hero.module.css';
import Image from 'next/image';
import { useState } from 'react';

export default function Hero() {
  const [url, setUrl] = useState('');

  return (
    <section className={styles.hero}>
      <div className={styles.heroHeader}>
        <div className={styles.heroImageContainer}>
          <Image
            src="/images/node-269.png"
            alt="San Antonio Skyline"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay}>
            <p className={styles.heroSubtext}>Start with an audit.</p>
            <h1 className={styles.heroHeading}>
              Ready To See Where your Business stands?
            </h1>
          </div>
        </div>
      </div>
      <div className={styles.seoScoringTool}>
        <Image
          src="/images/work-messages-222.png"
          alt="SEO Score Tool"
          width={140}
          height={140}
          className={styles.toolImage}
        />
        <div className={styles.seoTool}>
          <p className={styles.toolSubheading}>Try our built in SEO score tool</p>
          <h2 className={styles.toolHeading}>Score Tool</h2>
          <p className={styles.toolLabel}>enter your website link</p>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="www.seoscore.com"
              className={styles.searchInput}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
