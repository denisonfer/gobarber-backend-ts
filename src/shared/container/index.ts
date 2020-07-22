import { container } from "tsyringe";

import '@modules/usuarios/providers'

import IAgendamentosRepositorio from "@modules/agendamentos/repositories/IAgendamentosRepositorio";
import AgendamentosRepositorio from "@modules/agendamentos/infra/typeorm/repositories/AgendamentosRepositorio";


import IUsuariosRepositorio from "@modules/usuarios/repositories/IUsuariosRepositorio";
import UsuariosRepositorio from "@modules/usuarios/infra/typeorm/repositories/UsuariosRepositorio";

container.registerSingleton<IAgendamentosRepositorio>('AgendamentosRepositorio', AgendamentosRepositorio)

container.registerSingleton<IUsuariosRepositorio>('UsuariosRepositorio', UsuariosRepositorio)
