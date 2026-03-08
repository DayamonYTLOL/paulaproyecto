'use client';

import { Heart, Package, Utensils, Pill, Sparkles, Dog } from 'lucide-react';
import Link from 'next/link';

const items = [
  {
    icon: Utensils,
    title: 'Alimentos',
    description: 'Concentrado para perros y gatos, snacks saludables y alimento húmedo.',
    color: 'bg-orange-50 text-orange-500',
  },
  {
    icon: Pill,
    title: 'Medicamentos',
    description: 'Desparasitantes, vitaminas, antibióticos y productos veterinarios.',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    icon: Heart,
    title: 'Mantas y cobijas',
    description: 'Para mantener calientitos a nuestros peludos en temporada de frío.',
    color: 'bg-red-50 text-red-500',
  },
  {
    icon: Sparkles,
    title: 'Productos de limpieza',
    description: 'Desinfectantes, jabón, cloro y productos para mantener limpio el albergue.',
    color: 'bg-green-50 text-green-500',
  },
  {
    icon: Dog,
    title: 'Juguetes y accesorios',
    description: 'Pelotas, mordedores, collares, correas y platos para agua y comida.',
    color: 'bg-purple-50 text-purple-500',
  },
  {
    icon: Package,
    title: 'Otros implementos',
    description: 'Camas para perros, transportadoras, bolsas para desechos y más.',
    color: 'bg-teal-50 text-teal-500',
  },
];

export default function DonacionEspeciePage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Donación en Especie
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Dona implementos que necesita la fundación para su funcionamiento.
            Tu ayuda llena de amor sus vidas.
          </p>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              ¿Qué puedes donar?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Todos los implementos son necesarios para el bienestar y cuidado de nuestros peludos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${item.color} mb-5`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-warm-50 rounded-2xl p-12">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
              ¿Cómo entregar tu donación?
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto mb-6">
              Puedes coordinar la entrega de tu donación contactándonos directamente.
              También organizamos puntos de recolección en eventos especiales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contacto"
                className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold transition-colors"
              >
                Contáctanos
              </Link>
              <a
                href="https://wa.me/573104434308"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
