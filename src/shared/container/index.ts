import { container } from "tsyringe";

import '@modules/usuarios/providers'
import './providers'

import IAgendamentosRepositorio from "@modules/agendamentos/repositories/IAgendamentosRepositorio";
import AgendamentosRepositorio from "@modules/agendamentos/infra/typeorm/repositories/AgendamentosRepositorio";

import IUsuariosRepositorio from "@modules/usuarios/repositories/IUsuariosRepositorio";
import UsuariosRepositorio from "@modules/usuarios/infra/typeorm/repositories/UsuariosRepositorio";

import ITokenUsuarioRepositorio from "@modules/usuarios/repositories/ITokenUsuarioRepositorio";
//import UsuariosRepositorio from "@modules/usuarios/infra/typeorm/repositories/";

container.registerSingleton<IAgendamentosRepositorio>('AgendamentosRepositorio', AgendamentosRepositorio)

container.registerSingleton<IUsuariosRepositorio>('UsuariosRepositorio', UsuariosRepositorio)
