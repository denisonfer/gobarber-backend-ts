import IStorageProvider from "../models/IStorageProvider";

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = []

  public async salvarArquivo(file: string): Promise<string> {
    this.storage.push(file)

    return file;
  }

  public async deletarArquivo(file: string): Promise<void> {
    const index = this.storage.findIndex(storageFile => storageFile === file);

    this.storage.splice(index, 1);

  }
}
