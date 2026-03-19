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
    public function home(): JsonResponse
    {
        return $this->json([
            'status' => 'ok',
            'service' => 'portfolio-backend',
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