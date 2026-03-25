import Link from 'next/link';
import { fetchProjectBySlug } from '@/lib/api';

/** Props injected by Next.js for a dynamic route segment. */
type ProjectPageProps = {
  /** Route parameters resolved from the `[slug]` segment. */
  params: {
    /** URL-friendly project identifier matching the backend slug. */
    slug: string;
  };
};

/**
 * Project detail page (Server Component).
 *
 * Fetches a single project by its slug from the Symfony API (ISR, 60 s)
 * and renders its full detail: title, description, technology badges,
 * GitHub/demo links, and an embedded QR code image when available.
 *
 * @param props - {@link ProjectPageProps} injected by the Next.js router
 * @returns     The full-page `<main>` element for the project detail view
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await fetchProjectBySlug(params.slug);

  return (
    <main className="home-bg section-shell py-16">
      <div className="glass-card p-6 sm:p-8">
        <Link href="/" className="btn btn-outline btn-sm">
          Retour à l'accueil
        </Link>

        <article className="mt-5">
          <p className="text-xs uppercase tracking-[0.18em] text-primary/90">Template d'origine : {project.template ?? 'N/A'}</p>
          <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl">{project.title}</h1>
          <p className="mt-4 max-w-3xl text-base-content/80">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="badge badge-outline">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex gap-2">
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
              GitHub
            </a>
          ) : null}
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
              Démo
            </a>
          ) : null}
          </div>

          {project.qrCode ? (
            <div className="mt-6 inline-flex rounded-2xl border border-base-content/15 bg-white p-4">
              <img src={project.qrCode} alt={`QR code ${project.title}`} width={180} height={180} />
            </div>
          ) : null}

          {!project.qrCode ? (
            <section className="mt-6 rounded-2xl border border-warning/35 bg-warning/10 p-4" aria-label="Presentation statique du projet">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-warning-content">Mode demo</p>
              <p className="mt-2 text-sm text-base-content/80">
                Backend indisponible: fallback statique.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.visuals.length > 0
                  ? project.visuals.slice(0, 2).map((visual) => (
                      <figure key={visual} className="overflow-hidden rounded-xl border border-base-content/15 bg-base-100/70 p-2 flex flex-col items-center justify-center h-52">
                        <span className="text-xs font-mono text-base-content/70 mb-2">{visual.split('/').pop()}</span>
                        <img src={visual} alt={`Visuel de demonstration ${project.title}`} className="h-32 w-auto rounded-lg object-contain object-center" loading="lazy" />
                      </figure>
                    ))
                  : <div className="flex items-center justify-center h-44 w-full"><span className="loading loading-spinner loading-lg text-warning"></span></div>}
              </div>
            </section>
          ) : null}
        </article>
      </div>
    </main>
  );
}
