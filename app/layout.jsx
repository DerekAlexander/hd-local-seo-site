import './globals.css';

export const metadata = {
  title: 'HydrodubShop - San Antonio Local SEO',
  description: 'San Antonio\'s Premier Local SEO Agency',
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
