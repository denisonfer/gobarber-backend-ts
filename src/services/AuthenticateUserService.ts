import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import Usuario from '../models/Usuario';

interface Request {
  email: string;
  senha: string;
}

interface Response {
  usuario: Usuario;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, senha }: Request): Promise<Response> {
    const usuariosRepositorio = getRepository(Usuario);

    const usuario = await usuariosRepositorio.findOne({ where: { email } });

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
