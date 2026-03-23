export function AboutSection() {
  return (
    <section className="section-shell py-10" aria-labelledby="about-title">
      <div className="glass-card grid gap-4 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/90">À propos</p>
        <h2 id="about-title" className="font-heading text-3xl font-semibold">
          Développeur full-stack JavaScript, passionné par les expériences collaboratives en temps réel
        </h2>
        <p className="max-w-3xl text-base text-base-content/80">
          Je conçois des interfaces réactives et des backends robustes pour des applications multi-utilisateurs. Mon approche combine exigence
          technique, lisibilité d'architecture et recherche constante de fluidité côté utilisateur.
        </p>
      </div>
    </section>
  );
}
