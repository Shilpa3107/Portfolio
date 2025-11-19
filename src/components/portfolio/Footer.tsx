import type { PortfolioData } from '@/lib/portfolio-data';

type FooterProps = {
  data: PortfolioData;
};

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} {data.name}. All rights reserved.
          </p>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Made with ❤️ and AI.
        </p>
      </div>
    </footer>
  );
}
