import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AtualizarPerfilService from '@modules/usuarios/services/AtualizarPerfilService';
import ExibirPerfilService from '@modules/usuarios/services/ExibirPerfilService';

class PerfilController {
  public async show(req: Request, res: Response): Promise<Response> {
    const exibirPerfil = container.resolve(ExibirPerfilService);

    const usuario = await exibirPerfil.execute({
      id_usuario: req.usuario.id,
    });

    return res.json(usuario);
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

    delete atualizarUsuario.senha;

    return res.json(atualizarUsuario);
  }
}

export default PerfilController;
