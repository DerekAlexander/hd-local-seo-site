'use client';

import Button from '../ui/Button';
import styles from './PricingCards.module.css';

export default function PricingCards() {
  const services = [
    {
      id: 1,
      name: 'SEO Audit',
      price: 125,
      features: [
        'Website health check: technical issues, mobile friendliness, speed',
        'Google Business Profile review',
        'On-page optimization scan (title tags, meta descriptions, content)',
        'Backlink analysis',
        'Competitor overview',
        'Detailed report + actionable recommendations'
      ]
    },
    {
      id: 2,
      name: 'SEO Optimization',
      price: 299,
      features: [
        'Everything in SEO Audit',
        'On-page optimization implementation',
        'Technical SEO fixes',
        'Schema markup setup',
        'Initial content optimization',
        'Monthly monitoring'
      ]
    },
    {
      id: 3,
      name: 'Full SEO Program',
      price: 599,
      features: [
        'Everything in SEO Optimization',
        'Ongoing monthly content strategy',
        'Link building campaigns',
        'Regular performance reports',
        'Quarterly strategy reviews',
        'Dedicated support'
      ]
    }
  ];

  const handleContactForm = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section} id="pricing">
      <div className={styles.header}>
        <h2 className={styles.title}>SEO Services for Contractors</h2>
        <p className={styles.subtitle}>Choose the plan that fits your business</p>
      </div>

      <div className={styles.cards}>
        {services.map(service => (
          <div key={service.id} className={styles.card}>
            <div className={styles.cardTop}>
              <h3 className={styles.cardTitle}>{service.name}</h3>
              <p className={styles.price}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>{service.price}</span>
                <span className={styles.period}>/month</span>
              </p>
            </div>

            <ul className={styles.features}>
              {service.features.map((feature, idx) => (
                <li key={idx} className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={styles.cta}
              onClick={handleContactForm}
            >
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
