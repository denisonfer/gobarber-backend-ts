import { container } from 'tsyringe';

import '@modules/usuarios/providers';
import './providers';

import IAgendamentosRepositorio from '@modules/agendamentos/repositories/IAgendamentosRepositorio';
import AgendamentosRepositorio from '@modules/agendamentos/infra/typeorm/repositories/AgendamentosRepositorio';

import IUsuariosRepositorio from '@modules/usuarios/repositories/IUsuariosRepositorio';
import UsuariosRepositorio from '@modules/usuarios/infra/typeorm/repositories/UsuariosRepositorio';

import ITokenUsuarioRepositorio from '@modules/usuarios/repositories/ITokenUsuarioRepositorio';
import TokenUsuarioRepositorio from '@modules/usuarios/infra/typeorm/repositories/TokenUsuarioRepositorio';

import INotificacoesRepositorio from '@modules/notificacoes/repositories/INotificacoesRepositorio';
import NotificacoesRepositorio from '@modules/notificacoes/infra/typeorm/repositories/NotificacoesRepositorio';

container.registerSingleton<IAgendamentosRepositorio>(
  'AgendamentosRepositorio',
  AgendamentosRepositorio,
);

container.registerSingleton<IUsuariosRepositorio>(
  'UsuariosRepositorio',
  UsuariosRepositorio,
);

container.registerSingleton<ITokenUsuarioRepositorio>(
  'TokenUsuarioRepositorio',
  TokenUsuarioRepositorio,
);

container.registerSingleton<INotificacoesRepositorio>(
  'NotificacoesRepositorio',
  NotificacoesRepositorio,
);
