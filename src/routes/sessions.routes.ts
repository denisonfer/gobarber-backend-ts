import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, senha } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { usuario, token } = await authenticateUser.execute({
    email,
    senha,
  });

  delete usuario.senha;

  return response.json({ usuario, token });
});

export default sessionsRouter;
