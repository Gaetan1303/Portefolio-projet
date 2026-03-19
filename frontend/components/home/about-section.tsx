export function AboutSection() {
  return (
    <section className="section-shell py-10" aria-labelledby="about-title">
      <div className="glass-card grid gap-4 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/90">A propos</p>
        <h2 id="about-title" className="font-heading text-3xl font-semibold">
          Developpeur full-stack JS, passionne par les experiences collaboratives en temps reel
        </h2>
        <p className="max-w-3xl text-base text-base-content/80">
          Je concois des interfaces reactives et des backends robustes pour des applications multi-utilisateurs. Mon approche combine exigence
          technique, lisibilite d'architecture et obsession de la fluidite cote utilisateur.
        </p>
      </div>
    </section>
  );
}
