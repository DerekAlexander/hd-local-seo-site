import Hero from '@/components/sections/Hero';
import SEOEducation from '@/components/sections/SEOEducation';
import PricingCards from '@/components/sections/PricingCards';
import SEOScoreTool from '@/components/sections/SEOScoreTool';
import ContactForm from '@/components/sections/ContactForm';

export const metadata = {
  title: 'Contractor SEO Services - Get More Leads',
  description: 'SEO services specifically for local contractors. Get more leads for your roofing, HVAC, plumbing, or construction business.',
};

export default function Home() {
  return (
    <main>
      <Hero />
      <SEOEducation />
      <PricingCards />
      <SEOScoreTool />
      <ContactForm />
    </main>
  );
}
