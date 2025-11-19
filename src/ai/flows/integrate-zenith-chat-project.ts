'use server';

/**
 * @fileOverview A Genkit flow to integrate Zenith Chat project details into a portfolio.
 *
 * This flow takes a project description and extracts the features and tech stack of Zenith Chat.
 * - integrateZenithChatProject - A function that handles the integration of Zenith Chat project details.
 * - IntegrateZenithChatProjectInput - The input type for the integrateZenithChatProject function.
 * - IntegrateZenithChatProjectOutput - The return type for the integrateZenithChatProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntegrateZenithChatProjectInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The complete description of the Zenith Chat project.'),
});
export type IntegrateZenithChatProjectInput = z.infer<
  typeof IntegrateZenithChatProjectInputSchema
>;

const IntegrateZenithChatProjectOutputSchema = z.object({
  features: z
    .string()
    .describe('The extracted features of the Zenith Chat project.'),
  techStack: z
    .string()
    .describe('The extracted tech stack of the Zenith Chat project.'),
});
export type IntegrateZenithChatProjectOutput = z.infer<
  typeof IntegrateZenithChatProjectOutputSchema
>;

export async function integrateZenithChatProject(
  input: IntegrateZenithChatProjectInput
): Promise<IntegrateZenithChatProjectOutput> {
  return integrateZenithChatProjectFlow(input);
}

const integrateZenithChatProjectPrompt = ai.definePrompt({
  name: 'integrateZenithChatProjectPrompt',
  input: {schema: IntegrateZenithChatProjectInputSchema},
  output: {schema: IntegrateZenithChatProjectOutputSchema},
  prompt: `You are an AI expert in extracting information about software projects.

  Given the following project description for Zenith Chat, extract the key features and the tech stack used to build the project.  Do not add any introductory or concluding remarks.

  Project Description: {{{projectDescription}}}

  Return the features and tech stack in the format described in the output schema. Focus only on information explicitly mentioned in the project description.
  `,
});

const integrateZenithChatProjectFlow = ai.defineFlow(
  {
    name: 'integrateZenithChatProjectFlow',
    inputSchema: IntegrateZenithChatProjectInputSchema,
    outputSchema: IntegrateZenithChatProjectOutputSchema,
  },
  async input => {
    const {output} = await integrateZenithChatProjectPrompt(input);
    return output!;
  }
);
