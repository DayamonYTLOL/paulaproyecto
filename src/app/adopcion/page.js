'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Heart, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function AdopcionPage() {
  const { t } = useLanguage();
  const ta = t.adopcion;
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    applicant_name: '',
    applicant_email: '',
    applicant_phone: '',
    applicant_age: '',
    home_description: '',
    family_members: '',
    has_other_pets: false,
    message: '',
  });
  const [formStatus, setFormStatus] = useState('idle');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    Promise.all([
      fetch('/api/adopciones').then((r) => r.json()).catch(() => []),
      fetch('/api/publications').then((r) => r.json()).catch(() => []),
    ]).then(([adopciones, publications]) => {
      const fromAdopciones = Array.isArray(adopciones) ? adopciones : [];
      const fromPublications = Array.isArray(publications)
        ? publications
            .filter((p) => p.type === 'adoption')
            .map((p) => ({
              id: `pub-${p.id}`,
              name: p.pet_name,
              breed: '',
              age: '',
              gender: '',
              size: '',
              description: p.description,
              image_url: p.image_url || null,
              contact_number: p.contact_number,
              owner: `${p.first_name} ${p.last_name}`,
              where_found: p.where_found,
              _fromPublication: true,
            }))
        : [];
      setAnimals([...fromAdopciones, ...fromPublications]);
      setLoading(false);
    });
  }, []);

  const handleAdopt = (animal) => {
    setSelectedAnimal(animal);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const res = await fetch('/api/adopciones/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          animal_id: selectedAnimal?.id,
          applicant_age: parseInt(formData.applicant_age) || null,
          family_members: parseInt(formData.family_members) || 1,
        }),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({
          applicant_name: '',
          applicant_email: '',
          applicant_phone: '',
          applicant_age: '',
          home_description: '',
          family_members: '',
          has_other_pets: false,
          message: '',
        });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const filteredAnimals =
    filter === 'all'
      ? animals
      : animals.filter((a) => a.size?.toLowerCase() === filter);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Adopta un amigo peludo
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Cada uno de ellos merece una segunda oportunidad. Encuentra tu compañero ideal.
          </p>
        </div>
      </section>

      {/* Adoption Form Modal */}
      {showForm && (
        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  Solicitud de Adopción
                </h2>
                {selectedAnimal && (
                  <p className="text-primary-500 mt-1">
                    Para: {selectedAnimal.name}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  setShowForm(false);
                  setFormStatus('idle');
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>

            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <Heart className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ¡Solicitud enviada!
                </h3>
                <p className="text-gray-600">
                  Nos pondremos en contacto contigo pronto para continuar el proceso.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicant_name}
                      onChange={(e) =>
                        setFormData({ ...formData, applicant_name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.applicant_email}
                      onChange={(e) =>
                        setFormData({ ...formData, applicant_email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.applicant_phone}
                      onChange={(e) =>
                        setFormData({ ...formData, applicant_phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Edad
                    </label>
                    <input
                      type="number"
                      min="21"
                      value={formData.applicant_age}
                      onChange={(e) =>
                        setFormData({ ...formData, applicant_age: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Miembros en el hogar
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.family_members}
                      onChange={(e) =>
                        setFormData({ ...formData, family_members: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Describe tu hogar
                  </label>
                  <textarea
                    value={formData.home_description}
                    onChange={(e) =>
                      setFormData({ ...formData, home_description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.has_other_pets}
                    onChange={(e) =>
                      setFormData({ ...formData, has_other_pets: e.target.checked })
                    }
                    className="w-4 h-4 accent-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    Tengo otras mascotas en casa
                  </span>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje adicional
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold transition-colors disabled:opacity-50"
                >
                  {formStatus === 'loading' ? 'Enviando...' : 'Enviar solicitud de adopción'}
                </button>
                {formStatus === 'error' && (
                  <p className="text-red-500 text-sm text-center">
                    Hubo un error. Por favor intenta de nuevo.
                  </p>
                )}
              </form>
            )}
          </div>
        </section>
      )}

      {/* Filter & Animals Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {[
              { label: 'Todos', value: 'all' },
              { label: 'Pequeño', value: 'pequeño' },
              { label: 'Mediano', value: 'mediano' },
              { label: 'Grande', value: 'grande' },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                  filter === f.value
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-gray-500 mt-4">{ta.loading}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAnimals.map((animal) => (
                <div
                  key={animal.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={animal.image_url || '/images/Imagen1.jpg'}
                      alt={animal.name}
                      onError={(e) => { e.target.src = '/images/Imagen1.jpg'; }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {ta.available}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{animal.name}</h3>
                      <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full font-medium">
                        {animal.size}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                      {animal.breed && <><span>{animal.breed}</span><span>&bull;</span></>}
                      {animal.age && <><span>{animal.age}</span><span>&bull;</span></>}
                      {animal.gender ? <span>{animal.gender}</span> : animal._fromPublication && animal.where_found ? <span className="text-xs text-gray-400">{ta.zone}: {animal.where_found}</span> : null}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {animal.description}
                    </p>
                    <button
                      onClick={() => handleAdopt(animal)}
                      className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      {ta.wantToAdopt}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredAnimals.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                {ta.noAnimals}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
