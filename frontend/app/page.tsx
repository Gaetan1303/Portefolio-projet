import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { MainChoices } from '@/components/home/main-choices';
import { AboutSection } from '@/components/home/about-section';
import { StackSection } from '@/components/home/stack-section';
import { DockerDemoSection } from '@/components/home/docker-demo-section';

export const metadata: Metadata = {
  title: 'Homepage',
  description:
    'Gaetan, developpeur full-stack specialise en applications interactives temps reel. Decouvrez ses projets educatifs, personnels, et son profil complet.',
  keywords: ['Developpeur full-stack', 'Next.js', 'Symfony', 'temps reel', 'portfolio'],
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
