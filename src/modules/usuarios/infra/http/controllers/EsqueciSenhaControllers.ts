import { Request, Response } from 'express';
import { container } from 'tsyringe';

import EnviarEmailRecuperacaoSenhaService from '@modules/usuarios/services/EnviarEmailRecuperacaoSenhaService';

export default class EsqueciSenhaController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const enviarEmailEsqueciSenha = container.resolve(
      EnviarEmailRecuperacaoSenhaService,
    );

    await enviarEmailEsqueciSenha.execute({
      email,
    });

    return res.status(204).send();
  }
}
