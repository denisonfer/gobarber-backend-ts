import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

import Usuario from '../models/Usuario';

interface Request {
  usuario_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ usuario_id, avatarFilename }: Request): Promise<Usuario> {
    const usuariosRepositorio = getRepository(Usuario);

    const usuario = await usuariosRepositorio.findOne(usuario_id);

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

    await usuariosRepositorio.save(usuario);

    return usuario;
  }
}

export default UpdateUserAvatarService;
