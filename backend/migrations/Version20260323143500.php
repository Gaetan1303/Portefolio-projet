<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Adds missing PHP technology and links it to Mediatheque project.
 */
final class Version20260323143500 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add missing PHP technology and map it to mediatheque project';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("INSERT INTO technology (name) VALUES ('PHP') ON CONFLICT (name) DO NOTHING");

        $this->addSql("INSERT INTO project_technology (project_id, technology_id)
            SELECT p.id, t.id
            FROM project p
            JOIN technology t ON t.name = 'PHP'
            WHERE p.slug = 'mediatheque-toulouse-grp1'
            ON CONFLICT DO NOTHING");
    }

    public function down(Schema $schema): void
    {
        $this->addSql("DELETE FROM project_technology
            WHERE project_id = (SELECT id FROM project WHERE slug = 'mediatheque-toulouse-grp1' LIMIT 1)
              AND technology_id = (SELECT id FROM technology WHERE name = 'PHP' LIMIT 1)");

        $this->addSql("DELETE FROM technology
            WHERE name = 'PHP'
              AND id NOT IN (SELECT DISTINCT technology_id FROM project_technology)");
    }
}
