import Agendamento from "../infra/typeorm/entities/Agendamento";

import ICriarAgendamentoDTO from "../dtos/ICriarAgendamentoDTO";

interface IAgendamentosRepositorio {
  create({ prestador_id, data }: ICriarAgendamentoDTO): Promise<Agendamento>
  encontrarPorData(data: Date): Promise<Agendamento | undefined>
}

export default IAgendamentosRepositorio;

