import type { PortfolioData } from '@/lib/portfolio-data';
import { GraduationCap } from 'lucide-react';
import Section from './Section';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';

type EducationProps = {
  education?: PortfolioData['education'];
};

export default function Education({ education }: EducationProps) {
  if (!education) return null;
  
  return (
    <Section id="education" title="Education" icon={<GraduationCap className="h-6 w-6" />}>
      <div className="grid gap-8 md:grid-cols-2">
        {education.map((item, index) => (
          <Card key={index} className="shadow-md transition-shadow hover:shadow-lg">
            <CardHeader>
                <div className='flex justify-between items-start'>
                    <div>
                      <CardTitle className="font-headline text-xl">{item.institution}</CardTitle>
                      <CardDescription className="text-base">{item.degree}</CardDescription>
                    </div>
                     <p className="text-sm text-muted-foreground whitespace-nowrap pl-2">
                      {item.startDate} &ndash; {item.endDate}
                    </p>
                </div>
            </CardHeader>
            {item.description && item.description !== 'N/A' && (
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}
