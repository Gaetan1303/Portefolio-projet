import Link from 'next/link';
import type { Route } from 'next';
import type { ReactNode } from 'react';
import { ProfileQrCard } from '@/components/home/profile-qr-card';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portefolio-projet.onrender.com';

type CardLinkProps = {
  title: string;
  description: string;
  href: Route;
  points: string[];
  icon: ReactNode;
};

function CardLink({ title, description, href, points, icon }: CardLinkProps) {
  return (
    <article className="group glass-card flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl border border-primary/35 bg-primary/10 p-2 text-primary" aria-hidden="true">
          {icon}
        </div>
        <h3 className="font-heading text-xl font-semibold">{title}</h3>
      </div>

      <p className="mb-4 text-sm text-base-content/75">{description}</p>

      <ul className="mb-6 space-y-2 text-sm text-base-content/85" aria-label={`Points forts pour ${title}`}>
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <Link href={href} className="btn btn-ghost mt-auto justify-start px-0 text-primary hover:bg-transparent" aria-label={`Ouvrir ${title}`}>
        Explorer {'->'}
      </Link>
    </article>
  );
}

export function MainChoices() {
  return (
    <section id="choix" className="section-shell pt-8" aria-labelledby="main-choices-title">
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary/90">Section principale</p>
          <h2 id="main-choices-title" className="font-heading text-3xl font-semibold sm:text-4xl">
            Trois parcours pour découvrir mon univers
          </h2>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <CardLink
          title="Projets éducatifs"
          description="Projets réalisés durant la formation Bac+2, avec une progression technique constante."
          href="/educatif"
          points={['Architecture MVC', 'Conception et consommation d’API REST', 'Apprentissage technique, structuration et industrialisation']}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 8.5 12 4l9 4.5L12 13 3 8.5Z" />
              <path d="M7 10.5v4.6c0 1 2.2 2.4 5 2.4s5-1.4 5-2.4v-4.6" />
            </svg>
          }
        />

        <CardLink
          title="Projets personnels"
          description="Projets complexes et collaboratifs avec des contraintes d'architecture distribuée."
          href="/perso"
          points={['Cafétéria : plateforme collaborative', 'GameMaster L5R : temps réel multi-utilisateur', 'Focus : temps réel et architecture distribuée']}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m4 19 8-14 3 6h5l-8 8-3-6H4Z" />
            </svg>
          }
        />

        <ProfileQrCard profileUrl={`${siteUrl}/profil`} />
      </div>
    </section>
  );
}
