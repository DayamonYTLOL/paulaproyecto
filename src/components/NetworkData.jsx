'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const rescuers = [
  { name: 'Proyecto Nala', type: 'Foundation', location: 'Charallave / Los Teques / Miranda', activities: { en: 'Permanent shelter, disabled animals care, adoption', es: 'Refugio permanente, cuidado de animales discapacitados, rescate' }, contact: '0412-585-4321' },
  { name: 'Santuario Animal América', type: 'Foundation', location: 'Guarenas, Miranda', activities: { en: 'Rescue of dogs and cats, sanctuary care', es: 'Rescate de perros y gatos, cuidado en santuario' }, contact: '0414-286-7375' },
  { name: 'Protección Animal Baruta', type: 'Municipal Program', location: 'Baruta, Miranda', activities: { en: 'Animal control, rescue, sterilization campaigns', es: 'Control animal, rescate, campañas de esterilización' }, contact: 'Facebook @ProtecciónAnimalBaruta' },
  { name: 'Fundación Refugio Migema', type: 'Foundation', location: 'Guarenas, Miranda', activities: { en: 'Shelter, adoption, veterinary care', es: 'Refugio, rescate, atención veterinaria' }, contact: '414-286-7375 0' },
  { name: 'Secretaría de Protección Animal Miranda', type: 'Government Program', location: 'Statewide Miranda', activities: { en: 'Sterilization, vaccination, adoption campaigns', es: 'Esterilización, vacunación, campañas de rescate' }, contact: 'Instagram @proteccionanimalmir...' },
  { name: 'Fundación Animales con Futuro', type: 'Foundation', location: 'Guatire, Miranda', activities: { en: 'Rescue, sterilization, adoption', es: 'Rescate, esterilización, cuidado animal' }, contact: '0424-1234567' },
  { name: 'Fundación Patitas Felices Miranda', type: 'Foundation', location: 'Ocumare del Tuy, Miranda', activities: { en: 'Rescue, sterilization, adoption', es: 'Rescate, esterilización, cuidado animal' }, contact: '0412-9876543' },
  { name: 'Misión Nevado Miranda', type: 'Government Program', location: 'Statewide Miranda', activities: { en: 'Sterilization, vaccination, rescue, adoption', es: 'Esterilización, vacunación, rescate animal' }, contact: '0212-8605959' },
];

const shelters = [
  { name: 'Protección Animal Baruta', location: 'Baruta', type: 'Municipal', services: { en: 'Control and rescue', es: 'Control y rescate' }, contact: 'Local government' },
  { name: 'Salud Baruta', location: 'Baruta', type: 'Municipal', services: { en: 'Veterinary services', es: 'Servicios veterinarios' }, contact: 'Local government' },
  { name: 'Proyecto Nala', location: 'Charallave / Los Teques, Miranda', type: 'Shelter', services: { en: 'Permanent shelter, disabled animals care, adoption', es: 'Refugio permanente, cuidado de animales discapacitados, rescate' }, contact: '0412-5854321' },
  { name: 'Santuario Animal América', location: 'Guarenas, Miranda', type: 'Shelter', services: { en: 'Rescue of dogs and cats, sanctuary care', es: 'Rescate de perros y gatos, cuidado en santuario' }, contact: '0414-2867375' },
  { name: 'Misión Nevado Miranda', location: 'Statewide Miranda', type: 'Government Program', services: { en: 'Sterilization, vaccination, rescue, adoption', es: 'Esterilización, vacunación, rescate animal' }, contact: '0212-8605959' },
  { name: 'Fundación Patitas Felices Miranda', location: 'Ocumare del Tuy', type: 'Shelter', services: { en: 'Rescue, sterilization, adoption', es: 'Rescate, esterilización, cuidado animal' }, contact: '0412-9876543' },
  { name: 'Colegio de Médicos Veterinarios del Estado Miranda', location: 'Los Teques', type: 'Professional Association', services: { en: 'Veterinary services, training, regulation', es: 'Servicios veterinarios, formación, regulación' }, contact: '0424-1210497' },
];

