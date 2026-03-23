/**
 * Summary representation of a project returned by the list endpoint.
 *
 * @property id           - Auto-generated database identifier
 * @property title        - Human-readable project title
 * @property slug         - URL-friendly unique identifier
 * @property description  - Short project description
 * @property githubUrl    - Link to the GitHub repository, or null if absent
 * @property demoUrl      - Link to the live demo, or null if absent
 * @property visuals      - Ordered list of image/asset URLs
 * @property technologies - Flat list of technology labels (e.g. ["Symfony", "React"])
 */
export type ProjectSummary = {
  id: number;
  title: string;
  slug: string;
  description: string;
  githubUrl: string | null;
  demoUrl: string | null;
  visuals: string[];
  template: string | null;
  technologies: string[];
};

/**
 * Detailed project representation returned by the single-project endpoint.
 *
 * Extends {@link ProjectSummary} with extra fields only needed on the detail page.
 *
 * @property template - Name of the source Template (Prototype Pattern), or null
 * @property qrCode   - Inline SVG data-URI pointing to the demo/GitHub URL, or null
 */
export type ProjectDetails = ProjectSummary & {
  template: string | null;
  qrCode: string | null;
};

const configuredPublicApiUrl = process.env.NEXT_PUBLIC_API_URL;
const serverApiUrl =
  process.env.API_INTERNAL_URL ??
  (process.env.NODE_ENV === 'development' ? configuredPublicApiUrl?.replace('localhost', 'backend') : configuredPublicApiUrl);

const apiBaseUrl =
  typeof window === 'undefined'
    ? serverApiUrl ?? 'http://backend:8000'
    : configuredPublicApiUrl ?? 'http://localhost:8000';

const fallbackProjects: ProjectSummary[] = [
  {
    id: 1,
    title: 'Cafeterie',
    slug: 'cafeterie',
    description: 'Plateforme collaborative de gestion opérationnelle avec front Vue.js et API dédiée.',
    githubUrl: 'https://github.com/Gaetan1303/Cafeterie',
    demoUrl: process.env.NEXT_PUBLIC_DEMO_CAFETERIE_URL ?? null,
    visuals: [],
    template: 'Projet personnel',
    technologies: ['Vue.js', 'JavaScript', 'Vite']
  },
  {
    id: 2,
    title: 'Cafeterie Back',
    slug: 'cafeterie-back',
    description: 'API Node.js/Express pour la gestion de la plateforme Cafeterie.',
    githubUrl: 'https://github.com/Gaetan1303/Cafeterie-Back',
    demoUrl: null,
    visuals: [],
    template: 'Projet personnel',
    technologies: ['Node.js', 'Express', 'JavaScript']
  },
  {
    id: 3,
    title: 'Aether Engine',
    slug: 'aether-engine',
    description: 'Serveur de logique metier oriente jeu avec architecture scalable.',
    githubUrl: 'https://github.com/Gaetan1303/Aether-Engine',
    demoUrl: null,
    visuals: [],
    template: 'Projet personnel',
    technologies: ['Go', 'REST API']
  },
  {
    id: 4,
    title: 'Aether Game',
    slug: 'aether-game',
    description: 'Client TypeScript/Angular connecte au moteur Aether et aux flux temps reel.',
    githubUrl: 'https://github.com/Gaetan1303/Aether-Game',
    demoUrl: null,
    visuals: [],
    template: 'Projet personnel',
    technologies: ['TypeScript', 'Angular']
  },
  {
    id: 5,
    title: 'GameMaster L5R',
    slug: 'gamemaster-l5r',
    description: 'Application temps réel avec interfaces GM/Joueur et services Node.js.',
    githubUrl: 'https://github.com/Gaetan1303/JDR-test',
    demoUrl: process.env.NEXT_PUBLIC_DEMO_GAMEMASTER_URL ?? null,
    visuals: [],
    template: 'Projet personnel',
    technologies: ['TypeScript', 'Node.js', 'Express', 'WebSocket']
  },
  {
    id: 6,
    title: 'L5R JDR',
    slug: 'l5r-jdr',
    description: 'Projet TypeScript axe sur les interactions multi-utilisateur et le temps reel.',
    githubUrl: 'https://github.com/Gaetan1303/L5R-JDR',
    demoUrl: null,
    visuals: [],
    template: 'Projet personnel',
    technologies: ['TypeScript', 'JavaScript', 'WebSocket']
  },
  {
    id: 7,
    title: 'Rokugan le monde de L5R',
    slug: 'rokugan-le-monde-de-l5r',
    description: 'Application JavaScript/TypeScript autour de l univers L5R et de ses services backend.',
    githubUrl: 'https://github.com/Gaetan1303/Rokugan_le_monde_de_L5R',
    demoUrl: null,
    visuals: [],
    template: 'Projet personnel',
    technologies: ['JavaScript', 'TypeScript', 'Node.js']
  },
  {
    id: 8,
    title: 'Inter Ville Project',
    slug: 'inter-ville-project',
    description: 'Projet JavaScript collaboratif avec environnement Docker et architecture modulaire.',
    githubUrl: 'https://github.com/Gaetan1303/Inter-Ville-Project',
    demoUrl: null,
    visuals: [],
    template: 'Projet personnel',
    technologies: ['JavaScript', 'Node.js', 'Docker']
  },
  {
    id: 9,
    title: 'API L5R',
    slug: 'api-l5r',
    description: 'API Python dediee a l univers L5R avec endpoints metier et conteneurisation Docker.',
    githubUrl: 'https://github.com/Gaetan1303/API-L5R',
    demoUrl: null,
    visuals: [],
    template: 'Projet personnel',
    technologies: ['Python', 'Docker', 'REST API']
  },
  {
    id: 10,
    title: 'TP Pokemon React',
    slug: 'tp-pokemon-react',
    description: 'Projet pedagogique React pour consommation d API et UI interactive.',
    githubUrl: 'https://github.com/Gaetan1303/TP-Pokemon-React',
    demoUrl: null,
    visuals: [],
    template: 'Projet educatif',
    technologies: ['React', 'JavaScript', 'Vite']
  },
  {
    id: 11,
    title: 'test-mvn',
    slug: 'test-mvn',
    description: 'Projet Java avec Maven et outillage Docker pour structuration build/deploiement.',
    githubUrl: 'https://github.com/Gaetan1303/test-mvn',
    demoUrl: null,
    visuals: [],
    template: 'Projet educatif',
    technologies: ['Java', 'Maven', 'Docker']
  },
  {
    id: 12,
    title: 'Mediatheque Toulouse GRP1',
    slug: 'mediatheque-toulouse-grp1',
    description: 'Projet de groupe mediatheque web avec logique CRUD orientee PHP/SQL.',
    githubUrl: 'https://github.com/Gaetan1303/mediatheque_toulouse_grp1',
    demoUrl: null,
    visuals: [],
    template: 'Projet educatif',
    technologies: ['PHP', 'SQL']
  },
  {
    id: 13,
    title: 'Mars IA Atelier 2 Toulouse',
    slug: 'mars-ia-atelier2-toulouse',
    description: 'Projet collaboratif autour du festival Mars IA, integration front React/JS.',
    githubUrl: 'https://github.com/Fraxoo/mars-ia-atelier2-toulouse',
    demoUrl: null,
    visuals: [],
    template: 'Projet educatif',
    technologies: ['React', 'JavaScript']
  }
];

