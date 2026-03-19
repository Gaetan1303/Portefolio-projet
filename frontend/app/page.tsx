import { ProjectGrid } from '@/components/project-grid';
import { ThemeToggle } from '@/components/theme-toggle';
import { fetchProjects } from '@/lib/api';

/**
 * Home page (Server Component).
 *
 * Fetches all projects from the Symfony API at request time (ISR, 60 s),
 * then renders the hero header and the animated project grid.
 *
 * @returns The root `<main>` element containing the hero and project list
 */
export default async function HomePage() {
  const projects = await fetchProjects();

  return (
    <main className="container">
      <header className="hero">
        <div>
          <p className="eyebrow">Symfony + Next.js + Prototype Pattern</p>
          <h1>Portfolio dynamique, chaque projet devient un mini-site clonable.</h1>
          <p className="subtitle">
            Les contenus viennent de l&apos;API Symfony, les pages sont rendues dynamiquement avec un style moderne et des transitions legeres.
          </p>
        </div>
        <ThemeToggle />
      </header>
      <ProjectGrid projects={projects} />
    </main>
  );
}
