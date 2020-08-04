import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EsqueciSenhaController from '../controllers/EsqueciSenhaControllers';
import ResetarSenhacontroller from '../controllers/ResetarSenhaControllers';

const senhaRotas = Router();
const esqueciSenhaController = new EsqueciSenhaController();
const resetarSenhaController = new ResetarSenhacontroller();

senhaRotas.post(
  '/esqueci',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  esqueciSenhaController.create,
);
senhaRotas.post(
  '/resetar',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      senha: Joi.string().required(),
      confirmacao_senha: Joi.string().required().valid(Joi.ref('senha')),
    },
  }),
  resetarSenhaController.create,
);

export default senhaRotas;
