<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Adds two missing collaborative projects to the portfolio catalog.
 */
final class Version20260323131500 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add Mars IA Atelier 2 Toulouse and Mediatheque Toulouse GRP1 projects';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("INSERT INTO project (title, slug, description, github_url, demo_url, visuals, created_at, template_id)
            VALUES
                (
                    'Mars IA Atelier 2 Toulouse',
                    'mars-ia-atelier2-toulouse',
                    'Projet collaboratif dans toute la France, concevoir le site pour le festival mars-IA qui sera proposé par Laplateforme.',
                    'https://github.com/Fraxoo/mars-ia-atelier2-toulouse',
                    NULL,
                    '[]'::json,
                    NOW(),
                    (SELECT id FROM template WHERE name = 'Projet educatif' LIMIT 1)
                ),
                (
                    'Mediatheque Toulouse GRP1',
                    'mediatheque-toulouse-grp1',
                    'Projet de groupe autour d une mediatheque web, CRUD de livres, auteurs, emprunts avec PHP et PDO.',
                    'https://github.com/Gaetan1303/mediatheque_toulouse_grp1',
                    NULL,
                    '[]'::json,
                    NOW(),
                    (SELECT id FROM template WHERE name = 'Projet educatif' LIMIT 1)
                )
            ON CONFLICT (slug) DO UPDATE SET
                title = EXCLUDED.title,
                description = EXCLUDED.description,
                github_url = EXCLUDED.github_url,
                demo_url = EXCLUDED.demo_url,
                visuals = EXCLUDED.visuals,
                template_id = EXCLUDED.template_id");
    }

    public function down(Schema $schema): void
    {
        $this->addSql("DELETE FROM project WHERE slug IN ('mars-ia-atelier2-toulouse', 'mediatheque-toulouse-grp1')");
    }
}
