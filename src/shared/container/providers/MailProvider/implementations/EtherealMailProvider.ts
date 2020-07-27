import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(conta => {
      const transporter = nodemailer.createTransport({
        host: conta.smtp.host,
        port: conta.smtp.port,
        secure: conta.smtp.secure,
        auth: {
          user: conta.user,
          pass: conta.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async enviarEmail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const mensagem = await this.client.sendMail({
      from: {
        name: from?.nome || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.nome,
        address: to.email,
      },
      subject,
      text: 'teste email',
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', mensagem.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mensagem));
  }
}
