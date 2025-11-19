'use server';

/**
 * @fileOverview Generates a portfolio website from resume data.
 *
 * - generatePortfolioFromResume - A function that generates the portfolio.
 * - GeneratePortfolioInput - The input type for the generatePortfolioFromResume function.
 * - GeneratePortfolioOutput - The return type for the generatePortfolioFromResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { extractBasicResumeData, type ExtractBasicResumeDataOutput } from './extract-basic-resume-data';

const GeneratePortfolioInputSchema = z.object({
  resumeData: z.custom<ExtractBasicResumeDataOutput>(),
  zenithChatDescription: z.string().describe('The project description for Zenith Chat.'),
  messageCraftAIDescription: z.string().describe('The project description for MessageCraft AI.'),
});
export type GeneratePortfolioInput = z.infer<typeof GeneratePortfolioInputSchema>;

const ZenithChatSchema = z.object({
  features: z.array(z.string()).describe('The list of features of the project.'),
  techStack: z.array(z.string()).describe('The list of technologies used in the project.'),
});

const MessageCraftAISchema = z.object({
  features: z.array(z.string()).describe('The list of features of the project.'),
  techStack: z.array(z.string()).describe('The list of technologies used in the project.'),
});

const GeneratePortfolioOutputSchema = z.object({
  zenithChat: ZenithChatSchema.describe('Zenith Chat project details'),
  messageCraftAI: MessageCraftAISchema.describe('MessageCraft AI project details'),
});
export type GeneratePortfolioOutput = z.infer<typeof GeneratePortfolioOutputSchema>;

export async function generatePortfolioFromResume(
  input: GeneratePortfolioInput
): Promise<ExtractBasicResumeDataOutput & GeneratePortfolioOutput> {
  const basicData = input.resumeData;
  const projectDetails = await generatePortfolioFromResumeFlow(input);
  return { ...basicData, ...projectDetails };
}

const prompt = ai.definePrompt({
  name: 'generatePortfolioFromResumePrompt',
  input: {schema: GeneratePortfolioInputSchema},
  output: {schema: GeneratePortfolioOutputSchema},
  prompt: `You are an AI expert at extracting project details from descriptions.
  
  Extract the features and tech stack from the Zenith Chat and MessageCraft AI project descriptions.
  
  Zenith Chat Description:
  {{{zenithChatDescription}}}

  MessageCraft AI Description:
  {{{messageCraftAIDescription}}}
  
  Output the extracted information in a single JSON object that conforms to the output schema.
  `,
});

const generatePortfolioFromResumeFlow = ai.defineFlow(
  {
    name: 'generatePortfolioFromResumeFlow',
    inputSchema: GeneratePortfolioInputSchema,
    outputSchema: GeneratePortfolioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
