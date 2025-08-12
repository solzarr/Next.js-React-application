import { AmazonS3 } from '@/utils/aws';
import { EnvConfig, IResponse } from '@/utils/common';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

export const S3Delete = async (key: string): Promise<IResponse<undefined>> => {
  const _BUCKET = EnvConfig.Aws.Bucket.Name;
  try {
    const command = new DeleteObjectCommand({
      Bucket: _BUCKET,
      Key: key,
    });

    await AmazonS3.send(command);

    return {
      code: 'Success',
      message: 'Deleted',
    };
  } catch (error) {
    console.error('[S3Delete]', error);
    return {
      code: 'Failed',
      message: 'Failed',
    };
  }
};
