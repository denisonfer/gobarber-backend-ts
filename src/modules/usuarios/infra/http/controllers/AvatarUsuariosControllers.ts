import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateUserAvatarService from '@modules/usuarios/services/UpdateUserAvatarService';

export default class AvatarUsuariosControllers {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const usuario = await updateUserAvatar.execute({
      usuario_id: req.usuario.id,
      avatarFilename: req.file.filename,
    });

    delete usuario.senha;

    return res.json(usuario);
  }
}
