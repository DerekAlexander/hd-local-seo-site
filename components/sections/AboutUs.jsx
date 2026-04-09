'use client';

import styles from './AboutUs.module.css';

export default function AboutUs() {
  return (
    <section className={styles.section}>
      <div className={styles.goldBlock}>
        <p>
          {`We are a small local team, 
an SEO agency focused on 
connecting You with leads, 
phone calls, and clients. 

 We audit your online presence, 
find what's broken, then fix it. 
And we don't just leave after, our team will make consistent updates to keep you visible in the Google rankings. 
We stand apart through consistency, 
and dedicated support. You are not 
another number in the sea of clients to us, you're a human being trying to be successful.`}
        </p>
      </div>
      <div className={styles.imageSide}>
        <img src="/images/hands-with-message-1-203.png" alt="Hands with message" />
      </div>
    </section>
  );
}
