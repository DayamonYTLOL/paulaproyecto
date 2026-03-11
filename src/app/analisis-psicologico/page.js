import PsychologicalAnalysis from '@/components/PsychologicalAnalysis';

export const metadata = {
  title: 'Análisis Psicológico | Huellitas Perdidas',
  description: 'Análisis psicológico del abandono animal - Huellitas Perdidas',
};

export default function AnalisisPsicologicoPage() {
  return (
    <main className="pt-20">
      <PsychologicalAnalysis />
    </main>
  );
}
