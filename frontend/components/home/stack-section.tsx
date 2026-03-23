import { fetchProjects } from '@/lib/api';

type StackGroup = {
  label: 'Front' | 'Back' | 'Langages' | 'Outils';
  items: string[];
};

const categoryByTechnology: Record<string, StackGroup['label']> = {
  React: 'Front',
  'Vue.js': 'Front',
  'Next.js': 'Front',
  Angular: 'Front',
  Vite: 'Front',
  'Tailwind CSS': 'Front',
  'Node.js': 'Back',
  Symfony: 'Back',
  Express: 'Back',
  PostgreSQL: 'Back',
  JavaScript: 'Langages',
  TypeScript: 'Langages',
  PHP: 'Langages',
  Go: 'Langages',
  Python: 'Langages',
  Java: 'Langages',
  SQL: 'Langages',
  Docker: 'Outils',
  Maven: 'Outils',
  WebSocket: 'Outils',
  'REST API': 'Outils',
  MVC: 'Outils'
};

const fallbackGroups: StackGroup[] = [
  { label: 'Front', items: ['Vue.js', 'Next.js'] },
  { label: 'Back', items: ['Node.js', 'Symfony'] },
  { label: 'Langages', items: ['JavaScript', 'TypeScript', 'PHP', 'Go'] },
  { label: 'Outils', items: ['Docker', 'REST API', 'MVC'] }
];

function buildStackGroups(technologies: string[]): StackGroup[] {
  const groups: Record<StackGroup['label'], string[]> = {
    Front: [],
    Back: [],
    Langages: [],
    Outils: []
  };

  for (const technology of technologies) {
    const category = categoryByTechnology[technology] ?? 'Outils';
    groups[category].push(technology);
  }

  return [
    { label: 'Front', items: groups.Front },
    { label: 'Back', items: groups.Back },
    { label: 'Langages', items: groups.Langages },
    { label: 'Outils', items: groups.Outils }
  ];
}

export async function StackSection() {
  const projects = await fetchProjects();
  const technologies = [...new Set(projects.flatMap((project) => project.technologies))].sort((a, b) => a.localeCompare(b));
  const stackGroups = technologies.length > 0 ? buildStackGroups(technologies) : fallbackGroups;

  return (
    <section className="section-shell pt-0" aria-labelledby="stack-title">
      <div className="glass-card p-6 sm:p-8">
        <h2 id="stack-title" className="mb-6 font-heading text-2xl font-semibold sm:text-3xl">
          Stack technique
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {stackGroups.map((group) => (
            <article key={group.label} className="rounded-xl border border-base-content/15 bg-base-100/45 p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-primary/90">{group.label}</p>
              <div className="flex flex-wrap gap-2" aria-label={`Technologies de la catégorie ${group.label}`}>
                {group.items.map((item) => (
                  <span key={item} className="badge badge-outline border-primary/35 px-3 py-3 text-xs sm:text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
