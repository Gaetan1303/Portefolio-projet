<?php

declare(strict_types=1);

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HealthController extends AbstractController
{
    #[Route('/', name: 'app_home', methods: ['GET', 'HEAD'])]
    public function home(): Response
    {
        $frontendUrl = $_ENV['APP_FRONTEND_URL'] ?? 'https://portefolio-projet.onrender.com';
        $apiProjectsUrl = '/api/projects';
        $healthUrl = '/health';

        $html = sprintf(
            '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Portfolio API</title></head><body style="font-family:Arial,sans-serif;padding:24px;line-height:1.5"><h1>Portfolio Backend API</h1><p>Service actif.</p><ul><li><a href="%s">Frontend</a></li><li><a href="%s">API Projects</a></li><li><a href="%s">Health</a></li></ul></body></html>',
            htmlspecialchars($frontendUrl, ENT_QUOTES),
            $apiProjectsUrl,
            $healthUrl
        );

        return new Response($html, Response::HTTP_OK, [
            'Content-Type' => 'text/html; charset=UTF-8',
        ]);
    }

    #[Route('/health', name: 'app_health', methods: ['GET', 'HEAD'])]
    public function health(): JsonResponse
    {
        return $this->json([
            'status' => 'ok',
        ]);
    }

    #[Route('/favicon.ico', name: 'app_favicon', methods: ['GET', 'HEAD'])]
    public function favicon(): Response
    {
        // API service: no favicon asset required, return empty success to silence browser retries.
        return new Response('', Response::HTTP_NO_CONTENT, [
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }
}