import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { MainChoices } from '@/components/home/main-choices';
import { AboutSection } from '@/components/home/about-section';
import { StackSection } from '@/components/home/stack-section';
import { DockerDemoSection } from '@/components/home/docker-demo-section';

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    'Gaëtan, développeur full-stack spécialisé dans les applications interactives en temps réel. Découvrez ses projets éducatifs, personnels et son profil complet.',
  keywords: ['Développeur full-stack', 'Next.js', 'Symfony', 'temps réel', 'portfolio'],
  alternates: {
    canonical: '/'
  }
};

export default function HomePage() {
  return (
    <main className="home-bg">
      <HeroSection />
      <MainChoices />
      <AboutSection />
      <StackSection />
      <DockerDemoSection />
    </main>
  );
}
