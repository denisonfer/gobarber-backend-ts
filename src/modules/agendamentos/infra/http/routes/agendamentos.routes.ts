import { Router } from 'express';

import AgendemantosController from "../controllers/AgendemantosController";
import ensureAuthenticaded from '@modules/usuarios/infra/http/middlewares/ensureAuthenticaded';

const agendamentosRotas = Router();
const agendamentosController = new AgendemantosController();

agendamentosRotas.use(ensureAuthenticaded);


agendamentosRotas.post('/', agendamentosController.create);

export default agendamentosRotas;
