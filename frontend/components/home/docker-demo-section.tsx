'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type LiveState = 'live' | 'starting' | 'offline';

type DockerProject = {
  key: string;
  name: string;
  description: string;
  stack: string[];
  githubRepo: string;
  docsUrl: string;
  demoUrl: string | null;
  hasDockerfile: boolean;
  hasCompose: boolean;
  architecture: string[];
  ports: string[];
  restartUrl: string | null;
};

type ProjectHealth = {
  state: LiveState;
  latencyMs: number | null;
  checkedAt: string;
  reachableUrl: string | null;
};

type HealthPayload = {
  services: Record<string, ProjectHealth>;
};

type LogEntry = {
  at: string;
  state: LiveState;
  latencyMs: number | null;
};

const projects: DockerProject[] = [
  {
    key: 'cafeterie',
    name: 'Cafétéria',
    description: 'Plateforme collaborative de gestion des consommations, du stock et des événements.',
    stack: ['Vue.js 3', 'Express', 'MongoDB', 'Docker'],
    githubRepo: 'https://github.com/Gaetan1303/Cafeterie',
    docsUrl: 'https://github.com/Gaetan1303/Cafeterie-Back#readme',
    demoUrl: process.env.NEXT_PUBLIC_DEMO_CAFETERIE_URL ?? null,
    hasDockerfile: true,
    hasCompose: true,
    architecture: ['frontend', 'backend', 'base de donnees'],
    ports: ['4173: frontend', '5000: api', '27017: mongodb'],
    restartUrl: process.env.NEXT_PUBLIC_DEMO_CAFETERIE_RESTART_URL ?? null
  },
  {
    key: 'gamemaster-l5r',
    name: 'GameMaster L5R',
    description: 'Plateforme de jeu de rôle multi-interface avec synchronisation temps réel entre maître de jeu et joueurs.',
    stack: ['TypeScript', 'Node.js', 'Express', 'MongoDB'],
    githubRepo: 'https://github.com/Gaetan1303/GM_L5R',
    docsUrl: 'https://github.com/Gaetan1303/JDR-test#readme',
    demoUrl: process.env.NEXT_PUBLIC_DEMO_GAMEMASTER_URL ?? null,
    hasDockerfile: true,
    hasCompose: true,
    architecture: ['interface GM', 'interface joueur', 'backend', 'base de données'],
    ports: ['3001: GM', '3002: joueur', '5001: api', '27017: mongodb'],
    restartUrl: process.env.NEXT_PUBLIC_DEMO_GAMEMASTER_RESTART_URL ?? null
  }
];

function statusBadge(state: LiveState) {
  if (state === 'live') {
    return <span className="badge badge-success gap-1">Live</span>;
  }

  if (state === 'starting') {
    return <span className="badge badge-warning gap-1">Starting</span>;
  }

  return <span className="badge badge-error gap-1">Offline</span>;
}

