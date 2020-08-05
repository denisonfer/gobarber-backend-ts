import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/usuarios/services/AuthenticateUserService';

export default class SessionsControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { usuario, token } = await authenticateUser.execute({
      email,
      senha,
    });

    return res.json({ usuario: classToClass(usuario), token });
  }
}
