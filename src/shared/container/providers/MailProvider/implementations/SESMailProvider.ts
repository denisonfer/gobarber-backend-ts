import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import aws from 'aws-sdk';

import mailConfig from '@config/mail';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-2',
      }),
    });
  }

  public async enviarEmail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.nome || mailConfig.defaults.from.email,
        address: from?.email || mailConfig.defaults.from.email,
      },
      to: {
        name: to.nome,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
