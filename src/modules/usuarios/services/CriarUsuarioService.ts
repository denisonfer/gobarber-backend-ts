import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import IUsuariosRepositorio from "@modules/usuarios/repositories/IUsuariosRepositorio";
import IHashProvider from "@modules/usuarios/providers/HashProvider/models/IHashProvider";

interface IRequest {
  nome: string;
  email: string;
  senha: string;
}

@injectable()
class CriarUsuarioService {
  constructor(
    @inject('UsuariosRepositorio')
    private usuariosRepositorio: IUsuariosRepositorio,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ nome, email, senha }: IRequest): Promise<Usuario> {
    const checkUsuario = await this.usuariosRepositorio.encontrarPorEmail(
      email
    );

    if (checkUsuario) {
      throw new AppError('Email address already used.');
    }

    const hashedSenha = await this.hashProvider.gerarHash(senha);

    const novoUsuario = await this.usuariosRepositorio.create({
      nome,
      email,
      senha: hashedSenha,
    });

    await this.usuariosRepositorio.save(novoUsuario);


    return novoUsuario;
  }
}

export default CriarUsuarioService;
