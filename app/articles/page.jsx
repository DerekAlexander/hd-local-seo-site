import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

const articles = [
  {
    title: 'What Is Local SEO?',
    description:
      'Learn how local SEO helps your business show up in Google Maps and local search results when customers search near you.',
  },
  {
    title: 'Google Business Profile Optimization',
    description:
      'Step-by-step guide to claiming and optimizing your Google Business Profile for maximum local visibility.',
  },
  {
    title: 'Why Your Website Speed Matters',
    description:
      'How page load times directly impact your search rankings and how to fix common speed issues.',
  },
  {
    title: 'The Truth About SEO vs Google Ads',
    description:
      'Understanding the real differences between organic SEO and paid advertising for local service businesses.',
  },
  {
    title: 'How Backlinks Build Authority',
    description:
      'Why quality backlinks matter for local SEO and how to earn them without spamming.',
  },
  {
    title: 'Mobile-First Indexing Explained',
    description:
      'Google indexes the mobile version of your site first. Here is what that means for your business.',
  },
  {
    title: 'Local SEO for Roofers',
    description:
      'Specific strategies for roofing companies to dominate local search and beat competitors in their service area.',
  },
  {
    title: 'How to Read Your SEO Report',
    description:
      'A plain-English guide to understanding the metrics in your monthly SEO performance report.',
  },
  {
    title: 'Schema Markup for Local Businesses',
    description:
      'How structured data helps Google understand your business and display richer search results.',
  },
  {
    title: 'Common SEO Mistakes to Avoid',
    description:
      'The top mistakes local businesses make with their websites and how fixing them can boost rankings fast.',
  },
];

export const metadata = {
  title: 'SEO Articles & Guides - HydrodubShop SEO',
  description:
    'Free SEO guides and articles for local businesses. Learn about local SEO, Google Business Profile, backlinks, schema markup, and more.',
  alternates: {
    canonical: 'https://hydrodubshopseo.com/articles',
  },
};

export default function ArticlesPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.container}>
          <h1 className={styles.title}>Articles</h1>
          <div className={styles.grid}>
            {articles.map((article) => (
              <article key={article.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{article.title}</h3>
                <p className={styles.cardDescription}>{article.description}</p>
                <span className={styles.readMore}>Coming Soon</span>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
