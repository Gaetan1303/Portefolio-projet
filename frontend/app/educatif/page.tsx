import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchProjects } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Projets éducatifs',
  description: 'Sélection de projets éducatifs réalisés pendant la formation Bac+2.'
};

export default async function EducatifPage() {
  const projects = await fetchProjects();
  const educationalProjects = projects.filter((project) => project.template === 'Projet educatif');

  return (
    <main className="home-bg section-shell py-16">
      <div className="glass-card p-6 sm:p-8">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary/90">Parcours de formation</p>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">Projets éducatifs</h1>
        <p className="mt-4 max-w-3xl text-base-content/80">
          Cette section regroupe les projets développés durant mon cursus Bac+2. Chaque itération m'a permis de consolider les fondamentaux
          d'architecture, de mieux structurer mes API REST et d'industrialiser mes pratiques.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {educationalProjects.map((project) => (
            <article key={project.title} className="rounded-xl border border-base-content/15 bg-base-100/40 p-4">
              <h2 className="font-heading text-lg font-semibold">{project.title}</h2>
              <p className="mt-2 text-sm text-base-content/80">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((item) => (
                  <span key={item} className="badge badge-outline">
                    {item}
                  </span>
                ))}
              </div>
              <a
                href={project.githubUrl ?? '#'}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost btn-sm mt-4 px-0 text-primary hover:bg-transparent"
              >
                Voir le repository
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/" className="btn btn-outline btn-sm">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
