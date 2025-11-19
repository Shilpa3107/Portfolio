import type { GeneratePortfolioOutput } from '@/ai/flows/generate-portfolio-from-resume';
import { Lightbulb } from 'lucide-react';
import Section from './Section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ProjectsProps = {
  projects: NonNullable<GeneratePortfolioOutput['projects']>;
  zenithChat: GeneratePortfolioOutput['zenithChat'];
  messageCraftAI: GeneratePortfolioOutput['messageCraftAI'];
};

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const getProjectImage = (projectName: string) => {
  const slug = slugify(projectName);
  const image = PlaceHolderImages.find(img => img.id.includes(slug));
  return image || PlaceHolderImages[0];
};

export default function Projects({ projects, zenithChat, messageCraftAI }: ProjectsProps) {
  
  const allProjects = [
    ...projects,
    {
      name: 'Zenith Chat',
      description: zenithChat.features.join(' '),
      technologies: zenithChat.techStack.join(', '),
    },
    {
      name: 'MessageCraft AI',
      description: messageCraftAI.features.join('\n'),
      technologies: messageCraftAI.techStack.join(', '),
    },
  ];
  
  return (
    <Section id="projects" title="Projects" icon={<Lightbulb className="h-6 w-6" />}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((project, index) => {
          if (!project.name) return null;
          const projectImage = getProjectImage(project.name);
          const technologies = typeof project.technologies === 'string' ? project.technologies.split(/, | • |:\s/): [];
          
          return (
            <Card key={index} className="flex flex-col overflow-hidden shadow-md transition-shadow hover:shadow-xl">
              <div className="relative h-48 w-full">
                <Image
                  src={projectImage.imageUrl}
                  alt={project.name}
                  fill
                  className="object-cover"
                  data-ai-hint={projectImage.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl">{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-grow flex-col">
                <CardDescription className="flex-grow">{project.description}</CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  {technologies.map((tech, i) => (
                    tech.trim() && <Badge key={i} variant="secondary">{tech.trim()}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
