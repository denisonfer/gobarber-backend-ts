import { Router } from 'express';

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
  disponibilidadeNoMesController.index,
);
prestadoresRotas.get(
  '/:id_prestador/dia-disponibilidade',
  disponibilidadeNoDiaController.index,
);

export default prestadoresRotas;
