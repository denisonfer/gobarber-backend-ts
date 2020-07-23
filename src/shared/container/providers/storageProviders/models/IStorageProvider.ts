export default interface IStorageProvider {
  salvarArquivo(file: string): Promise<string>;
  deletarArquivo(file: string): Promise<void>;
}
