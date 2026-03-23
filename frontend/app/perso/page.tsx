import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchProjects } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Projets personnels',
  description: 'Projets personnels collaboratifs avec un focus sur le temps réel et l’architecture distribuée.'
};

export default async function PersoPage() {
  const projects = await fetchProjects();
  const personalProjects = projects.filter((project) => project.template === 'Projet personnel');

  return (
    <main className="home-bg section-shell py-16">
      <div className="glass-card p-6 sm:p-8">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary/90">Innovation personnelle</p>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">Projets personnels</h1>
        <p className="mt-4 max-w-3xl text-base-content/80">
          Une zone dédiée à des projets ambitieux, souvent collaboratifs, où les enjeux de synchronisation, de scalabilité et d'architecture sont
          centraux.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {personalProjects.map((project) => (
            <article
              key={project.title}
              className="rounded-xl border border-base-content/15 bg-base-100/40 p-5 transition duration-300 hover:border-primary/45 hover:shadow-glow"
            >
              <h2 className="font-heading text-xl font-semibold">{project.title}</h2>
              <p className="mt-2 text-sm text-base-content/80">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
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
