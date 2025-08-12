interface IResponse<T> {
  code: 'Success' | 'Error' | 'NotFound' | 'Inavalid' | 'Failed';
  message?: string;
  value?: T;
}

export type { IResponse };
