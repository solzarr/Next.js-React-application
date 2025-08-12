import { publicProcedure, router } from '@/server';
import { S3Delete, S3Upload } from '@/server/actions';
import { IAmazonS3File } from '@/utils/aws';
import { zodKey, zodS3Upload } from '@/utils/zod';

export const RouterAWS = router({
  S3Upload: publicProcedure
    .input(zodS3Upload)
    .query(async ({ input }) => await S3Upload(input as IAmazonS3File)),
  S3Delete: publicProcedure.input(zodKey).query(async ({ input }) => await S3Delete(input.key)),
});
