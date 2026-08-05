import Header from '@/components/Header';
import HeroDaylight from '@/components/HeroDaylight';
import ArchitectureLayers from '@/components/ArchitectureLayers';
import ServiceConstellation from '@/components/ServiceConstellation';
import Method from '@/components/Method';
import AuthorityProcess from '@/components/AuthorityProcess';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import StickyBar from '@/components/StickyBar';

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroDaylight />
        <ArchitectureLayers />
        <ServiceConstellation />
        <Method />
        <AuthorityProcess />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
