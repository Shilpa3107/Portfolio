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

const GeneratePortfolioInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
});
export type GeneratePortfolioInput = z.infer<typeof GeneratePortfolioInputSchema>;

const GeneratePortfolioOutputSchema = z.object({
  about: z.string().describe('The about section of the portfolio.'),
  experience: z.string().describe('The experience section of the portfolio.'),
  projects: z.string().describe('The projects section of the portfolio.'),
  skills: z.string().describe('The skills section of the portfolio.'),
  education: z.string().describe('The education section of the portfolio.'),
  zenithChatFeatures: z.string().describe('Zenith Chat features'),
  zenithChatTechStack: z.string().describe('Zenith Chat tech stack'),
  messageCraftFeatures: z.string().describe('MessageCraft AI features'),
  messageCraftTechStack: z.string().describe('MessageCraft AI tech stack'),
});
export type GeneratePortfolioOutput = z.infer<typeof GeneratePortfolioOutputSchema>;

export async function generatePortfolioFromResume(input: GeneratePortfolioInput): Promise<GeneratePortfolioOutput> {
  return generatePortfolioFromResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePortfolioFromResumePrompt',
  input: {schema: GeneratePortfolioInputSchema},
  output: {schema: GeneratePortfolioOutputSchema},
  prompt: `You are an AI expert at extracting information from resumes and constructing a portfolio website.

  Given the following resume text, extract the relevant information and generate content for the following sections of a portfolio website:

  - About: A brief summary of the person, their career goals, and key strengths.
  - Experience: A detailed list of their previous work experiences, including their roles and responsibilities.
  - Projects: A showcase of their personal and academic projects, highlighting the technologies used and the outcomes achieved.
  - Skills: A comprehensive list of their technical and soft skills.
  - Education: A summary of their educational background, including degrees, certifications, and academic achievements.
  - Zenith Chat: From the resume, extract the features of the Zenith Chat project and its technology stack. The features are the descriptions of the project, and the tech stack is the technologies used to build the project.
  - MessageCraft AI: From the resume, extract the features of the MessageCraft AI project and its technology stack. The features are the descriptions of the project, and the tech stack is the technologies used to build the project.

  Resume Text: {{{resumeText}}}
  Output the sections in JSON format.
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
