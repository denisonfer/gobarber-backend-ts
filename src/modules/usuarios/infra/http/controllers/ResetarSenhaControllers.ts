import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetSenhaService from '@modules/usuarios/services/ResetSenhaService';

export default class ResetarSenhaController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, senha } = req.body;

    const resetarSenha = container.resolve(ResetSenhaService);

    await resetarSenha.execute({
      token,
      senha,
    });

    return res.status(204).send();
  }
}
