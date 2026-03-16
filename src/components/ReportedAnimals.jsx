'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const data = [
  { type: 'Dog',   health: 'Injured',       location: 'Baruta',              date: '2025-10-01', org: 'Fundación TEPA',              status: 'Rescued', notes: 'Found near Córdoba Blvd' },
  { type: 'Cat',   health: 'Healthy',        location: 'Chacao',              date: '2025-09-28', org: 'Rescate Animal Miranda',      status: 'Pending', notes: 'Seen roaming Plaza Francia' },
  { type: 'Dog',   health: 'Malnourished',   location: 'Guatire',             date: '2025-10-03', org: 'Huellas de Amor',             status: 'Rescued', notes: 'Rescued near Mercado Municipal' },
  { type: 'Horse', health: 'Injured',        location: 'Los Teques',          date: '2025-10-05', org: 'Protección Equina Miranda',   status: 'Pending', notes: 'Found limping near Panamericana' },
  { type: 'Dog',   health: 'Healthy',        location: 'Santa Teresa del Tuy',date: '2025-10-06', org: 'Voluntarios Unidos',          status: 'Pending', notes: 'Seen near main bus terminal' },
  { type: 'Cat',   health: 'Injured',        location: 'Charallave',          date: '2025-10-07', org: 'Fundación TEPA',              status: 'Rescued', notes: 'Rescued from abandoned house' },
  { type: 'Dog',   health: 'Malnourished',   location: 'Petare',              date: '2025-10-08', org: 'Rescate Animal Miranda',      status: 'Pending', notes: 'Found near La Bombilla' },
  { type: 'Cow',   health: 'Healthy',        location: 'Caucagua',            date: '2025-10-09', org: 'AgroRescate Miranda',         status: 'Pending', notes: 'Seen wandering highway' },
  { type: 'Dog',   health: 'Injured',        location: 'Baruta',              date: '2025-10-10', org: 'Fundación TEPA',              status: 'Rescued', notes: 'Rescued near Las Mercedes' },
  { type: 'Cat',   health: 'Healthy',        location: 'Guarenas',            date: '2025-10-11', org: 'Huellas de Amor',             status: 'Pending', notes: 'Seen near Plaza Bolívar' },
  { type: 'Dog',   health: 'Malnourished',   location: 'Los Teques',          date: '2025-10-12', org: 'Voluntarios Unidos',          status: 'Pending', notes: 'Found near Metro station' },
  { type: 'Horse', health: 'Healthy',        location: 'Ocumare del Tuy',     date: '2025-10-13', org: 'Protección Equina Miranda',   status: 'Pending', notes: 'Seen grazing roadside' },
  { type: 'Dog',   health: 'Injured',        location: 'Chacao',              date: '2025-10-14', org: 'Fundación TEPA',              status: 'Rescued', notes: 'Rescued near Altamira' },
  { type: 'Cat',   health: 'Malnourished',   location: 'Guatire',             date: '2025-10-15', org: 'Rescate Animal Miranda',      status: 'Pending', notes: 'Found near abandoned warehouse' },
  { type: 'Dog',   health: 'Healthy',        location: 'Petare',              date: '2025-10-16', org: 'Huellas de Amor',             status: 'Pending', notes: 'Seen near José Félix Ribas sector' },
  { type: 'Dog',   health: 'Injured',        location: 'Baruta',              date: '2025-10-17', org: 'Fundación TEPA',              status: 'Rescued', notes: 'Rescued near Prados del Este' },
  { type: 'Cat',   health: 'Healthy',        location: 'Los Teques',          date: '2025-10-18', org: 'Voluntarios Unidos',          status: 'Pending', notes: 'Seen near Plaza Miranda' },
  { type: 'Dog',   health: 'Malnourished',   location: 'Charallave',          date: '2025-10-19', org: 'Fundación TEPA',              status: 'Pending', notes: 'Found near train station' },
  { type: 'Horse', health: 'Injured',        location: 'Caucagua',            date: '2025-10-20', org: 'Protección Equina Miranda',   status: 'Pending', notes: 'Found near rural road' },
  { type: 'Dog',   health: 'Healthy',        location: 'Guarenas',            date: '2025-10-21', org: 'Huellas de Amor',             status: 'Pending', notes: 'Seen near shopping mall' },
  { type: 'Cat',   health: 'Injured',        location: 'Baruta',              date: '2025-10-22', org: 'Fundación TEPA',              status: 'Rescued', notes: 'Rescued near Bello Monte' },
];

const typeEmoji = { Dog: '🐕', Cat: '🐈', Horse: '🐴', Cow: '🐄' };

const healthColor = {
  Healthy:      'bg-green-100 text-green-700',
  Injured:      'bg-red-100 text-red-700',
  Malnourished: 'bg-orange-100 text-orange-700',
};

