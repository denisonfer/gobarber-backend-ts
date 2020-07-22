export default interface IHashProvider {
  gerarHash(payload: string): Promise<string>;
  compararHash(payload: string, hashGerado: string): Promise<boolean>;
}
