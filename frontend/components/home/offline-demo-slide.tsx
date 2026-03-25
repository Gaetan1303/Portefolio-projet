type OfflineDemoSlideProps = {
  title?: string;
};

const offlineVisuals = [
  {
    src: '/assets/cv_img-000.png',
    alt: 'Portrait professionnel de Gaetan'
  },
  {
    src: '/assets/cv_img-001.png',
    alt: 'QR code de contact'
  }
];

export function OfflineDemoSlide({ title = 'Mode demonstration sans backend' }: OfflineDemoSlideProps) {
  return (
    <section className="rounded-2xl border border-warning/35 bg-warning/10 p-4 sm:p-5" aria-label="Mode demonstration">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-warning-content">Mode demo</p>
      <h3 className="mt-2 font-heading text-lg font-semibold sm:text-xl">{title}</h3>
      <p className="mt-2 text-sm text-base-content/80">
        L API ou la base de donnees est indisponible. Cette page bascule automatiquement sur une presentation statique pour garantir la demo.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {offlineVisuals.map((visual) => (
          <figure key={visual.src} className="overflow-hidden rounded-xl border border-base-content/15 bg-base-100/70 p-2 flex flex-col items-center justify-center h-52">
            <span className="text-xs font-mono text-base-content/70 mb-2">{visual.src.split('/').pop()}</span>
            <img src={visual.src} alt={visual.alt} className="h-32 w-auto rounded-lg object-contain object-center" loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}