const statusColor = {
  Rescued: 'bg-emerald-100 text-emerald-700 border border-emerald-300',
  Pending: 'bg-yellow-50 text-yellow-700 border border-yellow-300',
};

const allTypes = ['All', ...Array.from(new Set(data.map(d => d.type)))];
const allStatuses = ['All', 'Rescued', 'Pending'];

function tl(labels, key) {
  return (labels && labels[key]) ? labels[key] : key;
}

export default function ReportedAnimals() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { t } = useLanguage();
  const ra = t.reportedAnimals;
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const typeLabels = ra.typeLabels || {};
  const healthLabels = ra.healthLabels || {};
  const statusLabels = ra.statusLabels || {};
  const statusFilterLabels = ra.statusFilter || {};

  const filtered = data.filter(row =>
    (typeFilter === 'All' || row.type === typeFilter) &&
    (statusFilter === 'All' || row.status === statusFilter)
  );

  const rescued = data.filter(r => r.status === 'Rescued').length;
  const pending = data.filter(r => r.status === 'Pending').length;

  return (
    <section ref={sectionRef} className="py-20 scrapbook-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp text-secondary-600 border-secondary-400 text-lg inline-block mb-4">
            {ra.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-handwritten font-bold text-accent-600 mb-3">
            {ra.title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            {ra.subtitle}
          </p>
        </motion.div>

        {/* Summary cards */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { label: ra.totalReported, value: data.length, color: 'bg-accent-50 border-accent-200 text-accent-700' },
            { label: ra.rescued, value: rescued, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
            { label: ra.pending, value: pending, color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
            { label: ra.organizations, value: Array.from(new Set(data.map(d => d.org))).length, color: 'bg-secondary-50 border-secondary-200 text-secondary-700' },
          ].map((s, i) => (
            <div key={i} className={`rounded-2xl border-2 p-4 text-center ${s.color}`}>
              <div className="text-3xl font-handwritten font-bold">{s.value}</div>
              <div className="text-sm font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-3 mb-6 items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="text-sm font-semibold text-accent-600 mr-1">{ra.filterType}</span>
          {allTypes.map(type => (
            <button key={type} onClick={() => setTypeFilter(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all border ${
                typeFilter === type
                  ? 'bg-accent-600 text-white border-accent-600'
                  : 'bg-white text-accent-600 border-accent-200 hover:border-accent-400'
              }`}>
              {type !== 'All' && typeEmoji[type]} {type === 'All' ? ra.filterAll : tl(typeLabels, type)}
            </button>
          ))}
          <span className="text-sm font-semibold text-accent-600 ml-3 mr-1">{ra.filterStatus}</span>
          {allStatuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all border ${
                statusFilter === s
                  ? 'bg-secondary-500 text-white border-secondary-500'
                  : 'bg-white text-secondary-600 border-secondary-200 hover:border-secondary-400'
              }`}>
              {tl(statusFilterLabels, s)}
            </button>
          ))}
        </motion.div>

        {/* Table — desktop */}
        <motion.div
          className="hidden md:block rounded-2xl overflow-hidden shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-accent-600 text-white">
                {[ra.colType, ra.colHealth, ra.colLocation, ra.colDate, ra.colOrg, ra.colStatus, ra.colNotes].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={i} className={`border-t border-gray-100 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-secondary-50`}>
                  <td className="px-4 py-3 font-medium text-accent-700">{typeEmoji[row.type]} {tl(typeLabels, row.type)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${healthColor[row.health]}`}>{tl(healthLabels, row.health)}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{row.location}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{row.date}</td>
                  <td className="px-4 py-3 text-gray-600">{row.org}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[row.status]}`}>{tl(statusLabels, row.status)}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 font-handwritten text-lg bg-white">{ra.noRecords}</div>
          )}
        </motion.div>

        {/* Cards — mobile */}
        <div className="md:hidden space-y-4">
          {filtered.map((row, i) => (
            <motion.div key={i}
              className="bg-white rounded-xl shadow border border-gray-100 p-4 space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.03 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-accent-700 text-base">{typeEmoji[row.type]} {tl(typeLabels, row.type)}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[row.status]}`}>{tl(statusLabels, row.status)}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className={`px-2 py-0.5 rounded-full font-semibold ${healthColor[row.health]}`}>{tl(healthLabels, row.health)}</span>
                <span className="text-gray-500">📍 {row.location}</span>
                <span className="text-gray-400">{row.date}</span>
              </div>
              <div className="text-sm text-gray-600">{row.org}</div>
              <div className="text-xs text-gray-400 italic">{row.notes}</div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 font-handwritten text-lg">{ra.noRecords}</div>
          )}
        </div>

      </div>
    </section>
  );
}
