import { EntityRepository, Repository } from 'typeorm';

import Agendamento from '../infra/typeorm/entities/Agendamento';

@EntityRepository(Agendamento)
class AgendamentosRepository extends Repository<Agendamento> {
  public async findByDate(date: Date): Promise<Agendamento | null> {
    const findAgendamento = await this.findOne({ where: { date } });

    return findAgendamento || null;
  }
}

export default AgendamentosRepository;
