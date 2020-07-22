import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import IUsuariosRepositorio from "@modules/usuarios/repositories/IUsuariosRepositorio";

interface IRequest {
  usuario_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject
      ('UsuariosRepositorio')
    private usuariosRepositorio: IUsuariosRepositorio
  ) { }

  public async execute({ usuario_id, avatarFilename }: IRequest): Promise<Usuario> {

    const usuario = await this.usuariosRepositorio.encontrarPorID(usuario_id);

    if (!usuario) {
      throw new AppError('Usuário não autenticado', 401);
    }

    if (usuario.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, usuario.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    usuario.avatar = avatarFilename;

    await this.usuariosRepositorio.save(usuario);

    return usuario;
  }
}

export default UpdateUserAvatarService;
