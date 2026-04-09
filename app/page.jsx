import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import SEOEducation from '@/components/sections/SEOEducation';
import IncreaseOutreach from '@/components/sections/IncreaseOutreach';
import Services from '@/components/sections/Services';
import AboutUs from '@/components/sections/AboutUs';
import ContactForm from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <>
      <Header />
      <main>
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
