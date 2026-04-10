'use client';

import styles from './AboutUs.module.css';

export default function AboutUs() {
  return (
    <section className={styles.section}>
      <div className={styles.goldBlock}>
        <p>
          {`We are a small local team,
an SEO agency focused on
connecting you with leads,
phone calls, and clients.

We audit your online presence,
find what's broken, then fix it.
We don't just leave after —
our team makes consistent
updates to keep you visible
in the Google rankings.

We stand apart through
consistency and dedicated
support. You're not another
number to us — you're a human
being trying to be successful.`}
        </p>
        <iframe
          className={styles.mapEmbed}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d444568.0792104593!2d-98.64939049999999!3d29.4241219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c42af45b245f3%3A0x6e97a3b4d67f2cb!2sSan%20Antonio%2C%20TX!5e0!3m2!1sen!2sus!4v1712000000000!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  );
}
