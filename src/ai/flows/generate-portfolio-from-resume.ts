'use server';

/**
 * @fileOverview A resume data extraction AI agent.
 *
 * - generatePortfolioFromResume - A function that handles the resume data extraction process.
 * - GeneratePortfolioFromResumeInput - The input type for the function.
 * - GeneratePortfolioFromResumeOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePortfolioFromResumeInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
});
export type GeneratePortfolioFromResumeInput = z.infer<typeof GeneratePortfolioFromResumeInputSchema>;

const GeneratePortfolioFromResumeOutputSchema = z.object({
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
  projects: z.array(
    z.object({
      name: z.string().optional().describe('The name of the project.'),
      technologies: z.string().optional().describe('The technologies used in the project.'),
      description: z.string().optional().describe('A description of the project.'),
    })
  ).optional().describe('A list of the persons projects.'),
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
});
export type GeneratePortfolioFromResumeOutput = z.infer<typeof GeneratePortfolioFromResumeOutputSchema>;

export async function generatePortfolioFromResume(input: GeneratePortfolioFromResumeInput): Promise<GeneratePortfolioFromResumeOutput> {
  return generatePortfolioFromResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePortfolioFromResumePrompt',
  input: {schema: GeneratePortfolioFromResumeInputSchema},
  output: {schema: GeneratePortfolioFromResumeOutputSchema},
  prompt: `You are a resume parsing expert. Please extract the about, experience, projects, skills, and education sections from the resume text provided.

Resume Text: {{{resumeText}}}

Make sure to include all available information. If some information is not present, you can omit it.`,
});

const generatePortfolioFromResumeFlow = ai.defineFlow(
  {
    name: 'generatePortfolioFromResumeFlow',
    inputSchema: GeneratePortfolioFromResumeInputSchema,
    outputSchema: GeneratePortfolioFromResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
