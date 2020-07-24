import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from "../models/IMailProvider";

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(conta => {
      const transporter = nodemailer.createTransport({
        host: conta.smtp.host,
        port: conta.smtp.port,
        secure: conta.smtp.secure,
        auth: {
          user: conta.user,
          pass: conta.pass
        }
      });

      this.client = transporter;

    });
  }

  public async enviarEmail(to: string, body: string): Promise<void> {
    const mensagem = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Message sent: %s', mensagem.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mensagem));

  }
}
