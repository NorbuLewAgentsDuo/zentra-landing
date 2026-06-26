import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import SalesProof from '@/components/SalesProof';
import Problem from '@/components/Problem';
import AudioDemo from '@/components/AudioDemo';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import RevealAnimations from '@/components/RevealAnimations';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <SalesProof />
        <Problem />
        <AudioDemo />
        <HowItWorks />
        <Features />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <RevealAnimations />
    </>
  );
}
