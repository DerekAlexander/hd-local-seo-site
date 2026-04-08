'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import styles from './SEOScoreTool.module.css';

export default function SEOScoreTool() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      alert('Please enter a website URL');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call - in production, call your backend
      // For now, generate mock results
      await new Promise(resolve => setTimeout(resolve, 1500));

      const score = Math.floor(Math.random() * 40) + 50; // 50-90
      const mockResults = {
        score,
        grade: score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D',
        url,
        recommendations: [
          'Mobile responsiveness needs improvement - test on different devices',
          'Page load speed is slower than competitors - consider image optimization',
          'Missing schema markup for local business information',
          'Improve internal linking structure',
          'Update title tags for better keyword relevance'
        ]
      };

      setResults(mockResults);
    } catch (error) {
      console.error('Error analyzing SEO:', error);
      alert('Error analyzing SEO. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>SEO Scoring Tool</h2>
          <p className={styles.subtitle}>Find out how SEO-friendly your website is</p>
        </div>

        <form className={styles.formContainer} onSubmit={handleAnalyze}>
          <div className={styles.inputGroup}>
            <input
              type="url"
              className={styles.input}
              placeholder="enter your website link (e.g., https://yoursite.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <Button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </Button>
          </div>
        </form>

        {loading && (
          <div className={styles.results}>
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Analyzing your website...</p>
            </div>
          </div>
        )}

        {results && !loading && (
          <div className={`${styles.results} ${results ? styles.show : ''}`}>
            <div className={styles.scoreContainer}>
              <div className={styles.scoreCircle}>
                <div className={styles.scoreNumber}>{results.score}</div>
                <div className={styles.scoreLabel}>Score</div>
              </div>
              <div className={styles.scoreDetails}>
                <h3 className={styles.scoreTitle}>
                  Your SEO Score: {results.grade}/F
                </h3>
                <p className={styles.scoreDescription}>
                  Your website is performing {results.score >= 70 ? 'well' : 'below average'} compared to competitors in your industry. 
                  Follow the recommendations below to improve your visibility in search results.
                </p>
              </div>
            </div>

            <div className={styles.recommendations}>
              <h4 className={styles.recommendationsTitle}>Top Recommendations:</h4>
              <ul className={styles.recommendationsList}>
                {results.recommendations.map((rec, idx) => (
                  <li key={idx} className={styles.recommendationItem}>
                    {idx + 1}. {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <Button onClick={() => setResults(null)}>
                Analyze Another Site
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
