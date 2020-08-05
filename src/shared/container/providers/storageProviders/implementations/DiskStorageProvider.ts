import fs from 'fs';
import { resolve } from 'path';

import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async salvarArquivo(file: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.directory, file),
      resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deletarArquivo(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
