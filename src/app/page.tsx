'use client';

import { useState, useEffect } from 'react';
import { generatePortfolioAction } from './actions';
import type { PortfolioData } from './actions';
import Portfolio from '@/components/portfolio/Portfolio';
import Loading from './loading';

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const portfolioData = await generatePortfolioAction();
        setData(portfolioData);
      } catch (err) {
        console.error(err);
        setError('Failed to generate portfolio. Please try again later.');
      }
    }
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-destructive">
        <div className="text-center">
          <h1 className="text-2xl font-bold">An Error Occurred</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return <Loading />;
  }

  return <Portfolio data={data} />;
}
