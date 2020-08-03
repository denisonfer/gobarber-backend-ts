import Agendamento from '../infra/typeorm/entities/Agendamento';

import ICriarAgendamentoDTO from '../dtos/ICriarAgendamentoDTO';
import IEncontrarDisponibilidadeNoMesDTO from '../dtos/IEncontrarDisponibilidadeNoMesDTO';
import IEncontrarDisponibilidadeNoDiaDTO from '../dtos/IEncontrarDisponibilidadeNoDiaDTO';

interface IAgendamentosRepositorio {
  create({ prestador_id, data }: ICriarAgendamentoDTO): Promise<Agendamento>;
  encontrarPorData(data: Date): Promise<Agendamento | undefined>;
  encontrarDisponibilidadeNoMes(
    data: IEncontrarDisponibilidadeNoMesDTO,
  ): Promise<Agendamento[]>;
  encontrarDisponibilidadeNoDia(
    data: IEncontrarDisponibilidadeNoDiaDTO,
  ): Promise<Agendamento[]>;
}

export default IAgendamentosRepositorio;
