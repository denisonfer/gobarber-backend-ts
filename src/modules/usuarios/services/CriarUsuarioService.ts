import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import IUsuariosRepositorio from "@modules/usuarios/repositories/IUsuariosRepositorio";

interface IRequest {
  nome: string;
  email: string;
  senha: string;
}

class CriarUsuarioService {
  constructor(private usuariosRepositorio: IUsuariosRepositorio) { }

  public async execute({ nome, email, senha }: IRequest): Promise<Usuario> {
    const checkUsuario = await this.usuariosRepositorio.encontrarPorEmail(
      email
    );

    if (checkUsuario) {
      throw new AppError('Email address already used.');
    }

    const hashedSenha = await hash(senha, 8);

    const novoUsuario = this.usuariosRepositorio.create({
      nome,
      email,
      senha: hashedSenha,
    });


    return novoUsuario;
  }
}

export default CriarUsuarioService;
