export default interface ICacheProvider {
  salvar(key: string, value: any): Promise<void>;
  buscar<T>(key: string): Promise<T | null>;
  invalidar(key: string): Promise<void>;
  invalidarPorPrefixo(prefixo: string): Promise<void>;
}
