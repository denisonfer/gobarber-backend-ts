import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
  private mensagens: ISendMailDTO[] = [];

  public async enviarEmail(mensagem: ISendMailDTO): Promise<void> {
    this.mensagens.push(mensagem);
  }
}
