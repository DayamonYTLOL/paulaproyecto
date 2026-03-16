import { Poppins, Montserrat, Caveat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/lib/LanguageContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
});

export const metadata = {
  title: 'Huellitas | Little Paw Prints',
  description:
    'IB Personal Project — a bilingual platform dedicated to animal rescue, information, and community action in Venezuela.',
  openGraph: {
    title: 'Huellitas | Little Paw Prints',
    description:
      'IB Personal Project — a bilingual platform dedicated to animal rescue, information, and community action in Venezuela.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${poppins.variable} ${montserrat.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased bg-cream-200">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
