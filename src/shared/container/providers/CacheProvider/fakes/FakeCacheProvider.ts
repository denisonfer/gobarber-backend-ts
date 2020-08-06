import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async salvar(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async buscar<T>(key: string): Promise<T | null> {
    const dados = this.cache[key];
    if (!dados) {
      return null;
    }
    const dadosConvertidos = JSON.parse(dados) as T;

    return dadosConvertidos;
  }

  public async invalidar(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidarPorPrefixo(prefixo: string): Promise<void> {
    const chaves = Object.keys(this.cache).filter(chave =>
      chave.startsWith(`${prefixo}:`),
    );

    chaves.forEach(chave => {
      delete this.cache[chave];
    });
  }
}
