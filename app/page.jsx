import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import SEOEducation from '@/components/sections/SEOEducation';
import OutreachCTA from '@/components/sections/OutreachCTA';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Services from '@/components/sections/Services';
import AboutUs from '@/components/sections/AboutUs';
import ContactForm from '@/components/sections/ContactForm';
import config from '@payload-config';
import { getPayload } from 'payload';
import {
  getFirstNonEmpty,
  richTextToParagraphs,
  richTextToPlainText,
  splitTextToParagraphs,
} from '@/lib/payloadContent';

const DEFAULT_CONTENT = {
  heroTitle: 'San Antonio Local SEO Services That Get You Found',
  heroSubtitle: 'Free SEO audit for your business.',
  seoInfoTitle: 'What Is SEO?',
  seoInfoBody:
    'SEO (Search Engine Optimization) is how your business shows up when people Google "roofing near me" or "emergency plumber." It\'s free visibility—no ads, no monthly bills to Google.',
  outreachTitle: 'Increase outreach for your business now!',
  outreachBody: '',
  aboutTitle: 'About HydrodubShop SEO',
  aboutBody: [
    'We are a small local team in San Antonio, an SEO agency focused on connecting you with leads, phone calls, and clients.',
    "We audit your online presence, find what's broken, then fix it. We don't just leave after. Our team makes consistent updates to keep you visible in the Google rankings.",
    "We stand apart through consistency and dedicated support. You're not another number to us - you're a human being trying to be successful.",
  ],
  footerText: 'Copyright © 2026 HydrodubShop LLC - All Rights Reserved.',
};

function contentValue(entry) {
  return getFirstNonEmpty(
    entry?.title,
    entry?.subtitle,
    richTextToPlainText(entry?.body),
  );
}

function contentParagraphs(entry, fallbackParagraphs) {
  const richTextParagraphs = richTextToParagraphs(entry?.body);
  if (richTextParagraphs.length > 0) {
    return richTextParagraphs;
  }

  const textParagraphs = splitTextToParagraphs(
    getFirstNonEmpty(entry?.title, entry?.subtitle),
  );

  return textParagraphs.length > 0 ? textParagraphs : fallbackParagraphs;
}

async function getHomepageContent() {
  try {
    const payload = await getPayload({ config });
    const contentKeys = [
      'hero_title',
      'hero_subtitle',
      'seo_info_title',
      'seo_info_body',
      'outreach_title',
      'outreach_body',
      'about_title',
      'about_body',
      'footer_text',
    ];

    const [siteContentResponse, servicesResponse] = await Promise.all([
      payload.find({
        collection: 'site-content',
        limit: 50,
        where: {
          key: {
            in: contentKeys,
          },
        },
      }),
      payload.find({
        collection: 'services',
        limit: 100,
      }),
    ]);

    const contentEntries = new Map(
      (siteContentResponse?.docs || []).map((entry) => [entry.key, entry]),
    );

    const heroTitle = getFirstNonEmpty(
      contentValue(contentEntries.get('hero_title')),
      DEFAULT_CONTENT.heroTitle,
    );
    const heroSubtitle = getFirstNonEmpty(
      contentValue(contentEntries.get('hero_subtitle')),
      DEFAULT_CONTENT.heroSubtitle,
    );
    const seoInfoTitle = getFirstNonEmpty(
      contentValue(contentEntries.get('seo_info_title')),
      DEFAULT_CONTENT.seoInfoTitle,
    );
    const seoInfoBody = getFirstNonEmpty(
      contentValue(contentEntries.get('seo_info_body')),
      DEFAULT_CONTENT.seoInfoBody,
    );
    const outreachTitle = getFirstNonEmpty(
      contentValue(contentEntries.get('outreach_title')),
      DEFAULT_CONTENT.outreachTitle,
    );
    const outreachBody = getFirstNonEmpty(
      contentValue(contentEntries.get('outreach_body')),
      DEFAULT_CONTENT.outreachBody,
    );
    const aboutTitle = getFirstNonEmpty(
      contentValue(contentEntries.get('about_title')),
      DEFAULT_CONTENT.aboutTitle,
    );
    const aboutBody = contentParagraphs(
      contentEntries.get('about_body'),
      DEFAULT_CONTENT.aboutBody,
    );
    const footerText = getFirstNonEmpty(
      contentValue(contentEntries.get('footer_text')),
      DEFAULT_CONTENT.footerText,
    );

    const services = (servicesResponse?.docs || [])
      .map((service) => {
        const title = getFirstNonEmpty(service?.title);
        const price = getFirstNonEmpty(service?.price);
        const description = richTextToPlainText(service?.description);
        const features = Array.isArray(service?.features)
          ? service.features
              .map((item) => getFirstNonEmpty(item?.feature))
              .filter(Boolean)
          : [];

        const normalizedFeatures =
          features.length > 0
            ? features
            : description
            ? [description]
            : [];

        return {
          title,
          price,
          description,
          features: normalizedFeatures,
          highlighted: Boolean(service?.highlighted),
        };
      })
      .filter((service) => service.title && service.price);

    return {
      heroTitle,
      heroSubtitle,
      seoInfoTitle,
      seoInfoBody,
      outreachTitle,
      outreachBody,
      aboutTitle,
      aboutBody,
      footerText,
      services,
    };
  } catch (error) {
    console.error('Failed to load homepage Payload content:', error);
    return {
      ...DEFAULT_CONTENT,
      services: [],
    };
  }
}

export default async function Home() {
  const homepageContent = await getHomepageContent();

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
        <Hero
          title={homepageContent.heroTitle}
          subtitle={homepageContent.heroSubtitle}
        />
        <SEOEducation
          title={homepageContent.seoInfoTitle}
          body={homepageContent.seoInfoBody}
        />
        <OutreachCTA
          title={homepageContent.outreachTitle}
          body={homepageContent.outreachBody}
        />
        <Services services={homepageContent.services} />
        <AboutUs
          title={homepageContent.aboutTitle}
          body={homepageContent.aboutBody}
        />
        <ContactForm />
      </main>
      <Footer footerText={homepageContent.footerText} />
    </>
  );
}
