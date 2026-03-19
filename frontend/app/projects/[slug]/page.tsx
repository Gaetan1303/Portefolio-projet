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
    <main className="container detail-page">
      <Link href="/" className="project-link">
        Retour a la liste
      </Link>
      <article className="project-detail-card">
        <p className="project-tag">Template source: {project.template ?? 'N/A'}</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <div className="tech-list">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="link-row">
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
          ) : null}
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              Demo
            </a>
          ) : null}
        </div>
        {project.qrCode ? <img src={project.qrCode} alt={`QR code ${project.title}`} className="qr-code" /> : null}
      </article>
    </main>
  );
}
