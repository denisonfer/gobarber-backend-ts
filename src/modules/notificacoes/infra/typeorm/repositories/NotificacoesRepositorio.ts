import { MongoRepository, getMongoRepository } from 'typeorm';

import INotificacoesRepositorio from '@modules/notificacoes/repositories/INotificacoesRepositorio';
import ICriarNotificaoDTO from '@modules/notificacoes/dtos/ICriarNotificacaoDTO';
import Notificacao from '../schemas/Notificacao';

class NotificacoesRepositorio implements INotificacoesRepositorio {
  private ormRepository: MongoRepository<Notificacao>;

  constructor() {
    this.ormRepository = getMongoRepository(Notificacao, 'mongo');
  }

  public async criar({
    conteudo,
    id_receptor,
  }: ICriarNotificaoDTO): Promise<Notificacao> {
    const notificacao = this.ormRepository.create({
      conteudo,
      id_receptor,
    });

    await this.ormRepository.save(notificacao);

    return notificacao;
  }
}

export default NotificacoesRepositorio;
