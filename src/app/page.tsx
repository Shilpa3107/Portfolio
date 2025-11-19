'use client';

import Portfolio from '@/components/portfolio/Portfolio';
import { portfolioData } from '@/lib/portfolio-data';
import type { PortfolioData } from '@/lib/portfolio-data';

export default function Home() {
  return <Portfolio data={portfolioData as PortfolioData} />;
}
