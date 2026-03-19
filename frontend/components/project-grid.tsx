'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ProjectSummary } from '@/lib/api';

/** Props accepted by the {@link ProjectGrid} component. */
type ProjectGridProps = {
  /** List of projects to display, ordered newest first. */
  projects: ProjectSummary[];
};

/**
 * Renders an animated grid of project cards.
 *
 * Each card fades in with a slight upward slide and a staggered delay
 * based on its index, using Framer Motion. The card links to the
 * dedicated project detail page (`/projects/[slug]`).
 *
 * @param props - {@link ProjectGridProps}
 * @returns     A `<section>` containing one `<article>` per project
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section className="project-grid">
      {projects.map((project, index) => (
        <motion.article
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.07, duration: 0.32 }}
          className="project-card"
        >
          <p className="project-tag">Prototype: {project.slug}</p>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <div className="tech-list">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <Link href={`/projects/${project.slug}`} className="project-link">
            Voir le mini-site
          </Link>
        </motion.article>
      ))}
    </section>
  );
}
