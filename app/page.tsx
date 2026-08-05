import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import Hero from '@/sections/Hero';
import ProblemStatement from '@/sections/ProblemStatement';
import ArchitectureLayers from '@/sections/ArchitectureLayers';
import Pillars from '@/sections/Pillars';
import Method from '@/sections/Method';
import Routes from '@/sections/Routes';
import Authority from '@/sections/Authority';
import ProcessProof from '@/sections/ProcessProof';
import Education from '@/sections/Education';
import FAQ from '@/sections/FAQ';
import FinalCTA from '@/sections/FinalCTA';

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ProblemStatement />
        <ArchitectureLayers />
        <Pillars />
        <Method />
        <Routes />
        <Authority />
        <ProcessProof />
        <Education />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
