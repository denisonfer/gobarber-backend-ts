import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AtualizarPerfilService from '@modules/usuarios/services/AtualizarPerfilService';
import ExibirPerfilService from '@modules/usuarios/services/ExibirPerfilService';

class PerfilController {
  public async show(req: Request, res: Response): Promise<Response> {
    const exibirPerfil = container.resolve(ExibirPerfilService);

    const usuario = await exibirPerfil.execute({
      id_usuario: req.usuario.id,
    });

    return res.json(classToClass(usuario));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { nome, email, senha_antiga, senha } = req.body;

    const atualizarPerfil = container.resolve(AtualizarPerfilService);

    const atualizarUsuario = await atualizarPerfil.execute({
      id_usuario: req.usuario.id,
      nome,
      email,
      senha_antiga,
      senha,
    });

    return res.json(classToClass(atualizarUsuario));
  }
}

export default PerfilController;
