<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ApiResource]
/**
 * Represents a programming language, framework or tool.
 *
 * Technologies are shared across projects via a ManyToMany relationship.
 * This entity follows the Single Responsibility Principle: it only
 * carries the technology name; linking logic lives in Project.
 */
class Technology
{
    /**
     * Auto-generated primary key.
     */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * Unique technology label, e.g. "Symfony", "React", "PostgreSQL" (max 100 chars).
     */
    #[ORM\Column(length: 100, unique: true)]
    private string $name = '';

    /**
     * Projects that use this technology (inverse side of the ManyToMany).
     *
     * @var Collection<int, Project>
     */
    #[ORM\ManyToMany(targetEntity: Project::class, mappedBy: 'technologies')]
    private Collection $projects;

    /**
     * Initialises the projects collection.
     */
    public function __construct()
    {
        $this->projects = new ArrayCollection();
    }

    /**
     * Returns the auto-generated primary key.
     *
     * @return int|null null before first persist
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Returns the technology label.
     *
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Sets the technology label.
     *
     * @param string $name Unique technology name (e.g. "TypeScript")
     *
     * @return self Fluent interface
     */
    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
}
