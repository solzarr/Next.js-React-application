export const FileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const Base64ToBuffer = (base64String: string): { buffer: Buffer; mimeType: string } => {
  const matches = base64String.match(/^data:([^;]+);base64,(.+)$/);

  if (matches) {
    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    return { buffer, mimeType };
  }

  const buffer = Buffer.from(base64String, 'base64');
  return { buffer, mimeType: 'application/octet-stream' };
};

interface IBuffer {
  buffer?: Buffer<ArrayBufferLike> | Buffer<ArrayBuffer>;
  size: number;
  contentType: string;
  name?: string;
}

export const FileBuffer = async (file: File | string): Promise<IBuffer> => {
  try {
    if (typeof file === 'string') {
      const { buffer, mimeType } = Base64ToBuffer(file);
      return {
        buffer,
        size: buffer.length,
        contentType: mimeType,
      };
    }

    const arrayBuffer = await file.arrayBuffer();

    return {
      buffer: Buffer.from(arrayBuffer),
      size: file.size,
      contentType: file.type,
      name: file.name,
    };
  } catch (err) {
    console.error(err);
    return {
      size: 0,
      contentType: '',
    };
  }
};

export const RandomCode = (digit: number) => {
  if (digit < 3 || digit > 8) {
    return '';
  }
  const max = Math.pow(10, digit);
  return Math.floor(Math.random() * max)
    .toString()
    .padStart(digit, '0');
};

export const Slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace('@', '-at-')
    .replace(/\./g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};
