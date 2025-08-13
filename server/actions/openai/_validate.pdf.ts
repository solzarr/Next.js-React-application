import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import OpenAI from 'openai';
import { TRegisterProfile } from '@/utils/zod';
import { EnvConfig, FileBuffer } from '@/utils/common';

const openai = new OpenAI({
  apiKey: EnvConfig.Ai.OpenAi,
});

export const MatchPDF = async (input: TRegisterProfile) => {
  const { cv, name, email } = input;

  const FB = await FileBuffer(cv);
  if (!FB.buffer || FB.size === 0) {
    return false;
  }

  const pdfData = await pdfParse(FB.buffer);
  const pdfText = pdfData.text;

  const prompt = `
You are a strict PDF data checker.
Given the following extracted PDF text, determine if BOTH the NAME and EMAIL are present
and match the given values exactly or with only minor differences (case or spacing).
Ignore formatting differences (newlines, extra spaces).

PDF Text:
"""${pdfText}"""

Name to check: "${name}"
Email to check: "${email}"

Respond with only "true" or "false".
  `;

  const aiResponse = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0,
  });

  const match = aiResponse.choices[0].message.content?.trim().toLowerCase() === 'true';

  return match;
};
