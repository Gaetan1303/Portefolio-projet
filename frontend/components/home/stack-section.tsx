const stackGroups = [
  {
    label: 'Front',
    items: ['Vue.js', 'Next.js']
  },
  {
    label: 'Back',
    items: ['Node.js', 'Symfony']
  },
  {
    label: 'Langages',
    items: ['JavaScript', 'TypeScript', 'PHP', 'Go']
  },
  {
    label: 'Outils',
    items: ['Git', 'REST API', 'MVC']
  }
];

export function StackSection() {
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
              <div className="flex flex-wrap gap-2" aria-label={`Technologies de la categorie ${group.label}`}>
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
