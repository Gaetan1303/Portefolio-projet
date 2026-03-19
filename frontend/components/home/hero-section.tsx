'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

const typingLine = 'Specialise en applications interactives temps reel';

const typingStyle: CSSProperties = {
  // CSS variable consumed by keyframes in globals.css
  ['--typing-width' as string]: `${typingLine.length}ch`,
  width: 'var(--typing-width)'
};

export function HeroSection() {
  return (
    <section className="section-shell pt-16 sm:pt-20" aria-labelledby="hero-title">
      <div className="glass-card relative overflow-hidden p-6 sm:p-10">
        <div className="absolute -right-10 top-8 h-44 w-44 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 h-36 w-36 animate-driftSlow rounded-full bg-secondary/20 blur-2xl" aria-hidden="true" />

        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <p className="badge badge-outline border-primary/40 text-xs uppercase tracking-[0.22em]">Portfolio Full-Stack</p>
          <ThemeToggle />
        </div>

        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        >
          Gaetan <span className="headline-gradient">- Developpeur Full-Stack</span>
        </motion.h1>

        <p className="mt-4 max-w-2xl text-base text-base-content/80 sm:text-lg" aria-live="polite">
          <span
            className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-primary pr-2 align-bottom"
            style={{
              ...typingStyle,
              animation: `typing 3.2s steps(${typingLine.length}), blink 0.8s step-end infinite`
            }}
          >
            {typingLine}
          </span>
        </p>

        <div className="mt-6 grid gap-3 text-sm text-base-content/80 sm:grid-cols-2 sm:max-w-xl">
          <p>
            <span className="font-semibold text-base-content">Localisation:</span> Toulouse, France
          </p>
          <p>
            <span className="font-semibold text-base-content">Disponibilite:</span> Octobre 2026
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#choix" className="btn btn-primary" aria-label="Aller a la section projets">
            Voir mes projets
          </Link>
          <a
            href="https://github.com/Gaetan1303"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
            aria-label="Ouvrir le profil GitHub de Gaetan"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
