import { IFormRegister, IResponse } from '@/utils/common';

export const RegisterProfile = (form: IFormRegister): IResponse<string> => {
  console.log('Register', form);

  return {
    code: 'Success',
    message: 'Created',
  };
};
