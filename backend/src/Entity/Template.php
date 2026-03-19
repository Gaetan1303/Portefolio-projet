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
 * Prototype template that acts as a blueprint for creating Projects.
 *
 * Implements the Prototype Pattern: calling {@see self::createProjectClone()}
 * produces a new Project pre-filled with this template's default content.
 * This encapsulates the object-creation logic and keeps Project construction
 * consistent (Open/Closed + Single Responsibility principles).
 */
class Template
{
    /**
     * Auto-generated primary key.
     */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * Template display name (max 120 chars).
     */
    #[ORM\Column(length: 120)]
    private string $name = '';

    /**
     * Human-readable description of what this template provides.
     */
    #[ORM\Column(type: 'text')]
    private string $description = '';

    /**
     * Default layout configuration stored as a JSON object.
     *
     * @var array<string, mixed>
     */
    #[ORM\Column(type: 'json')]
    private array $defaultLayout = [];

    /**
     * Projects derived from this template.
     *
     * @var Collection<int, Project>
     */
    #[ORM\OneToMany(mappedBy: 'template', targetEntity: Project::class)]
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
     * Returns the template name.
     *
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Sets the template name.
     *
     * @param string $name Display name for the template
     *
     * @return self Fluent interface
     */
    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Returns the template description.
     *
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * Sets the template description.
     *
     * @param string $description Plain-text description
     *
     * @return self Fluent interface
     */
    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Returns the default layout configuration.
     *
     * @return array<string, mixed>
     */
    public function getDefaultLayout(): array
    {
        return $this->defaultLayout;
    }

    /**
     * Replaces the default layout configuration.
     *
     * @param array<string, mixed> $defaultLayout Arbitrary JSON-serialisable layout options
     *
     * @return self Fluent interface
     */
    public function setDefaultLayout(array $defaultLayout): self
    {
        $this->defaultLayout = $defaultLayout;

        return $this;
    }

    /**
     * Factory method implementing the Prototype Pattern.
     *
     * Creates a new Project pre-filled with this template's description and
     * bound to this template as its source prototype. The caller must persist
     * the returned Project via the EntityManager.
     *
     * @param string $title Human-readable title for the new project
     * @param string $slug  Unique URL slug for the new project
     *
     * @return Project A new, unpersisted Project instance
     */
    public function createProjectClone(string $title, string $slug): Project
    {
        $project = new Project();
        $project
            ->setTitle($title)
            ->setSlug($slug)
            ->setDescription($this->description)
            ->setTemplate($this);

        return $project;
    }
}
