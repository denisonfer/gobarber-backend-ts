import { inject, injectable } from 'tsyringe';
import { resolve } from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsuariosRepositorio from '../repositories/IUsuariosRepositorio';
import ITokenUsuarioRepositorio from '../repositories/ITokenUsuarioRepositorio';

interface IRequestDTO {
  email: string;
}

@injectable()
export default class EnviarEmailRecuperacaoSenhaService {
  constructor(
    @inject('UsuariosRepositorio')
    private usuariosRepositorio: IUsuariosRepositorio,

    @inject('MailProvider')
    private mailprovider: IMailProvider,

    @inject('TokenUsuarioRepositorio')
    private tokenUsuarioRepositorio: ITokenUsuarioRepositorio,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    const usuario = await this.usuariosRepositorio.encontrarPorEmail(email);

    if (!usuario) {
      throw new AppError('Usuário não localizado!');
    }

    const { token } = await this.tokenUsuarioRepositorio.gerarToken(usuario.id);

    const esqueciSenhaTemplate = resolve(
      __dirname,
      '..',
      'views',
      'esqueci_senha.hbs',
    );

    await this.mailprovider.enviarEmail({
      to: {
        nome: usuario.nome,
        email: usuario.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: esqueciSenhaTemplate,
        variables: {
          nome: usuario.nome,
          link: `http://localhost:3000/resetar_senha/?token=${token}`,
        },
      },
    });
  }
}
