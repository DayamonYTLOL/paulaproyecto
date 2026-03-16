import PsychologicalAnalysis from '@/components/PsychologicalAnalysis';

export const metadata = {
  title: 'Análisis Psicológico | Huellitas',
  description: 'Análisis psicológico del abandono animal - Huellitas',
};

export default function AnalisisPsicologicoPage() {
  return (
    <main className="pt-20">
      <PsychologicalAnalysis />
    </main>
  );
}
