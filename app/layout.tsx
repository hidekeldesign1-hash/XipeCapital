import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import DiagnosisProvider from '@/components/Diagnosis';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://xipe-capital-b.vercel.app'),
  title: 'Xipe Capital Group | Arquitectura Patrimonial',
  description: 'Protección, ahorro e inversión dentro de una arquitectura clara que evoluciona contigo.',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Xipe Capital Group',
    title: 'Xipe Capital Group | Arquitectura Patrimonial',
    description: 'Tu patrimonio, diseñado como un sistema.',
    images: ['/xipe-logo.png'],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: false, follow: false }, // PREVIEW: retirar al publicar
};

export const viewport: Viewport = { themeColor: '#F8F9F6', colorScheme: 'light' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${GeistSans.variable} ${manrope.variable}`}>
      {/*
        Vercel Analytics — preparado, no conectado:
        1) npm i @vercel/analytics
        2) import { Analytics } from '@vercel/analytics/react'
        3) <Analytics /> justo antes de </body>
      */}
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-6 focus:py-3 focus:font-semibold focus:text-day"
        >
          Ir al contenido
        </a>
        <DiagnosisProvider>{children}</DiagnosisProvider>
      </body>
    </html>
  );
}
