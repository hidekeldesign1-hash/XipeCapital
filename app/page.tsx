import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import Hero from '@/sections/Hero';
import Diagnostico from '@/sections/Diagnostico';
import Arquetipos from '@/sections/Arquetipos';
import Method from '@/sections/Method';
import LaFirma from '@/sections/LaFirma';
import Siniestros from '@/sections/Siniestros';
import ArquitecturaCierre from '@/sections/ArquitecturaCierre';

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Diagnostico />
        <Arquetipos />
        <Method />
        <LaFirma />
        <Siniestros />
        <ArquitecturaCierre />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
