import z from 'zod';

export const zodS3Upload = z.object({
  type: z.string(),
  file: z.instanceof(File),
  fileExtension: z.string(),
  contentType: z.string(),
  key: z.string(),
  isPrivate: z.string().optional(),
  dimension: z.tuple([z.number(), z.number(), z.number()]).optional(),
});
