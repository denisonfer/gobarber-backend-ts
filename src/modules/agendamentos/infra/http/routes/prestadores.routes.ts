import { Router } from 'express';

import ensureAuthenticaded from '@modules/usuarios/infra/http/middlewares/ensureAuthenticaded';
import PrestadoresController from '../controllers/PrestadoresController';

const prestadoresRotas = Router();
const prestadoresController = new PrestadoresController();

prestadoresRotas.use(ensureAuthenticaded);


prestadoresRotas.get('/', prestadoresController.index);

export default prestadoresRotas;
