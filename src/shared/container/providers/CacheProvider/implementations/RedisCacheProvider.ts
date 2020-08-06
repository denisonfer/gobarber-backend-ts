import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async salvar(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async buscar<T>(key: string): Promise<T | null> {
    const dados = await this.client.get(key);
    if (!dados) {
      return null;
    }
    const dadosConvertidos = JSON.parse(dados) as T;

    return dadosConvertidos;
  }

  public async invalidar(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidarPorPrefixo(prefixo: string): Promise<void> {
    const chaves = await this.client.keys(`${prefixo}:*`);

    const pipeline = this.client.pipeline();

    chaves.forEach(chave => {
      pipeline.del(chave);
    });

    await pipeline.exec();
  }
}
