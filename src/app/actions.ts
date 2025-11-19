'use server';

import {
  extractResumeData,
  type ExtractResumeDataOutput,
} from '@/ai/flows/extract-resume-data';
import {
  integrateZenithChatProject,
  type IntegrateZenithChatProjectOutput,
} from '@/ai/flows/integrate-zenith-chat-project';
import {
  integrateMessageCraftAIProject,
  type IntegrateMessageCraftAIProjectOutput,
} from '@/ai/flows/integrate-message-craft-ai-project';
import {
  resumeText,
  zenithChatDescription,
  messageCraftAIDescription,
} from '@/lib/resume-data';

export type PortfolioData = ExtractResumeDataOutput & {
  zenithChat: IntegrateZenithChatProjectOutput;
  messageCraftAI: IntegrateMessageCraftAIProjectOutput;
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  leetcode: string;
};

export async function generatePortfolioAction(): Promise<PortfolioData> {
  try {
    const [resumeData, zenithChat, messageCraftAI] = await Promise.all([
      extractResumeData({ resumeText }),
      integrateZenithChatProject({ projectDescription: zenithChatDescription }),
      integrateMessageCraftAIProject({
        projectDescription: messageCraftAIDescription,
      }),
    ]);

    return {
      ...resumeData,
      zenithChat,
      messageCraftAI,
      name: 'Shilpa Sinha',
      email: 'shilpa.sinha3107@gmail.com',
      phone: '+91 76328 45447',
      github: 'shilpa3107', // from resume context
      linkedin: 'shilpa31', // from resume context
      leetcode: 'Shilpa3107', // from resume context
    };
  } catch (error) {
    console.error('Error generating portfolio data:', error);
    throw new Error('Failed to generate portfolio data.');
  }
}
