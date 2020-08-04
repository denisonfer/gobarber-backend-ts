import { ObjectID } from 'mongodb';

import Notificacao from '@modules/notificacoes/infra/typeorm/schemas/Notificacao';
import ICriarNotificaoDTO from '@modules/notificacoes/dtos/ICriarNotificacaoDTO';
import INotificacoesRepositorio from '../INotificacoesRepositorio';

class FakeNotificacoesRepositorio implements INotificacoesRepositorio {
  private notificacoes: Notificacao[] = [];

  public async criar({
    conteudo,
    id_receptor,
  }: ICriarNotificaoDTO): Promise<Notificacao> {
    const notificacao = new Notificacao();

    Object.assign(notificacao, { id: new ObjectID(), conteudo, id_receptor });

    this.notificacoes.push(notificacao);

    return notificacao;
  }
}

export default FakeNotificacoesRepositorio;
