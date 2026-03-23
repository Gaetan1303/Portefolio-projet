import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const heading = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
  display: 'swap'
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portefolio-projet.onrender.com'),
  title: {
    default: 'Gaëtan - Développeur Full-Stack',
    template: '%s | Gaëtan'
  },
  description: 'Portfolio full-stack moderne de Gaëtan, spécialisé dans les applications interactives en temps réel avec Next.js et Symfony.',
  openGraph: {
    title: 'Gaëtan - Développeur Full-Stack',
    description: 'Applications interactives en temps réel, architecture front/back moderne et projets collaboratifs.',
    type: 'website',
    locale: 'fr_FR'
  },
  alternates: {
    canonical: '/'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" data-theme="gaetan_dark" suppressHydrationWarning>
      <body className={`${heading.variable} ${body.variable} min-h-screen bg-base-100 text-base-content`}>{children}</body>
    </html>
  );
}
