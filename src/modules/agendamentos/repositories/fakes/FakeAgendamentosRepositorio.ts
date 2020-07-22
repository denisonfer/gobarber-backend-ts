import { uuid } from "uuidv4";
import { isEqual } from "date-fns";

import IAgendamentosRepositorio from "@modules/agendamentos/repositories/IAgendamentosRepositorio";
import ICriarAgendamentoDTO from "@modules/agendamentos/dtos/ICriarAgendamentoDTO";
import Agendamento from '@modules/agendamentos/infra/typeorm/entities/Agendamento';

class AgendamentosRepository implements IAgendamentosRepositorio {
  private agendamentos: Agendamento[] = []

  public async encontrarPorData(data: Date): Promise<Agendamento | undefined> {
    const buscarAgendamento = this.agendamentos.find(agendamento =>
      isEqual(agendamento.data, data))

    return buscarAgendamento;
  }

  public async create({ prestador_id, data }: ICriarAgendamentoDTO): Promise<Agendamento> {
    const agendamento = new Agendamento();

    Object.assign(agendamento, { id: uuid(), prestador_id, data })

    this.agendamentos.push(agendamento)

    return agendamento;
  }
}

export default AgendamentosRepository;
