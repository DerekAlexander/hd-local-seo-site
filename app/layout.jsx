import './globals.css';

export const metadata = {
  title: 'HydrodubShop SEO - San Antonio Local SEO Services',
  description:
    'San Antonio local SEO services for contractors and small businesses. SEO audits, website builds, and ongoing optimization. Get found on Google Maps and local search.',
  openGraph: {
    title: 'HydrodubShop SEO - San Antonio Local SEO Services',
    description:
      'San Antonio local SEO services for contractors and small businesses. SEO audits, website builds, and ongoing optimization.',
    url: 'https://hydrodubshopseo.com',
    siteName: 'HydrodubShop SEO',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HydrodubShop SEO - San Antonio Local SEO Services',
    description:
      'San Antonio local SEO services for contractors and small businesses.',
  },
  alternates: {
    canonical: 'https://hydrodubshopseo.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
