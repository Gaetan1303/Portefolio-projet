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
 * Represents a concrete portfolio project.
 *
 * A Project is always derived from a Template (Prototype Pattern):
 * the Template acts as a blueprint and Project holds the specific content.
 * Each Project can be associated with multiple Technologies (ManyToMany).
 */
class Project
{
    /**
     * Auto-generated primary key.
     */
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * Human-readable project title (max 180 chars).
     */
    #[ORM\Column(length: 180)]
    private string $title = '';

    /**
     * URL-friendly unique identifier used in front-end routing (max 180 chars).
     */
    #[ORM\Column(length: 180, unique: true)]
    private string $slug = '';

    /**
     * Full project description (plain text, no length limit).
     */
    #[ORM\Column(type: 'text')]
    private string $description = '';

    /**
     * Optional link to the GitHub repository (max 255 chars).
     */
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $githubUrl = null;

    /**
     * Optional link to the live demo (max 255 chars).
     */
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $demoUrl = null;

    /**
     * Ordered list of visual asset URLs (stored as JSON).
     *
     * @var array<int, string>
     */
    #[ORM\Column(type: 'json')]
    private array $visuals = [];

    /**
     * Template (prototype) this project was cloned from.
     */
    #[ORM\ManyToOne(targetEntity: Template::class, inversedBy: 'projects')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Template $template = null;

    /**
     * Technologies used in this project.
     *
     * @var Collection<int, Technology>
     */
    #[ORM\ManyToMany(targetEntity: Technology::class, inversedBy: 'projects')]
    #[ORM\JoinTable(name: 'project_technology')]
    private Collection $technologies;

    /**
     * Timestamp of creation, set automatically in the constructor.
     */
    #[ORM\Column]
    private \DateTimeImmutable $createdAt;

    /**
     * Initialises collections and sets the creation timestamp to now.
     */
    public function __construct()
    {
        $this->technologies = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
    }

    /**
     * Returns the auto-generated primary key.
     *
     * @return int|null null before the entity is first persisted
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Returns the project title.
     *
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * Sets the project title.
     *
     * @param string $title Human-readable project name
     *
     * @return self Fluent interface
     */
    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Returns the URL slug.
     *
     * @return string
     */
    public function getSlug(): string
    {
        return $this->slug;
    }

    /**
     * Sets the URL slug.
     *
     * @param string $slug Must be unique across all projects
     *
     * @return self Fluent interface
     */
    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * Returns the full project description.
     *
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * Sets the full project description.
     *
     * @param string $description Plain-text description (no length limit)
     *
     * @return self Fluent interface
     */
    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Returns the optional GitHub repository URL.
     *
     * @return string|null
     */
    public function getGithubUrl(): ?string
    {
        return $this->githubUrl;
    }

    /**
     * Sets the GitHub repository URL.
     *
     * @param string|null $githubUrl Full HTTPS URL or null to unset
     *
     * @return self Fluent interface
     */
    public function setGithubUrl(?string $githubUrl): self
    {
        $this->githubUrl = $githubUrl;

        return $this;
    }

    /**
     * Returns the optional live-demo URL.
     *
     * @return string|null
     */
    public function getDemoUrl(): ?string
    {
        return $this->demoUrl;
    }

    /**
     * Sets the live-demo URL.
     *
     * @param string|null $demoUrl Full HTTPS URL or null to unset
     *
     * @return self Fluent interface
     */
    public function setDemoUrl(?string $demoUrl): self
    {
        $this->demoUrl = $demoUrl;

        return $this;
    }

    /**
     * Returns the list of visual asset URLs.
     *
     * @return array<int, string>
     */
    public function getVisuals(): array
    {
        return $this->visuals;
    }

    /**
     * Replaces the entire list of visual asset URLs.
     *
     * @param array<int, string> $visuals Ordered array of image/asset URLs
     *
     * @return self Fluent interface
     */
    public function setVisuals(array $visuals): self
    {
        $this->visuals = $visuals;

        return $this;
    }

    /**
     * Returns the Template this project was cloned from.
     *
     * @return Template|null
     */
    public function getTemplate(): ?Template
    {
        return $this->template;
    }

    /**
     * Binds this project to a Template (its prototype).
     *
     * @param Template $template Source template
     *
     * @return self Fluent interface
     */
    public function setTemplate(Template $template): self
    {
        $this->template = $template;

        return $this;
    }

    /**
     * Returns the collection of technologies associated with this project.
     *
     * @return Collection<int, Technology>
     */
    public function getTechnologies(): Collection
    {
        return $this->technologies;
    }

    /**
     * Associates a technology with this project (idempotent).
     *
     * @param Technology $technology Technology to attach
     *
     * @return self Fluent interface
     */
    public function addTechnology(Technology $technology): self
    {
        if (!$this->technologies->contains($technology)) {
            $this->technologies->add($technology);
        }

        return $this;
    }

    /**
     * Removes a technology from this project.
     *
     * @param Technology $technology Technology to detach
     *
     * @return self Fluent interface
     */
    public function removeTechnology(Technology $technology): self
    {
        $this->technologies->removeElement($technology);

        return $this;
    }

    /**
     * Returns the creation timestamp.
     *
     * @return \DateTimeImmutable
     */
    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }
}
