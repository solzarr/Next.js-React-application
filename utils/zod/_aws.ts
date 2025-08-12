import z from 'zod';

export const zodS3Upload = z.object({
  type: z.string(),
  file: z.custom<File>((val) => {
    if (typeof File === 'undefined') return true;
    return val instanceof File;
  }, 'Must be a File object'),
  fileExtension: z.string(),
  contentType: z.string(),
  key: z.string().optional(),
  isPrivate: z.string().optional(),
  dimension: z.tuple([z.number(), z.number(), z.number()]).optional(),
});
