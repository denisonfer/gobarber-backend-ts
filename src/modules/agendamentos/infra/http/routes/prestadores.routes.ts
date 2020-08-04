import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticaded from '@modules/usuarios/infra/http/middlewares/ensureAuthenticaded';
import PrestadoresController from '../controllers/PrestadoresController';
import DisponibilidadeNoMesController from '../controllers/DisponibilidadeNoMesController';
import DisponibilidadeNoDiaController from '../controllers/DisponibilidadeNoDiaController.';

const prestadoresRotas = Router();
const prestadoresController = new PrestadoresController();
const disponibilidadeNoMesController = new DisponibilidadeNoMesController();
const disponibilidadeNoDiaController = new DisponibilidadeNoDiaController();

prestadoresRotas.use(ensureAuthenticaded);

prestadoresRotas.get('/', prestadoresController.index);
prestadoresRotas.get(
  '/:id_prestador/mes-disponibilidade',
  celebrate({
    [Segments.PARAMS]: {
      id_prestador: Joi.string().uuid().required(),
    },
  }),
  disponibilidadeNoMesController.index,
);
prestadoresRotas.get(
  '/:id_prestador/dia-disponibilidade',
  celebrate({
    [Segments.PARAMS]: {
      id_prestador: Joi.string().uuid().required(),
    },
  }),
  disponibilidadeNoDiaController.index,
);

export default prestadoresRotas;
