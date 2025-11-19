import type { ExtractResumeDataOutput } from '@/ai/flows/extract-resume-data';
import { Briefcase } from 'lucide-react';
import Section from './Section';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';

type ExperienceProps = {
  experience: ExtractResumeDataOutput['experience'];
};

export default function Experience({ experience }: ExperienceProps) {
  return (
    <Section
      id="experience"
      title="Work Experience"
      icon={<Briefcase className="h-6 w-6" />}
      className="bg-muted/50"
    >
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-6 md:ml-0 md:left-1/2 md:-translate-x-1/2"></div>
        {experience.map((item, index) => (
          <div
            key={index}
            className={`relative mb-8 flex items-center ${
              index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
            }`}
          >
            <div className="hidden md:block w-1/2"></div>
            <div
              className={`w-full md:w-1/2 ${
                index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
              }`}
            >
              <Card className="shadow-md transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className='flex justify-between items-start'>
                    <div>
                      <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                      <CardDescription className="text-base">{item.company} &middot; {item.location}</CardDescription>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-nowrap pl-2">
                      {item.startDate} &ndash; {item.endDate}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </div>
            <div className="absolute left-6 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-primary md:left-1/2"></div>
          </div>
        ))}
      </div>
    </Section>
  );
}
