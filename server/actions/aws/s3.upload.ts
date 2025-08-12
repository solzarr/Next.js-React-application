import { Upload } from '@aws-sdk/lib-storage';
import { AmazonS3, GetAmazonS3File, IAmazonS3File, IAmazonS3UploadResponse } from '@/utils/aws';
import { IResponse } from '@/utils/common';

export const S3Upload = async (
  payload: IAmazonS3File
): Promise<IResponse<IAmazonS3UploadResponse>> => {
  const { file } = payload;

  if (!file) {
    return {
      code: 'Error',
      message: 'No attached file',
    };
  }

  const result = await GetAmazonS3File(payload);

  if (!result) {
    return {
      code: 'Error',
      message: 'Failed to build file upload',
    };
  }

  try {
    const upload = new Upload({
      client: AmazonS3,
      params: result.params,
      tags: [],
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
    });

    upload.on('httpUploadProgress', (progress) => {
      console.log(`Uploading: ${progress.loaded} / ${progress.total} bytes`);
    });

    await upload.done();

    return {
      code: 'Success',
      message: 'Uploaded successfull',
      value: {
        key: result.fileKey,
        url: result.fileUrl,
      },
    };
  } catch (error) {
    console.error('[S3Upload:', error);
    return {
      code: 'Failed',
      message: 'Image upload failed',
    };
  }
};
