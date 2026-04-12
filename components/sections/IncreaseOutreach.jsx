'use client';

import styles from './IncreaseOutreach.module.css';

const DEFAULT_TITLE = 'Increase outreach for your business now!';
const DEFAULT_BODY = '';

export default function IncreaseOutreach({ title = DEFAULT_TITLE, body = DEFAULT_BODY }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.images}>
        <img src="/images/outreach-network.svg" alt="Outreach network connections" />
        <img src="/images/growth-chart.svg" alt="Business growth chart" />
        <img src="/images/business-connect.svg" alt="Business partnerships" />
      </div>
    </section>
  );
}
