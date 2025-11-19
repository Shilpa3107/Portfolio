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
  zenithChatDescription: z.string().describe('The project description for Zenith Chat.'),
  messageCraftAIDescription: z.string().describe('The project description for MessageCraft AI.'),
});
export type GeneratePortfolioInput = z.infer<typeof GeneratePortfolioInputSchema>;

const ProjectSchema = z.object({
  name: z.string().optional().describe('The name of the project.'),
  technologies: z.string().optional().describe('The technologies used in the project.'),
  description: z.string().optional().describe('A description of the project.'),
});

const ZenithChatSchema = z.object({
    features: z.array(z.string()).describe('The list of features of the project.'),
    techStack: z.array(z.string()).describe('The list of technologies used in the project.'),
});

const MessageCraftAISchema = z.object({
    features: z.array(z.string()).describe('The list of features of the project.'),
    techStack: z.array(z.string()).describe('The list of technologies used in the project.'),
});

const GeneratePortfolioOutputSchema = z.object({
  about: z.string().optional().describe('A summary of the person, extracted from the resume.'),
  experience: z.array(
    z.object({
      title: z.string().optional().describe('The job title.'),
      company: z.string().optional().describe('The company name.'),
      location: z.string().optional().describe('The location of the job.'),
      startDate: z.string().optional().describe('The start date of the job.'),
      endDate: z.string().optional().describe('The end date of the job.'),
      description: z.string().optional().describe('A description of the job responsibilities and achievements.'),
    })
  ).optional().describe('A list of the persons work experience.'),
  projects: z.array(ProjectSchema).optional().describe('A list of the persons projects from their resume.'),
  skills: z.array(z.string()).optional().describe('A list of the persons skills.'),
  education: z.array(
    z.object({
      institution: z.string().optional().describe('The name of the institution.'),
      degree: z.string().optional().describe('The degree obtained.'),
      location: z.string().optional().describe('The location of the institution.'),
      startDate: z.string().optional().describe('The start date of the education.'),
      endDate: z.string().optional().describe('The end date of the education.'),
      description: z.string().optional().describe('A description of the education.'),
    })
  ).optional().describe('A list of the persons education.'),
  zenithChat: ZenithChatSchema.describe('Zenith Chat project details'),
  messageCraftAI: MessageCraftAISchema.describe('MessageCraft AI project details'),
});
export type GeneratePortfolioOutput = z.infer<typeof GeneratePortfolioOutputSchema>;

export async function generatePortfolioFromResume(input: GeneratePortfolioInput): Promise<GeneratePortfolioOutput> {
  return generatePortfolioFromResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePortfolioFromResumePrompt',
  input: {schema: GeneratePortfolioInputSchema},
  output: {schema: GeneratePortfolioOutputSchema},
  prompt: `You are an AI expert at extracting information from resumes and project descriptions to construct a portfolio website.

  Extract the relevant information from the provided resume text.
  Also, extract the features and tech stack from the Zenith Chat and MessageCraft AI project descriptions.
  
  Resume Text:
  {{{resumeText}}}

  Zenith Chat Description:
  {{{zenithChatDescription}}}

  MessageCraft AI Description:
  {{{messageCraftAIDescription}}}
  
  Output all the extracted information in a single JSON object that conforms to the output schema.
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
