<?php

declare(strict_types=1);

namespace App\Controller\Api;

use App\Entity\Project;
use App\Repository\ProjectRepository;
use App\Service\QrCodeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

/**
 * REST API controller exposing Project resources.
 *
 * Endpoints:
 *  - GET /api/projects          → list of all projects (newest first)
 *  - GET /api/projects/{slug}   → single project detail + QR code data-URI
 *
 * @see ProjectRepository
 * @see QrCodeService
 */
#[Route('/api/projects')]
final class ProjectController extends AbstractController
{
    /**
     * Returns all projects ordered by creation date descending.
     *
     * Each item contains: id, title, slug, description, githubUrl,
     * demoUrl, visuals and a flat array of technology names.
     *
     * @param ProjectRepository $repository Doctrine repository (injected by DI)
     *
     * @return JsonResponse JSON payload shaped as { items: array<int, array<string, mixed>> }
     */
    #[Route('', name: 'api_projects_index', methods: ['GET'])]
    public function index(ProjectRepository $repository): JsonResponse
    {
        $projects = array_map(
            static fn (Project $project): array => [
                'id' => $project->getId(),
                'title' => $project->getTitle(),
                'slug' => $project->getSlug(),
                'description' => $project->getDescription(),
                'githubUrl' => $project->getGithubUrl(),
                'demoUrl' => $project->getDemoUrl(),
                'visuals' => $project->getVisuals(),
                'technologies' => $project->getTechnologies()->map(static fn ($tech) => $tech->getName())->toArray(),
            ],
            $repository->findBy([], ['createdAt' => 'DESC'])
        );

        return $this->json(['items' => $projects]);
    }

    /**
     * Returns the detail of a single project, including a QR code pointing
     * to its demo URL (or GitHub URL as fallback).
     *
     * @param string            $slug          URL-friendly unique project identifier
     * @param ProjectRepository $repository    Doctrine repository (injected by DI)
     * @param QrCodeService     $qrCodeService Service that generates SVG QR code data-URIs
     *
     * @return JsonResponse Full project payload, or 404 JSON error when not found
     */
    #[Route('/{slug}', name: 'api_projects_show', methods: ['GET'])]
    public function show(string $slug, ProjectRepository $repository, QrCodeService $qrCodeService): JsonResponse
    {
        $project = $repository->findOneBy(['slug' => $slug]);

        if (!$project instanceof Project) {
            return $this->json(['message' => 'Project not found'], 404);
        }

        $qrTarget = $project->getDemoUrl() ?? $project->getGithubUrl() ?? '';

        return $this->json([
            'id' => $project->getId(),
            'title' => $project->getTitle(),
            'slug' => $project->getSlug(),
            'description' => $project->getDescription(),
            'githubUrl' => $project->getGithubUrl(),
            'demoUrl' => $project->getDemoUrl(),
            'visuals' => $project->getVisuals(),
            'template' => $project->getTemplate()?->getName(),
            'qrCode' => $qrTarget !== '' ? $qrCodeService->generateSvgDataUri($qrTarget) : null,
            'technologies' => $project->getTechnologies()->map(static fn ($tech) => $tech->getName())->toArray(),
        ]);
    }
}
