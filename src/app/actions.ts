'use server';

import {
  generatePortfolioFromResume,
  type GeneratePortfolioOutput,
} from '@/ai/flows/generate-portfolio-from-resume';
import {
  resumeText,
  zenithChatDescription,
  messageCraftAIDescription,
} from '@/lib/resume-data';

// The AI's output is now the main data structure. We just add the contact info.
export type PortfolioData = GeneratePortfolioOutput & {
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  leetcode: string;
};

export async function generatePortfolioAction(): Promise<PortfolioData> {
  try {
    const portfolioData = await generatePortfolioFromResume({
      resumeText,
      zenithChatDescription,
      messageCraftAIDescription,
    });

    return {
      ...portfolioData,
      name: 'Shilpa Sinha',
      email: 'shilpa.sinha3107@gmail.com',
      phone: '+91 76328 45447',
      github: 'shilpa3107',
      linkedin: 'shilpa31',
      leetcode: 'Shilpa3107',
    };
  } catch (error) {
    console.error('Error generating portfolio data:', error);
    throw new Error('Failed to generate portfolio data.');
  }
}