const zones = [
  { municipality: 'Guaicaipuro (Tácata Parish)', activity: 'Veterinary campaign', notes: 'Civil Registry jornadas de vacunación y esterilización — Misión Nevado & Alcaldía' },
  { municipality: 'Baruta (Córdoba Boulevard)', activity: 'Permanent veterinary station', notes: 'Weekly services — facebook.com/ProteccionAnimalBaruta' },
  { municipality: 'Petare (Sucre Municipality)', activity: 'High stray population', notes: 'Urban density: La Bombilla, José Félix Ribas, La Urbina' },
  { municipality: 'Guarenas and Guatire', activity: 'Rescue and sterilization campaigns', notes: 'Ongoing — Fundación Huellas de Amor & Refugio Migema (instagram.com/huellasdeamorvzla)' },
  { municipality: 'Los Teques (Capital Miranda)', activity: 'Mobile veterinary units', notes: 'Includes adoption, jornadas Plaza Bolívar y Panamericana — Colegio Médicos Veterinarios (0424-1210497)' },
  { municipality: 'Charallave and Valles del Tuy', activity: 'Community outreach and rescue', notes: 'High abandonment rate — Proyecto Nala & Fundación Patitas Felices (0412-9876543)' },
  { municipality: 'Josefa Camejo, Vuelvancaras, Aeropuerto (Guarenas/Guatire)', activity: 'Street-level rescue and care', notes: 'Targeted campaigns — Santuario Animal América (0414-2867375)' },
  { municipality: 'Santa Teresa del Tuy', activity: 'Feeding and sterilization brigades', notes: 'Coordinated by Fundación Vida Animal Miranda (instagram.com/vidanimalmir...)' },
  { municipality: 'Ocumare del Tuy', activity: 'Rescue and sterilization campaigns', notes: 'Fundación Patitas Felices Miranda (facebook.com/PatitasFelicesMiranda)' },
  { municipality: 'Caucagua (Acevedo Municipality)', activity: 'Rural rescue operations', notes: 'Rescate bovinos y equinos en carreteras rurales — AgroRescate Miranda' },
];

const servicesES = [
  'Consultas médicas gratuitas',
  'Atención de emergencia para animales heridos o enfermos',
  'Vacunación',
  'Desparasitación y control de parásitos',
  'Corte de uñas y limpieza de oídos',
  'Evaluación nutricional y alimentación',
  'Asesoría legal en leyes de protección animal',
  'Esterilización y control poblacional',
  'Coordinación de adopción presencial y remota',
  'Asesoría legal en protección animal',
  'Control poblacional (esterilización)',
  'Coordinación de adopción y rescate',
];

const servicesEN = [
  'Free medical consultations',
  'Emergency care for injured or sick animals',
  'Vaccinations',
  'Deworming and parasite control',
  'Nail trimming and ear cleaning',
  'Nutritional assessments and feeding',
  'Legal advice on animal protection laws',
  'Sterilization and population control',
  'On-site and remote adoption coordination',
  'Legal advice on animal protection',
  'Population control (sterilization)',
  'Adoption and rescue coordination',
];

const nd = {
  es: {
    sectionTag: 'RED DE RESCATE',
    sectionTitle: 'Nuestra Red en Miranda',
    sectionSubtitle: 'Fundaciones, albergues, zonas activas y servicios que conforman la red de rescate animal en el Estado Miranda.',
    rescuersTitle: 'Rescatistas y Fundaciones Activas',
    sheltersTitle: 'Albergues y Centros Veterinarios',
    zonesTitle: 'Zonas de Alta Actividad para Animales Callejeros',
    servicesTitle: 'Servicios Ofrecidos en Campañas',
    colName: 'Nombre / Organización',
    colType: 'Tipo',
    colLocation: 'Ubicación / Cobertura',
    colActivities: 'Actividades',
    colContact: 'Contacto / Redes Sociales',
    colServices: 'Servicios Prestados',
    colMunicipality: 'Municipio / Zona',
    colActivity: 'Tipo de Actividad',
    colNotes: 'Notas',
    typeLabels: {
      'Foundation': 'Fundación',
      'Municipal Program': 'Programa Municipal',
      'Government Program': 'Programa de Gobierno',
      'Shelter': 'Albergue',
      'Professional Association': 'Asociación Profesional',
      'Municipal': 'Municipal',
    },
    activityLabels: {
      'Veterinary campaign': 'Campaña veterinaria',
      'Permanent veterinary station': 'Estación veterinaria permanente',
      'High stray population': 'Alta población de callejeros',
      'Rescue and sterilization campaigns': 'Campañas de rescate y esterilización',
      'Mobile veterinary units': 'Unidades veterinarias móviles',
      'Community outreach and rescue': 'Alcance comunitario y rescate',
      'Street-level rescue and care': 'Rescate y atención callejera',
      'Feeding and sterilization brigades': 'Brigadas de alimentación y esterilización',
      'Rural rescue operations': 'Operaciones de rescate rural',
    },
    services: servicesES,
  },
  en: {
    sectionTag: 'RESCUE NETWORK',
    sectionTitle: 'Our Network in Miranda',
    sectionSubtitle: 'Foundations, shelters, active zones and services that make up the animal rescue network in Miranda State.',
    rescuersTitle: 'Active Rescuers and Foundations',
    sheltersTitle: 'Shelters and Veterinary Centers',
    zonesTitle: 'High Activity Zones for Strays',
    servicesTitle: 'Services Offered in Campaigns',
    colName: 'Name / Organization',
    colType: 'Type',
    colLocation: 'Location / Coverage',
    colActivities: 'Activities',
    colContact: 'Contact / Social Media',
    colServices: 'Services Provided',
    colMunicipality: 'Municipality / Area',
    colActivity: 'Activity Type',
    colNotes: 'Notes',
    typeLabels: {},
    activityLabels: {},
    services: servicesEN,
  },
};

