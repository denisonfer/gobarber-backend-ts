import { getRepository, Repository } from 'typeorm';

import IAgendamentosRepositorio from "@modules/agendamentos/repositories/IAgendamentosRepositorio";
import ICriarAgendamentoDTO from "@modules/agendamentos/dtos/ICriarAgendamentoDTO";
import Agendamento from '../entities/Agendamento';

class AgendamentosRepository implements IAgendamentosRepositorio {
  private ormRepository: Repository<Agendamento>
  constructor() {
    this.ormRepository = getRepository(Agendamento)
  }

  public async encontrarPorData(date: Date): Promise<Agendamento | undefined> {
    const findAgendamento = await this.ormRepository.findOne({ where: { date } });

    return findAgendamento;

  }

  public async create({ prestador_id, data }: ICriarAgendamentoDTO): Promise<Agendamento> {
    const agendamento = this.ormRepository.create({ prestador_id, data })

    await this.ormRepository.save(agendamento);

    return agendamento;
  }
}

export default AgendamentosRepository;
