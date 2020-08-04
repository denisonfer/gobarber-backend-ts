import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticaded from '@modules/usuarios/infra/http/middlewares/ensureAuthenticaded';
import AgendemantosController from '../controllers/AgendemantosController';
import AgendamentosDoPrestadorController from '../controllers/AgendamentosDoPrestadorController';

const agendamentosRotas = Router();
const agendamentosController = new AgendemantosController();
const agendamentosDoPrestadorController = new AgendamentosDoPrestadorController();

agendamentosRotas.use(ensureAuthenticaded);

agendamentosRotas.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      prestador_id: Joi.string().uuid().required(),
      data: Joi.date(),
    },
  }),
  agendamentosController.create,
);
agendamentosRotas.get(
  '/meus-agendamentos',
  agendamentosDoPrestadorController.index,
);

export default agendamentosRotas;
