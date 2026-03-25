import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profil - Développeur Full-Stack',
  description: 'Profil professionnel de Gaëtan Begue: développement web full-stack, architecture maintenable et approche orientée livraison.'
};

const valueProps = [
  {
    title: 'Vision produit + exécution technique',
    detail: 'Je conçois des interfaces utiles et j’assure leur robustesse côté backend pour livrer des fonctionnalités complètes.'
  },
  {
    title: 'Architecture claire et maintenable',
    detail: 'Approche modulaire, contrats API explicites et code lisible pour accélérer les évolutions sans dette inutile.'
  },
  {
    title: 'Polyvalence Front, Back et DevOps',
    detail: 'Capacité à aller du composant UI au déploiement conteneurisé avec Docker, dans une logique de livraison continue.'
  }
];

const techStack = {
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  backend: ['Node.js', 'Symfony', 'PHP', 'API REST', 'Gin (Go)'],
  dataOps: ['PostgreSQL', 'PDO', 'Docker', 'Git', 'GitLab']
};

const experienceEntries = [
  {
    role: 'Atelier La Plateforme / Missions Euréka',
    period: 'Septembre 2025 - Janvier 2026',
    detail:
      'Développement d’applications web full-stack avec gestion de fichiers (uploads), base de données, APIs et services conteneurisés. Réalisation parallèle d’une application PHP en architecture MVC avec routing RESTful et CRUD.'
  },
  {
    role: 'Développeur / Informaticien',
    period: 'Juillet 2014 - Novembre 2020',
    detail:
      'Développement de sites e-commerce et optimisation de sites vitrines WordPress, en collaboration avec des partenaires et médias pour améliorer la visibilité des projets.'
  },
  {
    role: 'Manager - Burger King (L’Union)',
    period: 'Janvier 2020 - Avril 2022',
    detail:
      'Pilotage opérationnel en période de forte activité: gestion d’équipe, réorganisation rapide des rôles, respect des standards qualité et procédures.'
  },
  {
    role: 'Préparateur snacker - Marie Blachère (Labège)',
    period: 'Août 2023 - Juin 2024',
    detail:
      'Application rigoureuse des processus, contrôle qualité et coordination en environnement cadencé avec respect strict des normes opérationnelles.'
  }
];

const deliveryPoints = [
  'Approche agile avec documentation technique et tests techniques (DTT)',
  'Conception d’applications web complètes du frontend au backend',
  'Capacité d’adaptation rapide et prise de décision en contexte contraint',
  'Culture de l’amélioration continue via la veille technologique'
];

export default function ProfilPage() {
  return (
    <main className="home-bg section-shell py-16">
      <section className="glass-card p-6 sm:p-8" aria-labelledby="profil-title">
        <p className="mb-3 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Développeur Full-Stack
        </p>
        <h1 id="profil-title" className="font-heading text-3xl font-bold sm:text-4xl">
          Gaetan Begue
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-base-content/85 sm:text-base">
          Je conçois et livre des applications web complètes, de l’interface utilisateur jusqu’au backend et au déploiement. Mon objectif:
          transformer un besoin métier en solution fiable, claire et évolutive.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs sm:text-sm">
          <span className="rounded-full border border-base-content/15 bg-base-100/60 px-3 py-1">Toulouse</span>
          <span className="rounded-full border border-base-content/15 bg-base-100/60 px-3 py-1">JavaScript / TypeScript / PHP / Go</span>
          <span className="rounded-full border border-base-content/15 bg-base-100/60 px-3 py-1">Disponible pour nouveaux défis</span>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a href="mailto:gaetan.begue13@gmail.com" className="btn btn-primary btn-sm">
            Me contacter
          </a>
          <a href="https://www.linkedin.com/in/gaetan-begue-693603105" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
            LinkedIn
          </a>
          <a href="https://github.com/Gaetan1303" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
            GitHub
          </a>
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <section className="glass-card p-6" aria-labelledby="value-title">
          <h2 id="value-title" className="font-heading text-2xl font-semibold">
            Hard Skills
          </h2>
          <div className="mt-4 grid gap-3">
            {valueProps.map((item) => (
              <article key={item.title} className="rounded-xl border border-base-content/15 bg-base-100/40 p-4">
                <p className="text-sm font-semibold sm:text-base">{item.title}</p>
                <p className="mt-2 text-sm text-base-content/80">{item.detail}</p>
              </article>
            ))}
          </div>

          <h3 className="mt-8 font-heading text-xl font-semibold">Méthode de travail</h3>
          <ul className="mt-3 space-y-2 text-sm text-base-content/85">
            {deliveryPoints.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <aside className="glass-card p-6" aria-label="Résumé CV">
          <h2 className="font-heading text-2xl font-semibold">Stack technique</h2>

          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="font-semibold">Frontend</p>
              <p className="mt-1 text-base-content/80">{techStack.frontend.join(' - ')}</p>
            </div>
            <div>
              <p className="font-semibold">Backend</p>
              <p className="mt-1 text-base-content/80">{techStack.backend.join(' - ')}</p>
            </div>
            <div>
              <p className="font-semibold">Data / DevOps</p>
              <p className="mt-1 text-base-content/80">{techStack.dataOps.join(' - ')}</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-base-content/15 bg-base-100/40 p-4 text-sm">
            <p className="font-semibold">Formation</p>
            <p className="mt-1 text-base-content/80">Bac+2 Développeur Web et Web Mobile - La Plateforme (Toulouse, 2025-2026)</p>
          </div>

          <div className="mt-6 rounded-xl border border-base-content/15 bg-base-100/40 p-4 text-sm">
            <p className="font-semibold">Contact direct</p>
            <p className="mt-1 text-base-content/80">07 81 95 53 24</p>
            <p className="text-base-content/80">gaetan.begue13@gmail.com</p>
          </div>

          <div className="mt-7">
            <Link href="/" className="btn btn-outline btn-sm">
              Retour à l'accueil
            </Link>
          </div>
        </aside>
      </div>

      <section className="mt-5 glass-card p-6" aria-labelledby="xp-title">
        <h2 id="xp-title" className="font-heading text-2xl font-semibold">
          Expérience professionnelle
        </h2>
        <div className="mt-4 grid gap-3">
          {experienceEntries.map((entry) => (
            <article key={entry.role} className="rounded-xl border border-base-content/15 bg-base-100/40 p-4">
              <p className="text-sm font-semibold sm:text-base">{entry.role}</p>
              <p className="text-xs text-base-content/65">{entry.period}</p>
              <p className="mt-2 text-sm text-base-content/80">{entry.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
