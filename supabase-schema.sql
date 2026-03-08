-- =============================================
-- Supabase Schema for Huellitas Perdidas
-- Run this in your Supabase SQL Editor
-- =============================================

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Animals for adoption
CREATE TABLE IF NOT EXISTS adopciones (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT DEFAULT 'perro',
  breed TEXT,
  age TEXT,
  gender TEXT,
  size TEXT,
  description TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'disponible',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Adoption requests
CREATE TABLE IF NOT EXISTS adoption_requests (
  id BIGSERIAL PRIMARY KEY,
  animal_id BIGINT REFERENCES adopciones(id),
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  applicant_age INT,
  home_description TEXT,
  family_members INT,
  has_other_pets BOOLEAN DEFAULT FALSE,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pet publications (lost/adoption)
CREATE TABLE IF NOT EXISTS publications (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'lost',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  pet_name TEXT NOT NULL,
  where_found TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Seed data: Blog posts
-- =============================================
INSERT INTO blog_posts (title, slug, excerpt, content, image_url, category, published) VALUES
(
  'Jornada de adopción exitosa',
  'jornada-adopcion-exitosa',
  'Más de 20 peludos encontraron hogar en nuestra última jornada.',
  'Nuestra última jornada de adopción fue todo un éxito. Gracias al apoyo de la comunidad y nuestros voluntarios, pudimos encontrar hogares amorosos para más de 20 de nuestros peludos rescatados.',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80',
  'Eventos',
  TRUE
),
(
  'Campaña de esterilización gratuita',
  'campana-esterilizacion',
  'Realizamos una nueva campaña de esterilización para la comunidad.',
  'Con el apoyo de veterinarios voluntarios, realizamos nuestra campaña mensual de esterilización beneficiando a decenas de familias de la comunidad.',
  'https://images.unsplash.com/photo-1450778869180-cfd0586e7b6b?w=800&q=80',
  'Campañas',
  TRUE
),
(
  'La historia de Luna',
  'historia-de-luna',
  'Conoce la emotiva historia de rescate de Luna, ahora lista para un hogar.',
  'Luna fue encontrada en condiciones muy difíciles en las calles. Después de semanas de rehabilitación, cuidado veterinario y mucho amor, hoy está lista para encontrar una familia que la ame.',
  'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&q=80',
  'Rescates',
  TRUE
);

-- =============================================
-- Seed data: Animals for adoption
-- =============================================
INSERT INTO adopciones (name, species, breed, age, gender, size, description, image_url, status) VALUES
('Rocky', 'perro', 'Mestizo', '2 años', 'Macho', 'Mediano', 'Rocky es un perro alegre y juguetón que adora correr y jugar con pelotas. Es muy cariñoso con los niños.', 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=600&q=80', 'disponible'),
('Luna', 'perro', 'Labrador mix', '1 año', 'Hembra', 'Grande', 'Luna es una perrita dulce y tranquila. Le encanta dar paseos largos y acurrucarse en el sofá.', 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&q=80', 'disponible'),
('Max', 'perro', 'Pastor Alemán mix', '3 años', 'Macho', 'Grande', 'Max es un perro leal y protector. Ideal para familias con experiencia en perros grandes.', 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80', 'disponible'),
('Canela', 'perro', 'Criolla', '4 meses', 'Hembra', 'Pequeño', 'Canela es una cachorrita muy curiosa y juguetona. Perfecta para familias activas.', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80', 'disponible'),
('Toby', 'perro', 'Poodle mix', '5 años', 'Macho', 'Pequeño', 'Toby es un perrito tranquilo y amoroso. Ideal para personas mayores o apartamentos.', 'https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?w=600&q=80', 'disponible'),
('Nala', 'perro', 'Golden mix', '2 años', 'Hembra', 'Grande', 'Nala es increíblemente cariñosa y social. Se lleva bien con otros perros y con gatos.', 'https://images.unsplash.com/photo-1583337130417-13571c40b8e0?w=600&q=80', 'disponible');

-- =============================================
-- Supabase Storage: Create a bucket for pet images
-- Run this separately or create via Supabase Dashboard:
-- 1. Go to Storage in your Supabase Dashboard
-- 2. Create a new bucket called "pet-images"
-- 3. Set it to PUBLIC
-- 4. Add policy: Allow anonymous uploads (INSERT)
-- 5. Add policy: Allow public reads (SELECT)
-- =============================================

-- Enable Row Level Security (optional but recommended)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE adopciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoption_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;

-- Policies: Allow anonymous inserts for public forms
CREATE POLICY "Allow anonymous inserts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous reads" ON contacts FOR SELECT USING (true);

CREATE POLICY "Allow anonymous inserts" ON newsletter FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous updates" ON newsletter FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous reads" ON newsletter FOR SELECT USING (true);

CREATE POLICY "Allow anonymous reads" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous inserts" ON blog_posts FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous reads" ON adopciones FOR SELECT USING (true);
CREATE POLICY "Allow anonymous inserts" ON adopciones FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON adoption_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous reads" ON adoption_requests FOR SELECT USING (true);

CREATE POLICY "Allow anonymous inserts" ON publications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous reads" ON publications FOR SELECT USING (true);
