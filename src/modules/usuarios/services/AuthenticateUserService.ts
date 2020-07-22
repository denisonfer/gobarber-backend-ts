import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";

import IUsuariosRepositorio from "@modules/usuarios/repositories/IUsuariosRepositorio";

import IHashProvider from "@modules/usuarios/providers/HashProvider/models/IHashProvider";

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  usuario: Usuario;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsuariosRepositorio')
    private usuariosRepositorio: IUsuariosRepositorio,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ email, senha }: IRequest): Promise<IResponse> {

    const usuario = await this.usuariosRepositorio.encontrarPorEmail(email);

    if (!usuario) {
      throw new AppError('Usuario/Senha incorretos.', 401);
    }

    const checkSenha = await this.hashProvider.compararHash(senha, usuario.senha);

    if (!checkSenha) {
      throw new AppError('Usuario/Senha incorretos.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: usuario.id,
      expiresIn,
    });

    return {
      usuario,
      token,
    };
  }
}

export default AuthenticateUserService;
