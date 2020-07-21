import { Router } from 'express';

import AuthenticateUserService from '@modules/usuarios/services/AuthenticateUserService';
import UsuariosRepositorio from '@modules/usuarios/infra/typeorm/repositories/UsuariosRepositorio'

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, senha } = request.body;

  const usuariosRepositorio = new UsuariosRepositorio();
  const authenticateUser = new AuthenticateUserService(usuariosRepositorio);

  const { usuario, token } = await authenticateUser.execute({
    email,
    senha,
  });

  delete usuario.senha;

  return response.json({ usuario, token });
});

export default sessionsRouter;
