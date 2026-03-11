'use client';

import { useState, useEffect, useRef } from 'react';
import { PawPrint, CheckCircle, MapPin, Phone, Search, ImagePlus, X } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function PublishPet() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const fileInputRef = useRef(null);
  const [tab, setTab] = useState('lost');
  const [viewTab, setViewTab] = useState('lost');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    pet_name: '',
    where_found: '',
    contact_number: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [publications, setPublications] = useState([]);
  const [loadingPubs, setLoadingPubs] = useState(true);

  const fetchPublications = () => {
    fetch('/api/publications')
      .then((res) => res.json())
      .then((data) => {
        setPublications(Array.isArray(data) ? data : []);
        setLoadingPubs(false);
      })
      .catch(() => setLoadingPubs(false));
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      let image_url = null;

      // Upload image first if one is selected
      if (imageFile) {
        try {
          setUploading(true);
          const uploadForm = new FormData();
          uploadForm.append('file', imageFile);
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: uploadForm,
          });
          if (uploadRes.ok) {
            const uploadData = await uploadRes.json();
            image_url = uploadData.url;
          }
        } catch {
          // Upload failed - continue without image
        } finally {
          setUploading(false);
        }
      }

      const res = await fetch('/api/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: tab, image_url }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ first_name: '', last_name: '', pet_name: '', where_found: '', contact_number: '', description: '' });
        removeImage();
        fetchPublications();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
      setUploading(false);
    }
  };

  return (
    <section id="publicar-mascota" ref={sectionRef} className="py-24 scrapbook-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp text-accent-500 border-accent-400 text-lg inline-block mb-4">
            {t.publishPet.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-handwritten font-bold text-accent-600 mt-3 mb-4">
            {t.publishPet.title}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t.publishPet.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Tabs */}
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => { setTab('lost'); setViewTab('lost'); }}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
                  tab === 'lost'
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Search className="w-4 h-4 inline mr-2" />
                {t.publishPet.tabLost}
              </button>
              <button
                onClick={() => { setTab('adoption'); setViewTab('adoption'); }}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
                  tab === 'adoption'
                    ? 'bg-secondary-400 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <PawPrint className="w-4 h-4 inline mr-2" />
                {t.publishPet.tabAdopt}
              </button>
            </div>

            {status === 'success' ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-accent-700 mb-2">{t.publishPet.successTitle}</h3>
                <p className="text-gray-600 mb-4">{t.publishPet.successMsg}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-primary-500 font-semibold hover:text-primary-600"
                >
                  {t.publishPet.publishAnother}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-1">{t.publishPet.firstName}</label>
                    <input
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-1">{t.publishPet.lastName}</label>
                    <input
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-1">{t.publishPet.petName}</label>
                  <input
                    type="text"
                    required
                    value={formData.pet_name}
                    onChange={(e) => setFormData({ ...formData, pet_name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-1">{t.publishPet.whereFound}</label>
                  <input
                    type="text"
                    required
                    value={formData.where_found}
                    onChange={(e) => setFormData({ ...formData, where_found: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-1">{t.publishPet.contactNumber}</label>
                  <input
                    type="tel"
                    required
                    value={formData.contact_number}
                    onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-1">{t.publishPet.description}</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-1">{t.publishPet.image}</label>
                  <p className="text-xs text-gray-400 mb-2">{t.publishPet.imageHint}</p>
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary-400 hover:text-primary-500 transition-colors cursor-pointer"
                    >
                      <ImagePlus className="w-8 h-8" />
                      <span className="text-sm font-medium">Click para subir imagen</span>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading' || uploading}
                  className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <PawPrint className="w-4 h-4" />
                  {uploading ? t.publishPet.uploading : status === 'loading' ? t.publishPet.submitting : t.publishPet.submit}
                </motion.button>
                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">{t.publishPet.error}</p>
                )}
              </form>
            )}
          </motion.div>

          {/* Publications list filtered by viewTab */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* View tab switcher */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setViewTab('lost')}
                className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-all ${
                  viewTab === 'lost'
                    ? 'bg-red-500 text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Search className="w-4 h-4 inline mr-1" />
                {t.publishPet.tabLost}
              </button>
              <button
                onClick={() => setViewTab('adoption')}
                className={`flex-1 py-2 rounded-xl font-semibold text-sm transition-all ${
                  viewTab === 'adoption'
                    ? 'bg-secondary-400 text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <PawPrint className="w-4 h-4 inline mr-1" />
                {t.publishPet.tabAdopt}
              </button>
            </div>
            <h3 className="text-2xl font-handwritten font-bold text-accent-600 mb-4">
              {viewTab === 'lost' ? t.publishPet.tabLost : t.publishPet.tabAdopt}
            </h3>

            {loadingPubs ? (
              <div className="text-center py-12">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : publications.filter(p => p.type === viewTab).length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
                <PawPrint className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">{t.publishPet.noPublications}</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                {publications.filter(p => p.type === viewTab).map((pub, pubIdx) => (
                  <motion.div
                    key={pub.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + pubIdx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {pub.image_url && (
                      <img
                        src={pub.image_url}
                        alt={pub.pet_name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-bold text-accent-700 text-lg">{pub.pet_name}</h4>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${
                            pub.type === 'lost'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-primary-100 text-primary-700'
                          }`}
                        >
                          {pub.type === 'lost' ? t.publishPet.lost : t.publishPet.adoption}
                        </span>
                      </div>
                      {pub.description && (
                        <p className="text-gray-600 text-sm mb-3">{pub.description}</p>
                      )}
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {t.publishPet.foundAt}: {pub.where_found}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {t.publishPet.contactLabel}: {pub.contact_number}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        {pub.first_name} {pub.last_name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
