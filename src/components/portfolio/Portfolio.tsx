import type { PortfolioData } from '@/app/actions';
import Header from './Header';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Education from './Education';
import Footer from './Footer';
import { Toaster } from '../ui/toaster';

type PortfolioProps = {
  data: PortfolioData;
};

export default function Portfolio({ data }: PortfolioProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header data={data} />
      <main className="flex-grow">
        {data.about && <About about={data.about} />}
        {data.experience && <Experience experience={data.experience} />}
        <Projects
          projects={data.projects || []}
          zenithChat={data.zenithChat}
          messageCraftAI={data.messageCraftAI}
        />
        {data.skills && <Skills skills={data.skills} />}
        {data.education && <Education education={data.education} />}
      </main>
      <Footer data={data} />
      <Toaster />
    </div>
  );
}
