import Hero from '@/components/Hero';
import Nosotros from '@/components/Nosotros';
import QueHacemos from '@/components/QueHacemos';
import NetworkData from '@/components/NetworkData';
import RescueGuide from '@/components/RescueGuide';
import ReportedAnimals from '@/components/ReportedAnimals';
import WhyAdoptRescue from '@/components/WhyAdoptRescue';
import PublishPet from '@/components/PublishPet';
import Testimonios from '@/components/Testimonios';
import FAQ from '@/components/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      <Nosotros />
      <QueHacemos />
      <NetworkData />
      <RescueGuide />
      <ReportedAnimals />
      <WhyAdoptRescue />
      <PublishPet />
      <Testimonios />
      <FAQ />
    </>
  );
}
