import Hero from '@/components/Hero';
import Nosotros from '@/components/Nosotros';
import QueHacemos from '@/components/QueHacemos';
import RescueGuide from '@/components/RescueGuide';
import PublishPet from '@/components/PublishPet';
import Testimonios from '@/components/Testimonios';
import FAQ from '@/components/FAQ';
import Contacto from '@/components/Contacto';

export default function Home() {
  return (
    <>
      <Hero />
      <Nosotros />
      <QueHacemos />
      <RescueGuide />
      <PublishPet />
      <Testimonios />
      <FAQ />
      <Contacto />
    </>
  );
}
