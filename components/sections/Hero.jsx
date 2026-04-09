'use client';

import styles from './Hero.module.css';
import Image from 'next/image';
import { useState } from 'react';
import ScoreCard from './ScoreCard';

export default function Hero() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError('Please enter a valid URL');
      setResults(null);
      return;
    }

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch('/api/seo-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: trimmedUrl }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || 'Could not analyze this site');
        return;
      }

      setResults(data);
    } catch {
      setError('Could not analyze this site');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroHeader}>
        <div className={styles.heroImageContainer}>
          <Image
            src="/images/node-16.png"
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
          src="/images/work-messages-21.png"
          alt="SEO Score Tool"
          width={140}
          height={140}
          className={styles.toolImage}
        />
        <div className={styles.seoTool}>
          <p className={styles.toolSubheading}>Try our built in SEO score tool</p>
          <h2 className={styles.toolHeading}>Score Tool</h2>
          <p className={styles.toolLabel}>enter your website link</p>
          <form onSubmit={handleSubmit} className={styles.searchRow}>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="www.seoscore.com"
                className={styles.searchInput}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                aria-label="Website URL"
              />
            </div>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </form>
          {loading && <p className={styles.loading}>Analyzing...</p>}
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
      {results && (
        <div className={styles.scoreCardContainer}>
          <ScoreCard results={results} />
        </div>
      )}
    </section>
  );
}
