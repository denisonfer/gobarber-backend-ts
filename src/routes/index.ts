import { Router } from 'express';

import agendamentosRotas from './agendamentos.routes';
import usuariosRotas from './usuarios.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', agendamentosRotas);
routes.use('/users', usuariosRotas);
routes.use('/sessions', sessionsRouter);

export default routes;
