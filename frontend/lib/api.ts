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

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

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
  const response = await fetch(`${apiBaseUrl}/api/projects`, {
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error('Unable to fetch projects');
  }

  const json = (await response.json()) as { items: ProjectSummary[] };
  return json.items;
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
  const response = await fetch(`${apiBaseUrl}/api/projects/${slug}`, {
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error('Unable to fetch project');
  }

  return (await response.json()) as ProjectDetails;
}
