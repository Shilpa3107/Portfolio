'use server';

import {
  generatePortfolioFromResume,
} from '@/ai/flows/generate-portfolio-from-resume';
import { resumeText } from '@/lib/resume-data';

const zenithChat = {
  name: 'Zenith Chat',
  features: [
    'Empathetic AI Chatbot',
    'Mood Detection',
    'Personalized Relaxation Tips',
    'Modern & Responsive UI',
    'Secure & Private',
  ],
  techStack: [
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'ShadCN UI',
    'Genkit',
    'Google Gemini',
  ],
};

const messageCraftAI = {
  name: 'MessageCraft AI',
  features: [
    'AI-Powered Message Generation',
    'Prompt Improvement',
    'Easy to Use',
  ],
  techStack: ['Next.js', 'Genkit', 'Google Gemini', 'ShadCN UI'],
};

export type PortfolioData = {
  about?: string;
  experience?: {
    title?: string;
    company?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }[];
  projects?: {
    name?: string;
    technologies?: string;
    description?: string;
  }[];
  skills?: string[];
  education?: {
    institution?: string;
    degree?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }[];
  zenithChat: typeof zenithChat;
  messageCraftAI: typeof messageCraftAI;
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  leetcode: string;
};

export async function generatePortfolioAction(): Promise<PortfolioData> {
  try {
    const resumeData = await generatePortfolioFromResume({ resumeText });

    return {
      ...resumeData,
      zenithChat,
      messageCraftAI,
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