function DataTable({ title, children, delay = 0, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      <h3 className="text-xl sm:text-2xl font-handwritten font-bold text-accent-700 mb-4 flex items-center gap-2">
        <span className="w-2 h-6 bg-secondary-400 rounded-full inline-block" />
        {title}
      </h3>
      <div className="rounded-2xl overflow-hidden shadow border border-gray-200 mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {children}
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function translateLabel(labels, value) {
  return labels[value] || value;
}

export default function NetworkData() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { lang } = useLanguage();
  const tx = nd[lang] || nd.es;

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp text-secondary-600 border-secondary-400 text-lg inline-block mb-4">
            {tx.sectionTag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-handwritten font-bold text-accent-600 mb-3">
            {tx.sectionTitle}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            {tx.sectionSubtitle}
          </p>
        </motion.div>

        {/* Table 1: Active Rescuers */}
        <DataTable title={tx.rescuersTitle} delay={0.1} isInView={isInView}>
          <thead>
            <tr className="bg-accent-600 text-white">
              {[tx.colName, tx.colType, tx.colLocation, tx.colActivities, tx.colContact].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rescuers.map((r, i) => (
              <tr key={i} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-secondary-50 transition-colors`}>
                <td className="px-4 py-3 font-semibold text-accent-700">{r.name}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent-50 text-accent-700">{translateLabel(tx.typeLabels, r.type)}</span></td>
                <td className="px-4 py-3 text-gray-600">{r.location}</td>
                <td className="px-4 py-3 text-gray-600">{r.activities[lang] || r.activities.en}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{r.contact}</td>
              </tr>
            ))}
          </tbody>
        </DataTable>

        {/* Table 2: Shelters */}
        <DataTable title={tx.sheltersTitle} delay={0.2} isInView={isInView}>
          <thead>
            <tr className="bg-secondary-500 text-white">
              {[tx.colName, tx.colType, tx.colServices, tx.colContact].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shelters.map((s, i) => (
              <tr key={i} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-secondary-50 transition-colors`}>
                <td className="px-4 py-3 font-semibold text-accent-700">
                  {s.name}
                  <span className="block text-xs text-gray-400 font-normal">{s.location}</span>
                </td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary-50 text-secondary-700">{translateLabel(tx.typeLabels, s.type)}</span></td>
                <td className="px-4 py-3 text-gray-600">{s.services[lang] || s.services.en}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{s.contact}</td>
              </tr>
            ))}
          </tbody>
        </DataTable>

        {/* Table 3: High Activity Zones */}
        <DataTable title={tx.zonesTitle} delay={0.3} isInView={isInView}>
          <thead>
            <tr className="bg-emerald-600 text-white">
              {[tx.colMunicipality, tx.colActivity, tx.colNotes].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {zones.map((z, i) => (
              <tr key={i} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-emerald-50 transition-colors`}>
                <td className="px-4 py-3 font-semibold text-accent-700 whitespace-nowrap">{z.municipality}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">{translateLabel(tx.activityLabels, z.activity)}</span></td>
                <td className="px-4 py-3 text-gray-500 text-xs">{z.notes}</td>
              </tr>
            ))}
          </tbody>
        </DataTable>

        {/* Table 4: Services in Campaigns — card grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3 className="text-xl sm:text-2xl font-handwritten font-bold text-accent-700 mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-secondary-400 rounded-full inline-block" />
            {tx.servicesTitle}
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {tx.services.map((s, i) => (
              <motion.div
                key={i}
                className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
              >
                <span className="w-2 h-2 rounded-full bg-secondary-400 flex-shrink-0" />
                <span className="text-sm text-gray-700">{s}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
