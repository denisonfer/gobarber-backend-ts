import { Router } from 'express';

import agendamentosRotas from '@modules/agendamentos/infra/http/routes/agendamentos.routes';
import usuariosRotas from '@modules/usuarios/infra/http/routes/usuarios.routes';
import sessionsRouter from '@modules/usuarios/infra/http/routes/sessions.routes';
import senhaRotas from '@modules/usuarios/infra/http/routes/senhas.routes';
import perfisRotas from '@modules/usuarios/infra/http/routes/perfis.routes';
import prestadoresRotas from '@modules/agendamentos/infra/http/routes/prestadores.routes'

const routes = Router();

routes.use('/agendamentos', agendamentosRotas);
routes.use('/usuarios', usuariosRotas);
routes.use('/sessoes', sessionsRouter);
routes.use('/senhas', senhaRotas);
routes.use('/perfil', perfisRotas);
routes.use('/prestadores', prestadoresRotas);

export default routes;
