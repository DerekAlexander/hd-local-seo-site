'use client';

import styles from './IncreaseOutreach.module.css';

export default function IncreaseOutreach() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Increase outreach for your business now!</h2>
      <div className={styles.images}>
        <img src="/images/outreach-network.svg" alt="Outreach network connections" />
        <img src="/images/growth-chart.svg" alt="Business growth chart" />
        <img src="/images/business-connect.svg" alt="Business partnerships" />
      </div>
    </section>
  );
}
