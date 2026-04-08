import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Contractor SEO Services - Get More Leads',
  description: 'SEO services specifically for local contractors. Get more leads for your roofing, HVAC, plumbing, or construction business.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
