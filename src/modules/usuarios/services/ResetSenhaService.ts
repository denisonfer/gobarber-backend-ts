import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUsuariosRepositorio from '../repositories/IUsuariosRepositorio';
import ITokenUsuarioRepositorio from '../repositories/ITokenUsuarioRepositorio';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  senha: string;
  token: string;
}

@injectable()
export default class ResetSenhaService {
  constructor(
    @inject('UsuariosRepositorio')
    private usuariosRepositorio: IUsuariosRepositorio,

    @inject('TokenUsuarioRepositorio')
    private tokenUsuarioRepositorio: ITokenUsuarioRepositorio,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ token, senha }: IRequestDTO): Promise<void> {
    const tokenUsuario = await this.tokenUsuarioRepositorio.encontrarPorToken(
      token,
    );

    if (!tokenUsuario) {
      throw new AppError('Token do usuário não existe');
    }

    const usuario = await this.usuariosRepositorio.encontrarPorID(
      tokenUsuario.id_usuario,
    );

    if (!usuario) {
      throw new AppError('Usuário não localizado');
    }

    const tokenCriadoEm = tokenUsuario.created_at;
    const compararData = addHours(tokenCriadoEm, 2);

    if (isAfter(Date.now(), compararData)) {
      throw new AppError('Token expirado');
    }

    usuario.senha = await this.hashProvider.gerarHash(senha);

    await this.usuariosRepositorio.save(usuario);
  }
}
