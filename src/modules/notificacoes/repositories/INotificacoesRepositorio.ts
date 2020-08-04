import ICriarNotificaoDTO from '../dtos/ICriarNotificacaoDTO';
import Notificacao from '../infra/typeorm/schemas/Notificacao';

export default interface INotificacoesRepositorio {
  criar(data: ICriarNotificaoDTO): Promise<Notificacao>;
}
