import { Router } from 'express';

import agendamentosRotas from './agendamentos.routes';
import usuariosRotas from './usuarios.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/agendamentos', agendamentosRotas);
routes.use('/usuarios', usuariosRotas);
routes.use('/sessoes', sessionsRouter);

export default routes;
