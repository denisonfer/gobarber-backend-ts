import { Router } from 'express';

import agendamentosRotas from '@modules/agendamentos/infra/http/routes/agendamentos.routes';
import usuariosRotas from '@modules/usuarios/infra/http/routes/usuarios.routes';
import sessionsRouter from '@modules/usuarios/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/agendamentos', agendamentosRotas);
routes.use('/usuarios', usuariosRotas);
routes.use('/sessoes', sessionsRouter);

export default routes;
