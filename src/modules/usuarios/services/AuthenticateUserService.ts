import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";

import IUsuariosRepositorio from "@modules/usuarios/repositories/IUsuariosRepositorio";

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  usuario: Usuario;
  token: string;
}

class AuthenticateUserService {
  constructor(private usuariosRepositorio: IUsuariosRepositorio) { }

  public async execute({ email, senha }: IRequest): Promise<IResponse> {

    const usuario = await this.usuariosRepositorio.encontrarPorEmail(email);

    if (!usuario) {
      throw new AppError('Usuario/Senha incorretos.', 401);
    }

    const checkSenha = await compare(senha, usuario.senha);

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
