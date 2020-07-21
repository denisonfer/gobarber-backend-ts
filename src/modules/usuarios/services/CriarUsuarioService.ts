import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import Usuario from '../infra/entities/Usuario';

interface Request {
  nome: string;
  email: string;
  senha: string;
}

class CriarUsuarioService {
  public async execute({ nome, email, senha }: Request): Promise<Usuario> {
    const usuariosRepositorio = getRepository(Usuario);

    const checkUsuario = await usuariosRepositorio.findOne({
      where: { email },
    });

    if (checkUsuario) {
      throw new AppError('Email address already used.');
    }

    const hashedSenha = await hash(senha, 8);

    const novoUsuario = usuariosRepositorio.create({
      nome,
      email,
      senha: hashedSenha,
    });

    await usuariosRepositorio.save(novoUsuario);

    return novoUsuario;
  }
}

export default CriarUsuarioService;