function mergeWithFallbackProjects(apiProjects: ProjectSummary[]): ProjectSummary[] {
  const bySlug = new Map<string, ProjectSummary>();

  for (const project of fallbackProjects) {
    bySlug.set(project.slug, project);
  }

  for (const project of apiProjects) {
    bySlug.set(project.slug, project);
  }

  return Array.from(bySlug.values());
}

function fallbackProjectBySlug(slug: string): ProjectDetails | null {
  const project = fallbackProjects.find((item) => item.slug === slug);

  if (!project) {
    return null;
  }

  return {
    ...project,
    qrCode: null
  };
}

/**
 * Fetches the full list of projects from the Symfony API, ordered newest first.
 *
 * Uses ISR (Incremental Static Regeneration) with a 60-second revalidation window
 * so the page stays fresh without hitting the API on every request.
 *
 * @returns A promise resolving to an array of {@link ProjectSummary} objects
 * @throws  {Error} When the API returns a non-2xx HTTP status
 */
export async function fetchProjects(): Promise<ProjectSummary[]> {
  try {
    const response = await fetch(`${apiBaseUrl}/api/portfolio/projects`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`Unable to fetch projects (status: ${response.status})`);
    }

    const json = (await response.json()) as
      | { items?: ProjectSummary[]; 'hydra:member'?: ProjectSummary[] }
      | ProjectSummary[];

    if (Array.isArray(json)) {
      return mergeWithFallbackProjects(json);
    }

    if (Array.isArray(json.items)) {
      return mergeWithFallbackProjects(json.items);
    }

    if (Array.isArray(json['hydra:member'])) {
      return mergeWithFallbackProjects(json['hydra:member']);
    }

    return fallbackProjects;
  } catch (error) {
    // Keep build/prerender resilient when the API is temporarily unavailable.
    console.warn('Unable to fetch projects, using fallback portfolio data.', error);
    return fallbackProjects;
  }
}

/**
 * Fetches a single project by its URL slug from the Symfony API.
 *
 * Uses ISR with a 60-second revalidation window.
 *
 * @param slug - The unique URL slug of the project (e.g. "my-project")
 * @returns    A promise resolving to a {@link ProjectDetails} object
 * @throws     {Error} When the API returns a non-2xx HTTP status (including 404)
 */
export async function fetchProjectBySlug(slug: string): Promise<ProjectDetails> {
  try {
    const response = await fetch(`${apiBaseUrl}/api/portfolio/projects/${slug}`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      const fallback = fallbackProjectBySlug(slug);

      if (fallback) {
        return fallback;
      }

      throw new Error('Unable to fetch project');
    }

    return (await response.json()) as ProjectDetails;
  } catch {
    const fallback = fallbackProjectBySlug(slug);

    if (fallback) {
      return fallback;
    }

    throw new Error('Unable to fetch project');
  }
}
