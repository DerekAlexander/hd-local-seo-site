import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import SEOEducation from '@/components/sections/SEOEducation';
import IncreaseOutreach from '@/components/sections/IncreaseOutreach';
import Services from '@/components/sections/Services';
import AboutUs from '@/components/sections/AboutUs';
import ContactForm from '@/components/sections/ContactForm';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'HydrodubShop SEO',
    description:
      'San Antonio local SEO services for contractors and small businesses.',
    url: 'https://hydrodubshopseo.com',
    telephone: '',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Antonio',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: 'San Antonio',
    },
    serviceType: ['SEO Services', 'Local SEO', 'Website Design', 'SEO Audits'],
  };

  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Hero />
        <SEOEducation />
        <IncreaseOutreach />
        <Services />
        <AboutUs />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
