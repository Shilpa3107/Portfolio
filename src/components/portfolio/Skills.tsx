import type { ExtractResumeDataOutput } from '@/ai/flows/extract-resume-data';
import { Wrench } from 'lucide-react';
import Section from './Section';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

type SkillsProps = {
  skills: ExtractResumeDataOutput['skills'];
};

const groupSkills = (skills: string[]) => {
    const grouped: Record<string, string[]> = {
        Languages: [],
        Frameworks: [],
        Tools: [],
        Concepts: [],
        'Soft Skills': [],
        Other: [],
    };

    const keywords: Record<string, keyof typeof grouped> = {
        'python': 'Languages', 'java': 'Languages', 'javascript': 'Languages', 'c': 'Languages', 'html5': 'Languages', 'css': 'Languages', 'sql': 'Languages', 'typescript': 'Languages', 'php': 'Languages',
        'react.js': 'Frameworks', 'angular': 'Frameworks', 'ionic': 'Frameworks', 'node.js': 'Frameworks', 'flask': 'Frameworks', 'django': 'Frameworks',
        'git': 'Tools', 'github': 'Tools', 'vs code': 'Tools', 'firebase': 'Tools', 'aws': 'Tools', 'xampp': 'Tools',
        'oop': 'Concepts', 'data structures': 'Concepts', 'algorithms': 'Concepts', 'sdlc': 'Concepts', 'agile': 'Concepts', 'machine learning': 'Concepts',
        'problem solving': 'Soft Skills', 'communication': 'Soft Skills', 'teamwork': 'Soft Skills', 'time management': 'Soft Skills', 'adaptability': 'Soft Skills',
    };
    
    skills.forEach(skill => {
        const key = skill.toLowerCase();
        let found = false;
        for (const keyword in keywords) {
            if (key.includes(keyword)) {
                grouped[keywords[keyword]].push(skill);
                found = true;
                break;
            }
        }
        if (!found) {
            grouped.Other.push(skill);
        }
    });

    // Special handling for skills string from resume
    const skillStringPattern = /^(Languages|Frameworks|Tools|Concepts|Soft Skills):\s*(.*)/i;
    skills.forEach(skillLine => {
      const match = skillLine.match(skillStringPattern);
      if(match) {
        const category = match[1].charAt(0).toUpperCase() + match[1].slice(1);
        if (category === 'Soft Skills' || category === 'Concepts' || category === 'Tools' || category === 'Frameworks' || category === 'Languages' ) {
           grouped[category] = match[2].split(', ');
        }
      }
    });
    if (grouped.Other.length > 0 && grouped.Other[0].includes('Languages:')) {
      return grouped; // Return if already processed
    }


    return Object.fromEntries(Object.entries(grouped).filter(([, value]) => value.length > 0));
}

export default function Skills({ skills }: SkillsProps) {
  const groupedSkills = groupSkills(skills);

  return (
    <Section
      id="skills"
      title="Skills"
      icon={<Wrench className="h-6 w-6" />}
      className="bg-muted/50"
    >
      <Card>
        <CardContent className="p-6">
            {Object.entries(groupedSkills).map(([category, skillList]) => (
                <div key={category} className="mb-6 last:mb-0">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                        {skillList.map((skill, index) => (
                        <Badge key={index} variant="default" className="text-sm">
                            {skill}
                        </Badge>
                        ))}
                    </div>
                </div>
            ))}
        </CardContent>
      </Card>
    </Section>
  );
}
