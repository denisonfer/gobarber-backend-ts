import { Request, Response } from "express";
import { container } from "tsyringe";

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

    delete user.senha;

    return res.json(user);
  }
}
