'use client';

import styles from './ScoreCard.module.css';

function getScoreColor(score) {
  if (score >= 90) {
    return '#4CAF50';
  }
  if (score >= 50) {
    return '#FFC107';
  }
  return '#F44336';
}

function MetricItem({ label, value }) {
  return (
    <div className={styles.metricItem}>
      <span className={styles.metricLabel}>{label}</span>
      <span className={styles.metricValue}>{value}</span>
    </div>
  );
}

export default function ScoreCard({ results }) {
  const { overallScore, scores, metrics, seoChecks } = results;
  const overallColor = getScoreColor(overallScore);

  const categories = [
    { label: 'Performance', score: scores.performance },
    { label: 'Accessibility', score: scores.accessibility },
    { label: 'SEO', score: scores.seo },
    { label: 'Best Practices', score: scores.bestPractices },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.overallSection}>
        <p className={styles.overallLabel}>Overall Score</p>
        <p className={styles.overallScore} style={{ color: overallColor }}>
          {overallScore}
          <span className={styles.overallOutOf}>/100</span>
        </p>
      </div>

      <div className={styles.categoryRow}>
        {categories.map((category) => (
          <div key={category.label} className={styles.categoryItem}>
            <div
              className={styles.categoryCircle}
              style={{
                borderColor: getScoreColor(category.score),
                color: getScoreColor(category.score),
              }}
            >
              {category.score}
            </div>
            <p className={styles.categoryLabel}>{category.label}</p>
          </div>
        ))}
      </div>

      <div className={styles.metricsRow}>
        <MetricItem label="FCP" value={metrics.firstContentfulPaint} />
        <MetricItem label="SI" value={metrics.speedIndex} />
        <MetricItem label="LCP" value={metrics.largestContentfulPaint} />
        <MetricItem label="TBT" value={metrics.totalBlockingTime} />
        <MetricItem label="CLS" value={metrics.cumulativeLayoutShift} />
      </div>

      <div className={styles.seoChecksSection}>
        <h3 className={styles.seoChecksTitle}>SEO Checks</h3>
        <ul className={styles.seoChecksList}>
          {seoChecks.map((check) => {
            const passed = check.status === 'pass';

            return (
              <li key={check.name} className={styles.seoCheckItem}>
                <span className={styles.seoCheckName}>{check.name}</span>
                <span
                  className={styles.seoCheckStatus}
                  style={{ color: passed ? '#4CAF50' : '#F44336' }}
                >
                  {passed ? '\u2713 Pass' : '\u2715 Fail'}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <a href="#contact" className={styles.cta}>
        Want a full breakdown? Get a $125 SEO Audit &rarr;
      </a>
    </div>
  );
}
