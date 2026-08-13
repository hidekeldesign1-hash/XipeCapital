import type { Metadata, Viewport } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import MotionProvider from '@/components/MotionProvider';
import DiagnosisProvider from '@/components/Diagnosis';
import IntroGate from '@/components/IntroGate';
import SiteGlyphRails from '@/components/SiteGlyphRails';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://xipe-capital.vercel.app'),
  title: 'Xipe Capital Group | Arquitectura Patrimonial',
  description:
    'Integramos protección, ahorro e inversión dentro de una arquitectura patrimonial clara, comprensible y acompañada.',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Xipe Capital Group',
    title: 'Xipe Capital Group | Arquitectura Patrimonial',
    description: 'Tu patrimonio no necesita más productos. Necesita una arquitectura.',
    images: ['/xipe-logo.png'],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: false, follow: false }, // PREVIEW: retirar al publicar
};

export const viewport: Viewport = {
  themeColor: '#050605',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${manrope.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-[200] focus:bg-gold focus:px-6 focus:py-3 focus:text-black focus:font-semibold"
        >
          Ir al contenido
        </a>
        <MotionProvider>
          <DiagnosisProvider>
            <SiteGlyphRails />
            <IntroGate>{children}</IntroGate>
          </DiagnosisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
