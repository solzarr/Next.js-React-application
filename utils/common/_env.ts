interface IEnvConfigApi {
  Url: string;
  Default: string;
}

interface IEnvConfigAuth {
  Expiry: string;
  Secret: string;
  Url: string;
}

interface IEnvConfigAwsBucket {
  Name: string;
  Folder: string;
}

interface IEnvConfigAws {
  Region: string;
  Key: string;
  Secret: string;
  Bucket: IEnvConfigAwsBucket;
}

interface IEnvConfig {
  Api: IEnvConfigApi;
  Auth: IEnvConfigAuth;
  Aws: IEnvConfigAws;

  Cors: string[];
  Database: string;
}

const EnvConfig: IEnvConfig = {
  Api: {
    Url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7701',
    Default: process.env.NEXT_PUBLIC_DEFAULT || '',
  },
  Auth: {
    Expiry: process.env.NEXTAUTH_EXPRIRY || '4h',
    Url: process.env.NEXTAUTH_URL || 'http://localhost:7701',
    Secret: process.env.NEXTAUTH_SECRET || 'cDL7ZOlm9BrTA1Ea',
  },
  Aws: {
    Region: process.env.AWS_REGION || 'ap-southeast-1',
    Key: process.env.AWS_KEY || '',
    Secret: process.env.AWS_SECRET || '',
    Bucket: {
      Name: process.env.AWS_BUCKET || 'bucket',
      Folder: process.env.AWS_BUCKET_FOLDER || 'folder',
    },
  },
  Cors: process.env.CORS ? process.env.CORS.split(' ') : [],
  Database: process.env.DATABASE || 'postgresql://postgres:password@localhost:5432/db',
};

export type { IEnvConfig };
export { EnvConfig };
