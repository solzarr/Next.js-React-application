import { S3Upload } from '@/server/actions/aws';
import { IResponse, Slugify } from '@/utils/common';
import prisma from '@/utils/prisma';
import { TRegisterProfile } from '@/utils/zod';

export const RegisterProfile = async (input: TRegisterProfile): Promise<IResponse<string>> => {
  const { name, email, phone, skills, experience, cv } = input;

  const existingUser = await prisma.profile.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      code: 'Error',
      message: 'User with this email already exists',
    };
  }

  const keyName = Slugify(email);

  const upload = await S3Upload({
    type: 'FILE',
    file: cv,
    fileExtension: '.pdf',
    key: keyName,
    contentType: 'application/pdf',
  });

  if (upload.code !== 'Success' || !upload.value) {
    return {
      code: 'Failed',
      message: 'Error upload file',
    };
  }

  const newUser = await prisma.profile.create({
    data: {
      name,
      email,
      phone,
      skills,
      experience,
      resume: upload.value.url ?? '',
      status: 'ACTIVE',
    },
  });

  return {
    code: 'Success',
    message: 'Created',
    value: newUser.id,
  };
};
