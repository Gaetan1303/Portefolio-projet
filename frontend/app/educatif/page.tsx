import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projets educatifs',
  description: 'Selection de projets educatifs realises pendant la formation Bac+2.'
};

export default function EducatifPage() {
  return (
    <main className="home-bg section-shell py-16">
      <div className="glass-card p-6 sm:p-8">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary/90">Parcours formation</p>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">Projets educatifs</h1>
        <p className="mt-4 max-w-3xl text-base-content/80">
          Cette section regroupe les projets developpes durant mon cursus Bac+2. Chaque iteration m'a permis de consolider les fondamentaux
          d'architecture, de mieux structurer mes APIs REST et d'industrialiser mes pratiques.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-base-content/15 bg-base-100/40 p-4">
            <h2 className="font-heading text-lg font-semibold">Architecture MVC</h2>
            <p className="mt-2 text-sm text-base-content/80">Application rigoureuse du pattern MVC pour separer logique, donnees et rendu.</p>
          </article>

          <article className="rounded-xl border border-base-content/15 bg-base-100/40 p-4">
            <h2 className="font-heading text-lg font-semibold">API REST</h2>
            <p className="mt-2 text-sm text-base-content/80">Conception de routes claires, contrats JSON et gestion propre des erreurs HTTP.</p>
          </article>

          <article className="rounded-xl border border-base-content/15 bg-base-100/40 p-4">
            <h2 className="font-heading text-lg font-semibold">Apprentissage technique</h2>
            <p className="mt-2 text-sm text-base-content/80">Progression continue sur la qualite de code, les tests et la communication front/back.</p>
          </article>
        </div>

        <div className="mt-8">
          <Link href="/" className="btn btn-outline btn-sm">
            Retour homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
