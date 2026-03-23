import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profil complet',
  description: 'CV, liens professionnels et documentation technique de Gaëtan, développeur full-stack.'
};

const architecturePoints = [
  'Choix d’architecture orientés vers une séparation claire des responsabilités',
  'Frontend Next.js App Router pour une expérience rapide, un bon SEO et une forte modularité',
  'Backend Symfony pour une API solide, maintenable et évolutive',
  'Communication front/back via des contrats REST explicites',
  'Conception orientée vers les interactions en temps réel et la collaboration'
];

const profileHighlights = [
  'Développement front-end, back-end et DevOps pour des bases solides et reproductibles',
  'Approche agile, documentation technique et tests techniques',
  'Habitude des environnements contraints et de la prise de décision rapide'
];

const experienceEntries = [
  {
    role: 'Développeur / Informaticien',
    period: 'Juillet 2014 - Novembre 2020',
    detail: 'Développement e-commerce, optimisation WordPress et mise en place de solutions web adaptées au cahier des charges.'
  },
  {
    role: 'Manager - Burger King (L’Union)',
    period: 'Janvier 2020 - Avril 2022',
    detail: 'Gestion d’équipe en période de rush, organisation des opérations et application des normes qualité et sécurité.'
  },
  {
    role: 'Préparateur snacker - Marie Blachère (Labège)',
    period: 'Août 2023 - Juin 2024',
    detail: 'Exécution opérationnelle, coordination et respect strict des procédures dans un environnement cadencé.'
  }
];

export default function ProfilPage() {
  return (
    <main className="home-bg section-shell py-16">
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <section className="glass-card p-6 sm:p-8" aria-labelledby="profil-title">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary/90">Identité développeur</p>
          <h1 id="profil-title" className="font-heading text-3xl font-bold sm:text-4xl">
            Profil complet
          </h1>

          <div className="mt-6 space-y-3 text-sm sm:text-base">
            <p>
              <span className="font-semibold">CV :</span> Profil full-stack axé JavaScript, TypeScript, PHP et Go, avec une sensibilité DevOps.
            </p>
            <p>
              <span className="font-semibold">Email :</span> gaetan.begue13@gmail.com
            </p>
            <p>
              <span className="font-semibold">Téléphone :</span> 07 81 95 53 24
            </p>
            <p>
              <span className="font-semibold">Localisation :</span> Toulouse
            </p>
            <p>
              <span className="font-semibold">LinkedIn :</span>{' '}
              <a href="https://www.linkedin.com/in/gaetan-begue-693603105" target="_blank" rel="noreferrer" className="link link-primary">
                gaetan-begue-693603105
              </a>
            </p>
            <p>
              <span className="font-semibold">GitHub :</span>{' '}
              <a href="https://github.com/Gaetan1303" target="_blank" rel="noreferrer" className="link link-primary">
                github.com/Gaetan1303
              </a>
            </p>
          </div>

          <h2 className="mt-8 font-heading text-xl font-semibold">Documentation technique</h2>
          <ul className="mt-3 space-y-2 text-sm text-base-content/85">
            {architecturePoints.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-heading text-xl font-semibold">Points forts</h2>
          <ul className="mt-3 space-y-2 text-sm text-base-content/85">
            {profileHighlights.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-heading text-xl font-semibold">Expérience professionnelle</h2>
          <div className="mt-3 grid gap-3">
            {experienceEntries.map((entry) => (
              <article key={entry.role} className="rounded-xl border border-base-content/15 bg-base-100/40 p-4">
                <p className="text-sm font-semibold">{entry.role}</p>
                <p className="text-xs text-base-content/65">{entry.period}</p>
                <p className="mt-2 text-sm text-base-content/80">{entry.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://www.linkedin.com/in/gaetan-begue-693603105" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
              Ouvrir LinkedIn
            </a>
            <a href="https://github.com/Gaetan1303" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
              Ouvrir GitHub
            </a>
          </div>
        </section>

        <aside className="glass-card p-6" aria-label="Résumé CV">
          <h2 className="font-heading text-2xl font-semibold">Résumé CV</h2>
          <p className="mt-3 text-sm text-base-content/80">
            Développeur full-stack autodidacte, je combine approche technique, exécution opérationnelle et capacité d’adaptation rapide.
          </p>
          <div className="mt-5 space-y-2 text-sm text-base-content/80">
            <p>- Frontend: React, Next.js, Vue.js, Tailwind</p>
            <p>- Backend: Node.js, Symfony, APIs REST</p>
            <p>- Langages: JavaScript, TypeScript, PHP, Go</p>
            <p>- Outils: Git, GitLab, Docker, documentation technique</p>
            <p>- Méthodes: agile, travail d’équipe, veille technologique</p>
          </div>

          <div className="mt-6 rounded-xl border border-base-content/15 bg-base-100/40 p-4 text-sm">
            <p className="font-semibold">Formation</p>
            <p className="mt-1 text-base-content/80">Bac+2 Développeur Web et Web Mobile - La Plateforme (Toulouse, 2025-2026)</p>
          </div>

          <div className="mt-7">
            <Link href="/" className="btn btn-outline btn-sm">
              Retour à l'accueil
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
