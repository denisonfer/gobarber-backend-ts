import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PerfilController from '../controllers/PerfilController';
import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';

const perfisRotas = Router();
const perfilController = new PerfilController();

perfisRotas.use(ensureAuthenticaded);

perfisRotas.get('/', perfilController.show);
perfisRotas.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha_antiga: Joi.string(),
      senha: Joi.string(),
      confirmacao_senha: Joi.string().valid(Joi.ref('senha')),
    },
  }),
  perfilController.update,
);

export default perfisRotas;
