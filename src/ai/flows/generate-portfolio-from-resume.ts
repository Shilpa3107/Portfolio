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
import { type ExtractBasicResumeDataOutput } from './extract-basic-resume-data';

const GeneratePortfolioInputSchema = z.object({
  resumeData: z.custom<ExtractBasicResumeDataOutput>(),
  zenithChatDescription: z.string().describe('The project description for Zenith Chat.'),
  messageCraftAIDescription: z.string().describe('The project description for MessageCraft AI.'),
});
export type GeneratePortfolioInput = z.infer<typeof GeneratePortfolioInputSchema>;

const ZenithChatSchema = z.object({
  name: z.literal('Zenith Chat'),
  features: z.array(z.string()).describe('The list of features of the project.'),
  techStack: z.array(z.string()).describe('The list of technologies used in the project.'),
});

const MessageCraftAISchema = z.object({
  name: z.literal('MessageCraft AI'),
  features: z.array(z.string()).describe('The list of features of the project.'),
  techStack: z.array(z.string()).describe('The list of technologies used in the project.'),
});

const ProjectDetailsSchema = z.object({
  zenithChat: ZenithChatSchema.describe('Zenith Chat project details'),
  messageCraftAI: MessageCraftAISchema.describe('MessageCraft AI project details'),
});

export type GeneratePortfolioOutput = ExtractBasicResumeDataOutput & z.infer<typeof ProjectDetailsSchema>;


export async function generatePortfolioFromResume(
  input: GeneratePortfolioInput
): Promise<GeneratePortfolioOutput> {
  const projectDetails = await generatePortfolioFromResumeFlow(input);
  return { ...input.resumeData, ...projectDetails };
}

const prompt = ai.definePrompt({
  name: 'generatePortfolioFromResumePrompt',
  input: {schema: GeneratePortfolioInputSchema},
  output: {schema: ProjectDetailsSchema},
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
    outputSchema: ProjectDetailsSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
