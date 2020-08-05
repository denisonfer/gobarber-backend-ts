import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CriarUsuarioService from '@modules/usuarios/services/CriarUsuarioService';

export default class UsuariosControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const { nome, email, senha } = req.body;

    const criarUsuario = container.resolve(CriarUsuarioService);

    const user = await criarUsuario.execute({
      nome,
      email,
      senha,
    });

    return res.json(classToClass(user));
  }
}
