<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Normalizes project technology links with curated stacks from public repositories.
 */
final class Version20260323142000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Refresh project technology mappings from curated public GitHub stack audit';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("INSERT INTO technology (name)
            VALUES
                ('Angular'),
                ('Vite'),
                ('Maven'),
                ('SQL'),
                ('REST API')
            ON CONFLICT (name) DO NOTHING");

        $this->addSql("DELETE FROM project_technology
            WHERE project_id IN (
                SELECT id FROM project WHERE slug IN (
                    'aether-engine',
                    'aether-game',
                    'inter-ville-project',
                    'cafeterie',
                    'cafeterie-back',
                    'api-l5r',
                    'l5r-jdr',
                    'rokugan-le-monde-de-l5r',
                    'tp-pokemon-react',
                    'test-mvn',
                    'mars-ia-atelier2-toulouse',
                    'mediatheque-toulouse-grp1'
                )
            )");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('Go', 'REST API')
            WHERE p.slug = 'aether-engine'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('TypeScript', 'Angular')
            WHERE p.slug = 'aether-game'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('JavaScript', 'Node.js', 'Docker')
            WHERE p.slug = 'inter-ville-project'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('Vue.js', 'JavaScript', 'Vite')
            WHERE p.slug = 'cafeterie'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('JavaScript', 'Node.js', 'Express')
            WHERE p.slug = 'cafeterie-back'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('Python', 'Docker', 'REST API')
            WHERE p.slug = 'api-l5r'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('TypeScript', 'JavaScript', 'WebSocket')
            WHERE p.slug = 'l5r-jdr'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('JavaScript', 'TypeScript', 'Node.js')
            WHERE p.slug = 'rokugan-le-monde-de-l5r'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('JavaScript', 'React', 'Vite')
            WHERE p.slug = 'tp-pokemon-react'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('Java', 'Maven', 'Docker')
            WHERE p.slug = 'test-mvn'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('JavaScript', 'React')
            WHERE p.slug = 'mars-ia-atelier2-toulouse'
            ON CONFLICT DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name IN ('PHP', 'SQL')
            WHERE p.slug = 'mediatheque-toulouse-grp1'
            ON CONFLICT DO NOTHING");
    }

    public function down(Schema $schema): void
    {
        $this->addSql("DELETE FROM project_technology
            WHERE project_id IN (
                SELECT id FROM project WHERE slug IN (
                    'aether-engine',
                    'aether-game',
                    'inter-ville-project',
                    'cafeterie',
                    'cafeterie-back',
                    'api-l5r',
                    'l5r-jdr',
                    'rokugan-le-monde-de-l5r',
                    'tp-pokemon-react',
                    'test-mvn',
                    'mars-ia-atelier2-toulouse',
                    'mediatheque-toulouse-grp1'
                )
            )");

        $this->addSql("DELETE FROM technology
            WHERE name IN ('Angular', 'Vite', 'Maven', 'SQL', 'REST API')
              AND id NOT IN (SELECT DISTINCT technology_id FROM project_technology)");
    }
}
