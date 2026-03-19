<?php

declare(strict_types=1);

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
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
}