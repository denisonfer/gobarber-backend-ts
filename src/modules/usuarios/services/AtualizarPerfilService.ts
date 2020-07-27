import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import IUsuariosRepositorio from '@modules/usuarios/repositories/IUsuariosRepositorio';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  id_usuario: string;
  nome: string;
  email: string;
  senha_antiga?: string;
  senha?: string;
}

@injectable()
class AtualizarPerfilService {
  constructor(
    @inject('UsuariosRepositorio')
    private usuariosRepositorio: IUsuariosRepositorio,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id_usuario,
    nome,
    email,
    senha,
    senha_antiga,
  }: IRequestDTO): Promise<Usuario> {
    const usuario = await this.usuariosRepositorio.encontrarPorID(id_usuario);

    if (!usuario) {
      throw new AppError('Usuário não autenticado', 401);
    }

    const checkUsuarioEmail = await this.usuariosRepositorio.encontrarPorEmail(
      email,
    );

    if (checkUsuarioEmail && checkUsuarioEmail.id !== id_usuario) {
      throw new AppError('Email já ultilizado', 401);
    }

    usuario.nome = nome;
    usuario.email = email;
    if (senha && !senha_antiga) {
      throw new AppError('Senha antiga deve ser informada', 401);
    }

    if (senha && senha_antiga) {
      const checkSenhaAntiga = await this.hashProvider.compararHash(
        senha_antiga,
        usuario.senha,
      );

      if (!checkSenhaAntiga) {
        throw new AppError('Senha antiga incorreta', 401);
      }

      usuario.senha = await this.hashProvider.gerarHash(senha);
    }

    return this.usuariosRepositorio.save(usuario);
  }
}

export default AtualizarPerfilService;
