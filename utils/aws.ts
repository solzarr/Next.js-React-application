import { ObjectCannedACL, S3Client } from '@aws-sdk/client-s3';
import { EnvConfig, FileBuffer, RandomCode } from './common';

interface IAmazonS3File {
  type: 'IMAGE' | 'FILE';
  file: File | string;
  fileExtension: string;
  contentType: string;
  key?: string;
  isPrivate?: boolean;
  dimension?: [number, number, number];
}

interface IAmazonS3UploadResponse {
  key: string;
  url?: string;
  size?: number;
  type?: string;
}

interface IAmazonS3UploadParamMetadata extends Record<string, string> {
  originalFilename: string;
  fileType: string;
}

interface IAmazonS3UploadParam {
  Bucket: string;
  Key: string;
  Body: Buffer<ArrayBufferLike> | Buffer<ArrayBuffer>;
  ContentEncoding?: string;
  ContentType: string;
  ACL: ObjectCannedACL;
  Metadata?: IAmazonS3UploadParamMetadata;
}

interface IAmazonS3UploadResult {
  params: IAmazonS3UploadParam;
  fileUrl: string;
  fileName: string;
  fileKey: string;
}

const AmazonS3 = new S3Client({
  region: EnvConfig.Aws.Region,
  credentials: {
    accessKeyId: EnvConfig.Aws.Key,
    secretAccessKey: EnvConfig.Aws.Secret,
  },
});

const GetAmazonS3File = async (data: IAmazonS3File): Promise<IAmazonS3UploadResult | null> => {
  const _BUCKET = EnvConfig.Aws.Bucket.Name;
  const _FOLDER = EnvConfig.Aws.Bucket.Folder;
  const _REGION = EnvConfig.Aws.Region;

  try {
    const { contentType, file, fileExtension, key, isPrivate } = data;

    const FB = await FileBuffer(file);

    if (!FB.buffer) return null;

    const TempName = FB.name || RandomCode(12);

    const ContentType = contentType || FB.contentType || 'application/octet-stream';
    const OriginalName = TempName.replace(/[^a-zA-Z0-9_\-.]+/g, '-');

    const FileType = ContentType.split('/')[0];
    const FileKeyId = key ?? TempName;
    const FilePrefix = OriginalName.split('.')[0].slice(0, 20);

    const FileExtension = fileExtension || OriginalName.split('.').pop()?.toLowerCase() || 'bin';
    const FileName = `${FileKeyId}-${FilePrefix}.${FileExtension.replaceAll('.', '')}`;

    const FileKey = _FOLDER ? `${_FOLDER}/${FileName}` : FileName;
    const FileUrl = `https://${_BUCKET}.s3.${_REGION}.amazonaws.com/${FileKey}`;

    const result: IAmazonS3UploadResult = {
      params: {
        Bucket: _BUCKET,
        Key: FileKey,
        Body: FB.buffer,
        ContentType,
        ACL: isPrivate ? ('private' as ObjectCannedACL) : ('public-read' as ObjectCannedACL),
        Metadata: {
          originalFilename: OriginalName,
          fileType: FileType.toLowerCase(),
        },
      },
      fileUrl: FileUrl,
      fileName: FileName,
      fileKey: FileKey,
    };

    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export type { IAmazonS3File, IAmazonS3UploadResponse, IAmazonS3UploadResult };
export { AmazonS3, GetAmazonS3File };
