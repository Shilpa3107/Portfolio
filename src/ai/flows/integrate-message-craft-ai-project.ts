'use server';
/**
 * @fileOverview Integrates MessageCraft AI project details into the portfolio.
 *
 * - integrateMessageCraftAIProject - A function that extracts and formats MessageCraft AI details.
 * - IntegrateMessageCraftAIProjectInput - The input type for the function.
 * - IntegrateMessageCraftAIProjectOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntegrateMessageCraftAIProjectInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The complete description of the MessageCraft AI project.'),
});
export type IntegrateMessageCraftAIProjectInput = z.infer<typeof IntegrateMessageCraftAIProjectInputSchema>;

const IntegrateMessageCraftAIProjectOutputSchema = z.object({
  features: z.array(z.string()).describe('The list of features of the project.'),
  techStack: z.array(z.string()).describe('The list of technologies used in the project.'),
});
export type IntegrateMessageCraftAIProjectOutput = z.infer<typeof IntegrateMessageCraftAIProjectOutputSchema>;

export async function integrateMessageCraftAIProject(
  input: IntegrateMessageCraftAIProjectInput
): Promise<IntegrateMessageCraftAIProjectOutput> {
  return integrateMessageCraftAIProjectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'messageCraftAIExtractorPrompt',
  input: {schema: IntegrateMessageCraftAIProjectInputSchema},
  output: {schema: IntegrateMessageCraftAIProjectOutputSchema},
  prompt: `Given the following project description for MessageCraft AI, extract the key features and technology stack.  The model output must be valid JSON corresponding to the schema.

Project Description: {{{projectDescription}}}

Here is the schema: ${JSON.stringify(
    IntegrateMessageCraftAIProjectOutputSchema.describe('The expected JSON schema for the response')
  )}`,
});

const integrateMessageCraftAIProjectFlow = ai.defineFlow(
  {
    name: 'integrateMessageCraftAIProjectFlow',
    inputSchema: IntegrateMessageCraftAIProjectInputSchema,
    outputSchema: IntegrateMessageCraftAIProjectOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
