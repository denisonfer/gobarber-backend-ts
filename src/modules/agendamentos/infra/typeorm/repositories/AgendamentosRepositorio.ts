import { getRepository, Repository, Raw } from 'typeorm';

import IAgendamentosRepositorio from '@modules/agendamentos/repositories/IAgendamentosRepositorio';
import ICriarAgendamentoDTO from '@modules/agendamentos/dtos/ICriarAgendamentoDTO';
import IEncontrarDisponibilidadeNoMesDTO from '@modules/agendamentos/dtos/IEncontrarDisponibilidadeNoMesDTO';
import IEncontrarDisponibilidadeNoDiaDTO from '@modules/agendamentos/dtos/IEncontrarDisponibilidadeNoDiaDTO';
import Agendamento from '../entities/Agendamento';

class AgendamentosRepository implements IAgendamentosRepositorio {
  private ormRepository: Repository<Agendamento>;

  constructor() {
    this.ormRepository = getRepository(Agendamento);
  }

  public async create({
    prestador_id,
    usuario_id,
    data,
  }: ICriarAgendamentoDTO): Promise<Agendamento> {
    const agendamento = this.ormRepository.create({
      prestador_id,
      usuario_id,
      data,
    });

    await this.ormRepository.save(agendamento);

    return agendamento;
  }

  public async encontrarPorData(data: Date): Promise<Agendamento | undefined> {
    const findAgendamento = await this.ormRepository.findOne({
      where: {
        data,
      },
    });

    return findAgendamento;
  }

  public async encontrarDisponibilidadeNoMes({
    id_prestador,
    mes,
    ano,
  }: IEncontrarDisponibilidadeNoMesDTO): Promise<Agendamento[]> {
    const mesEditado = String(mes).padStart(2, '0');

    const agendamentos = await this.ormRepository.find({
      where: {
        prestador_id: id_prestador,
        data: Raw(
          dataFieldName =>
            `to_char(${dataFieldName}, 'MM-YYYY') = '${mesEditado}-${ano}'`,
        ),
      },
    });

    return agendamentos;
  }

  public async encontrarDisponibilidadeNoDia({
    id_prestador,
    dia,
    mes,
    ano,
  }: IEncontrarDisponibilidadeNoDiaDTO): Promise<Agendamento[]> {
    const diaEditado = String(dia).padStart(2, '0');
    const mesEditado = String(mes).padStart(2, '0');

    const agendamentos = await this.ormRepository.find({
      where: {
        prestador_id: id_prestador,
        data: Raw(
          dataFieldName =>
            `to_char(${dataFieldName}, 'DD-MM-YYYY') = '${diaEditado}-${mesEditado}-${ano}'`,
        ),
      },
    });

    return agendamentos;
  }
}

export default AgendamentosRepository;
