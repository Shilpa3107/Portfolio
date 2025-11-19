import { User } from 'lucide-react';
import Section from './Section';
import Image from 'next/image';

type AboutProps = {
  about: string;
};

export default function About({ about }: AboutProps) {
  return (
    <Section id="about" title="About Me" icon={<User className="h-6 w-6" />} hideTitle={true}>
      <div className="grid items-center gap-8 md:grid-cols-3">
        <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full md:h-64 md:w-64">
          <Image
            src="https://picsum.photos/seed/1/300/300"
            alt="Shilpa Sinha"
            width={300}
            height={300}
            data-ai-hint="professional portrait"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="prose prose-lg max-w-none text-muted-foreground md:col-span-2">
          <p>{about}</p>
        </div>
      </div>
    </Section>
  );
}
