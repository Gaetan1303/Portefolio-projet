import type { Metadata } from 'next';
import { Space_Grotesk, Fraunces } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';

const heading = Fraunces({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap'
});

const body = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Portfolio dynamique',
  description: 'Portfolio moderne pilote par Symfony et Next.js'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${heading.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
