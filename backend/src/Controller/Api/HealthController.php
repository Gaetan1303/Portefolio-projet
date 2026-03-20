<?php

declare(strict_types=1);

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HealthController extends AbstractController
{
    #[Route('/', name: 'app_home', methods: ['GET', 'HEAD'])]
    public function home(Request $request): Response
    {
        $frontendUrl = $_ENV['APP_FRONTEND_URL'] ?? 'https://portefolio-projet.onrender.com';

        // Normalize and guard against accidental localhost in production env
        if (str_contains((string) $frontendUrl, 'localhost')) {
            $frontendUrl = 'https://portefolio-projet.onrender.com';
        }

        // Compare request host with frontend host to avoid redirect loops.
        $frontendHost = parse_url($frontendUrl, PHP_URL_HOST) ?: '';
        $requestHost = $request->getHost();

        if ($frontendHost !== '' && $requestHost !== $frontendHost) {
            // Different hosts: safe to redirect to the frontend URL
            return new RedirectResponse($frontendUrl, Response::HTTP_FOUND);
        }

        // Same host (or unknown): render a minimal HTML link so browser stays stable
        $html = sprintf(
            '<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Portfolio</title></head><body style="font-family:Arial,sans-serif;padding:24px"><h1>Open frontend</h1><p>If you are not automatically redirected, <a href="%s">click here to open the frontend</a>.</p></body></html>',
            htmlspecialchars($frontendUrl, ENT_QUOTES)
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