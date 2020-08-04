import { injectable, inject } from 'tsyringe';

import IAgendamentosRepositorio from '../repositories/IAgendamentosRepositorio';
import Agendamentos from '../infra/typeorm/entities/Agendamento';

interface IRequestDTO {
  prestador_id: string;
  dia: number;
  mes: number;
  ano: number;
}

@injectable()
class ListarAgendamentosDoPrestadorService {
  constructor(
    @inject('AgendamentosRepositorio')
    private agendamentosRepositorio: IAgendamentosRepositorio,
  ) { }

  public async execute({
    prestador_id,
    dia,
    mes,
    ano,
  }: IRequestDTO): Promise<Agendamentos[]> {
    const agendamentos = await this.agendamentosRepositorio.encontrarDisponibilidadeNoDia(
      {
        id_prestador: prestador_id,
        dia,
        mes,
        ano,
      },
    );

    return agendamentos;
  }
}

export default ListarAgendamentosDoPrestadorService;
