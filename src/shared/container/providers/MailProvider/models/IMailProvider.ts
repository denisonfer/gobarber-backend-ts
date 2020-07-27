import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  enviarEmail(data: ISendMailDTO): Promise<void>;
}
