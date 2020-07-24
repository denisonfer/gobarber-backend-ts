import { inject } from "tsyringe";

import IUsuariosRepositorio from "../repositories/IUsuariosRepositorio";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";
import ITokenUsuarioRepositorio from "../repositories/ITokenUsuarioRepositorio";

interface IRequestDTO {
  email: string;
}
export default class EnviarEmailRecuperacaoSenhaService {
  constructor(
    @inject('UsuariosRepositorio')
    private usuariosRepositorio: IUsuariosRepositorio,

    @inject('MailProvider')
    private mailprovider: IMailProvider,

    @inject('TokenUsuarioRepositorio')
    private tokenUsuarioRepositorio: ITokenUsuarioRepositorio,
  ) { }

  public async execute({ email }: IRequestDTO): Promise<void> {
    const usuario = await this.usuariosRepositorio.encontrarPorEmail(email)

    if (!usuario) {
      throw new AppError('Usuário não localizado!')
    }

    await this.tokenUsuarioRepositorio.gerarToken(usuario.id)

    await this.mailprovider.enviarEmail(
      email,
      'Pedido de recuperação de senha recebido'
    );
  }

}
