'use client';

import Image from 'next/image';
import styles from './Services.module.css';

const pricingCards = [
  {
    title: 'SEO Audit',
    price: '$125',
    features: [
      'Website health check: technical issues, mobile friendliness, speed',
      'Google Business Profile review',
      'On-page optimization scan (title tags, meta descriptions, content)',
      'Backlink analysis',
      'Competitor overview',
      'Detailed report + actionable recommendations',
    ],
  },
  {
    title: 'Website Build',
    price: '$1,000-3,000',
    features: [
      'Custom website design (mobile-first, SEO-ready)',
      '1–10 pages depending on complexity',
      'Google Business Profile integration',
      'Contact forms + phone tracking setup',
      'Technical SEO foundation (schema, sitemaps, robots.txt)',
      'Mobile responsiveness + fast load times',
      'Hosting setup included',
    ],
  },
  {
    title: 'Ongoing SEO Service',
    price: '$1,000',
    per: '/mo',
    tier: 'Tier 1',
    features: [
      'Google Business Profile setup + optimization',
      'Title tag and meta description optimization',
      'Technical SEO fixes (schema, mobile responsiveness, site speed)',
      'Monthly performance report',
      'Minimum 3-month commitment',
    ],
  },
  {
    title: 'Ongoing SEO Service',
    price: '$2,000',
    per: '/mo',
    tier: 'Tier 2',
    features: [
      'Everything in Tier 1, plus:',
      '5–10 quality backlinks per month (industry-relevant)',
      'Internal linking strategy + optimization',
      '1 SEO-targeted blog post per month',
      'Enhanced monthly report (rankings, traffic, leads)',
      'Minimum 3-month commitment',
    ],
  },
  {
    title: 'Ongoing SEO Service',
    price: '$3,000',
    per: '/mo',
    tier: 'Tier 3',
    features: [
      'Everything in Tier 1 + 2 plus:',
      'Ongoing monthly backlink acquisition (10–15+ per month)',
      '4 SEO-targeted blog posts per month',
      'Content calendar planning + seasonal optimization',
      'Advanced monthly reporting (rankings, organic traffic, conversions, lead quality)',
      'Quarterly strategy calls',
      'Minimum 3-month commitment',
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <h2 className={styles.title}>Services</h2>
      <div className={styles.cards}>
        {pricingCards.map((card, i) => (
          <div
            key={i}
            className={`${styles.card} ${i < 2 ? styles.cardWide : styles.cardNarrow}`}
          >
            <div className={styles.cardTop}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <div className={styles.priceRow}>
                <span className={styles.priceDollar}>$</span>
                <span className={styles.priceAmount}>
                  {card.price.replace('$', '')}
                </span>
                {card.per && <span className={styles.pricePer}>{card.per}</span>}
              </div>
              {card.tier && <span className={styles.tierBadge}>{card.tier}</span>}
            </div>
            <div className={styles.featureList}>
              {card.features.map((f, j) => (
                <p key={j} className={styles.feature}>{f}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.serviceInfo}>
        <div className={styles.serviceInfoDark}>
          <p className={styles.serviceInfoTableHeader}>
            | Service | Price | What You Get |
          </p>
        </div>
        <div className={styles.breakdown}>
          <div className={styles.breakdownBlock}>
            <h2 className={styles.breakdownTitle}>Payment</h2>
            <p className={styles.breakdownText}>
              50% upfront, 50% at completion (for Website Build)
            </p>
            <h3 className={styles.breakdownSub}>Monthly Services:</h3>
            <p className={styles.breakdownText}>
              Due on the 1st of each month
            </p>
          </div>
          <div className={styles.breakdownBlock}>
            <h2 className={styles.breakdownTitle}>What to Expect</h2>
            <ul className={styles.breakdownList}>
              <li><strong>First 30 days:</strong> Site fixes, profile optimization, backlink foundation</li>
              <li><strong>60–90 days:</strong> Keyword ranking improvements, lead inquiry increase</li>
              <li><strong>90+ days:</strong> Consistent qualified leads from search</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
