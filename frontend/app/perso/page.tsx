import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projets personnels',
  description: 'Projets personnels collaboratifs avec focus temps reel et architecture distribuee.'
};

export default function PersoPage() {
  return (
    <main className="home-bg section-shell py-16">
      <div className="glass-card p-6 sm:p-8">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary/90">Innovation personnelle</p>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">Projets personnels</h1>
        <p className="mt-4 max-w-3xl text-base-content/80">
          Une zone dediee a des projets ambitieux, souvent collaboratifs, ou les enjeux de synchronisation, de scalabilite et d'architecture sont
          centraux.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-base-content/15 bg-base-100/40 p-5 transition duration-300 hover:border-primary/45 hover:shadow-glow">
            <h2 className="font-heading text-xl font-semibold">Cafeterie</h2>
            <p className="mt-2 text-sm text-base-content/80">Plateforme collaborative orientee interaction et gestion de flux en equipe.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="badge badge-outline">Collaboration</span>
              <span className="badge badge-outline">Architecture modulaire</span>
            </div>
          </article>

          <article className="rounded-xl border border-base-content/15 bg-base-100/40 p-5 transition duration-300 hover:border-primary/45 hover:shadow-glow">
            <h2 className="font-heading text-xl font-semibold">GameMaster L5R</h2>
            <p className="mt-2 text-sm text-base-content/80">Experience multi-utilisateur en temps reel avec synchronisation d'etat et interactions live.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="badge badge-outline">Temps reel</span>
              <span className="badge badge-outline">Architecture distribuee</span>
            </div>
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
