import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';
import { getPayload } from 'payload';
import config from '@payload-config';

export const metadata = {
  title: 'SEO Articles & Guides - HydrodubShop SEO',
  description:
    'Free SEO guides and articles for local businesses. Learn about local SEO, Google Business Profile, backlinks, schema markup, and more.',
  alternates: {
    canonical: 'https://hydrodubshopseo.com/articles',
  },
};

async function getArticles() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'articles',
      depth: 0,
      limit: 100,
      sort: '-updatedAt',
    });

    return Array.isArray(result?.docs) ? result.docs : [];
  } catch {
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.container}>
          <h1 className={styles.title}>Articles</h1>
          {articles.length > 0 ? (
            <div className={styles.grid}>
              {articles.map((article) => (
                <article key={article.id || article.slug || article.title} className={styles.card}>
                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  <p className={styles.cardDescription}>
                    {article.description || 'Content coming soon.'}
                  </p>
                  <span className={styles.readMore}>Coming Soon</span>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.cardDescription}>Coming Soon</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
