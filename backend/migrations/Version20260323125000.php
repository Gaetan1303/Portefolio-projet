<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Seeds curated GitHub projects for portfolio display.
 */
final class Version20260323125000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Seed curated GitHub projects, templates and technologies for portfolio';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("INSERT INTO template (name, description, default_layout)
            SELECT 'Projet personnel', 'Template pour les projets personnels et collaboratifs.', '{}'::json
            WHERE NOT EXISTS (SELECT 1 FROM template WHERE name = 'Projet personnel')");

        $this->addSql("INSERT INTO template (name, description, default_layout)
            SELECT 'Projet educatif', 'Template pour les projets de formation et d''apprentissage.', '{}'::json
            WHERE NOT EXISTS (SELECT 1 FROM template WHERE name = 'Projet educatif')");

        $this->addSql("INSERT INTO technology (name)
            VALUES
                ('Go'),
                ('TypeScript'),
                ('JavaScript'),
                ('Vue.js'),
                ('Node.js'),
                ('Express'),
                ('Python'),
                ('React'),
                ('Java'),
                ('Docker'),
                ('PostgreSQL'),
                ('WebSocket')
            ON CONFLICT (name) DO NOTHING");

        $this->addSql("INSERT INTO project (title, slug, description, github_url, demo_url, visuals, created_at, template_id)
            VALUES
                (
                    'Aether Engine',
                    'aether-engine',
                    'Serveur principal du projet Tower Fantasy: logique metier de combat tour par tour, quetes, economie et architecture scalable.',
                    'https://github.com/Gaetan1303/Aether-Engine',
                    NULL,
                    '[]'::json,
                    '2026-01-19 15:08:43',
                    (SELECT id FROM template WHERE name = 'Projet personnel' LIMIT 1)
                ),
                (
                    'Aether Game',
                    'aether-game',
                    'Client TypeScript du projet Aether avec integration temps reel et interface de jeu.',
                    'https://github.com/Gaetan1303/Aether-Game',
                    NULL,
                    '[]'::json,
                    '2026-01-19 15:07:50',
                    (SELECT id FROM template WHERE name = 'Projet personnel' LIMIT 1)
                ),
                (
                    'Inter-Ville Project',
                    'inter-ville-project',
                    'Projet JavaScript collaboratif axe gameplay et interactions multi-modules.',
                    'https://github.com/Gaetan1303/Inter-Ville-Project',
                    NULL,
                    '[]'::json,
                    '2025-12-19 14:58:00',
                    (SELECT id FROM template WHERE name = 'Projet personnel' LIMIT 1)
                ),
                (
                    'Cafeterie',
                    'cafeterie',
                    'Front-end Vue.js pour une plateforme collaborative de gestion et coordination d''equipe.',
                    'https://github.com/Gaetan1303/Cafeterie',
                    NULL,
                    '[]'::json,
                    '2025-11-20 12:22:52',
                    (SELECT id FROM template WHERE name = 'Projet personnel' LIMIT 1)
                ),
                (
                    'Cafeterie Back',
                    'cafeterie-back',
                    'API Node.js/Express pour la plateforme Cafeterie: gestion des flux, utilisateurs et donnees.',
                    'https://github.com/Gaetan1303/Cafeterie-Back',
                    NULL,
                    '[]'::json,
                    '2025-11-19 10:13:24',
                    (SELECT id FROM template WHERE name = 'Projet personnel' LIMIT 1)
                ),
                (
                    'API L5R',
                    'api-l5r',
                    'API Python pour l''univers L5R avec endpoints metier et logique serveur.',
                    'https://github.com/Gaetan1303/API-L5R',
                    NULL,
                    '[]'::json,
                    '2025-11-21 15:56:05',
                    (SELECT id FROM template WHERE name = 'Projet personnel' LIMIT 1)
                ),
                (
                    'L5R JDR',
                    'l5r-jdr',
                    'Application TypeScript orientee jeu de role avec mecaniques interactives et synchronisation.',
                    'https://github.com/Gaetan1303/L5R-JDR',
                    NULL,
                    '[]'::json,
                    '2025-11-12 08:21:03',
                    (SELECT id FROM template WHERE name = 'Projet personnel' LIMIT 1)
                ),
                (
                    'Rokugan le monde de L5R',
                    'rokugan-le-monde-de-l5r',
                    'Interface JavaScript autour de l''univers L5R et des interactions de partie.',
                    'https://github.com/Gaetan1303/Rokugan_le_monde_de_L5R',
                    NULL,
                    '[]'::json,
                    '2025-11-20 14:52:58',
                    (SELECT id FROM template WHERE name = 'Projet personnel' LIMIT 1)
                ),
                (
                    'TP Pokemon React',
                    'tp-pokemon-react',
                    'Projet React d''apprentissage pour manipuler et afficher des donnees API de maniere interactive.',
                    'https://github.com/Gaetan1303/TP-Pokemon-React',
                    NULL,
                    '[]'::json,
                    '2025-12-07 13:20:21',
                    (SELECT id FROM template WHERE name = 'Projet educatif' LIMIT 1)
                ),
                (
                    'test-mvn',
                    'test-mvn',
                    'Projet Java Maven orientee structuration, build et bonnes pratiques de developpement.',
                    'https://github.com/Gaetan1303/test-mvn',
                    NULL,
                    '[]'::json,
                    '2025-10-31 16:03:45',
                    (SELECT id FROM template WHERE name = 'Projet educatif' LIMIT 1)
                )
            ON CONFLICT (slug) DO UPDATE SET
                title = EXCLUDED.title,
                description = EXCLUDED.description,
                github_url = EXCLUDED.github_url,
                demo_url = EXCLUDED.demo_url,
                visuals = EXCLUDED.visuals,
                template_id = EXCLUDED.template_id");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('Go', 'Docker', 'PostgreSQL')
            WHERE p.slug = 'aether-engine'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('TypeScript', 'WebSocket')
            WHERE p.slug = 'aether-game'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('JavaScript')
            WHERE p.slug = 'inter-ville-project'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('Vue.js', 'JavaScript')
            WHERE p.slug = 'cafeterie'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('Node.js', 'Express', 'JavaScript')
            WHERE p.slug = 'cafeterie-back'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('Python')
            WHERE p.slug = 'api-l5r'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('TypeScript', 'WebSocket')
            WHERE p.slug = 'l5r-jdr'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('JavaScript')
            WHERE p.slug = 'rokugan-le-monde-de-l5r'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('React', 'JavaScript')
            WHERE p.slug = 'tp-pokemon-react'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('Java')
            WHERE p.slug = 'test-mvn'
            ON CONFLICT DO NOTHING");
    }

    public function down(Schema $schema): void
    {
        $this->addSql("DELETE FROM project WHERE slug IN (
            'aether-engine',
            'aether-game',
            'inter-ville-project',
            'cafeterie',
            'cafeterie-back',
            'api-l5r',
            'l5r-jdr',
            'rokugan-le-monde-de-l5r',
            'tp-pokemon-react',
            'test-mvn'
        )");

        $this->addSql("DELETE FROM technology
            WHERE name IN ('Go', 'TypeScript', 'JavaScript', 'Vue.js', 'Node.js', 'Express', 'Python', 'React', 'Java', 'Docker', 'PostgreSQL', 'WebSocket')
              AND id NOT IN (SELECT DISTINCT technology_id FROM project_technology)");

        $this->addSql("DELETE FROM template
            WHERE name IN ('Projet personnel', 'Projet educatif')
              AND id NOT IN (SELECT DISTINCT template_id FROM project)");
    }
}