function formatTime(value: string) {
  const date = new Date(value);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function ArchitecturePreview({ project }: { project: DockerProject }) {
  const dbName = useMemo(() => (project.stack.includes('MongoDB') ? 'MongoDB' : 'PostgreSQL'), [project.stack]);

  return (
    <details className="mt-4 rounded-xl border border-base-content/20 bg-base-100/50 p-4">
      <summary className="cursor-pointer text-sm font-semibold text-primary">Voir l'architecture</summary>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-base-200/60 p-3 font-mono text-xs sm:text-sm">
{`[ Next.js / Vue ]
       |
[ API Node.js / Symfony ]
       |
[ ${dbName} ]`}
      </pre>
    </details>
  );
}

function ProjectDockerCard({ project, health, logs }: { project: DockerProject; health: ProjectHealth | null; logs: LogEntry[] }) {
  const liveState: LiveState = health?.state ?? 'starting';

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.38 }}
      className="glass-card p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-heading text-2xl font-semibold">{project.name}</h3>
          <p className="mt-1 text-sm text-base-content/80">{project.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {statusBadge(liveState)}
          <span className="rounded-md border border-primary/35 bg-primary/10 px-2 py-1 text-xs text-primary">Docker</span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span key={tech} className="badge badge-outline border-primary/35">
            {tech}
          </span>
        ))}
      </div>

      <div className="grid gap-4 text-sm md:grid-cols-2">
        <div className="rounded-xl border border-base-content/15 bg-base-100/40 p-3">
          <p className="mb-2 font-semibold">Détails Docker</p>
          <p>- Dockerfile: {project.hasDockerfile ? 'oui' : 'non'}</p>
          <p>- docker-compose.yml: {project.hasCompose ? 'oui' : 'non'}</p>
          <p>- Architecture: {project.architecture.join(' / ')}</p>
          <p className="mt-2 text-xs text-base-content/75">Pipeline : build automatique GitHub + déploiement continu.</p>
        </div>

        <div className="rounded-xl border border-base-content/15 bg-base-100/40 p-3">
          <p className="mb-2 font-semibold">Monitoring simple</p>
          <p>- Statut serveur: {liveState}</p>
          <p>- Latence: {health?.latencyMs ? `${health.latencyMs} ms` : 'n/a'}</p>
          <p>- Dernière vérification: {health ? formatTime(health.checkedAt) : 'en attente'}</p>
          <p>- URL de démo: {project.demoUrl ?? 'à configurer'}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-base-content/15 bg-base-100/40 p-3 text-sm">
        <p className="mb-2 font-semibold">Ports exposés</p>
        {project.ports.map((port) => (
          <p key={port}>- {port}</p>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a href={project.githubRepo} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
          Voir le code
        </a>
        <a href={project.docsUrl} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
          Documentation
        </a>
        {project.demoUrl ? (
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
            Voir la démo live
          </a>
        ) : (
          <button type="button" className="btn btn-secondary btn-sm" disabled>
            Démo live à configurer
          </button>
        )}
        {project.restartUrl ? (
          <a href={project.restartUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
            Redémarrer le conteneur
          </a>
        ) : (
          <button type="button" className="btn btn-ghost btn-sm" disabled>
            Redémarrer le conteneur
          </button>
        )}
      </div>

      <details className="mt-4 rounded-xl border border-emerald-400/20 bg-[#050805] p-4">
        <summary className="cursor-pointer font-mono text-sm text-emerald-300">Voir logs</summary>
        <div className="mt-3 min-h-20 rounded-lg border border-emerald-500/20 bg-black/70 p-3 font-mono text-xs text-emerald-300 sm:text-sm">
          {logs.length === 0 ? <p>Aucun log pour le moment.</p> : null}
          {logs.map((log, index) => (
            <p key={`${project.key}-${log.at}-${index}`}>
              [{formatTime(log.at)}] state={log.state} latency={log.latencyMs ?? 'n/a'}ms
            </p>
          ))}
        </div>
      </details>

      <ArchitecturePreview project={project} />
    </motion.article>
  );
}

export function DockerDemoSection() {
  const [healthMap, setHealthMap] = useState<Record<string, ProjectHealth>>({});
  const [logMap, setLogMap] = useState<Record<string, LogEntry[]>>({});

  useEffect(() => {
    let mounted = true;

    const pullStatus = async () => {
      try {
        const response = await fetch('/api/live-status', { cache: 'no-store' });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as HealthPayload;

        if (!mounted) {
          return;
        }

        setHealthMap(payload.services);
        setLogMap((previous) => {
          const next = { ...previous };

          Object.entries(payload.services).forEach(([key, service]) => {
            const history = next[key] ?? [];
            const nextEntry: LogEntry = {
              at: service.checkedAt,
              state: service.state,
              latencyMs: service.latencyMs
            };

            next[key] = [nextEntry, ...history].slice(0, 6);
          });

          return next;
        });
      } catch {
        // Ignore transient polling failures.
      }
    };

    pullStatus();
    const id = window.setInterval(pullStatus, 45000);

    return () => {
      mounted = false;
      window.clearInterval(id);
    };
  }, []);

  return (
    <section id="docker-demo-title" className="section-shell" aria-labelledby="docker-demo-title">
      <div className="mb-6">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary/90">Démonstration technique</p>
        <h2 id="docker-demo-title" className="font-heading text-3xl font-semibold sm:text-4xl">
          Déploiement & démos via Docker
        </h2>
        <p className="mt-3 max-w-3xl text-base-content/80">
          Chaque projet est conteneurisé avec Docker et peut être déployé pour une démonstration rapide. L’utilisateur peut ouvrir une démo réelle en un clic, sans installation locale.
        </p>
      </div>

      <div className="grid gap-5">
        {projects.map((project) => (
          <ProjectDockerCard key={project.key} project={project} health={healthMap[project.key] ?? null} logs={logMap[project.key] ?? []} />
        ))}
      </div>
    </section>
  );
}
