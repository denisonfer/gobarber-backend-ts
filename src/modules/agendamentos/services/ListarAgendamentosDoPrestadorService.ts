import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({
    prestador_id,
    dia,
    mes,
    ano,
  }: IRequestDTO): Promise<Agendamentos[]> {
    let agendamentos = await this.cacheProvider.buscar<Agendamentos[]>(
      `agendamentos-prestador:${prestador_id}:${ano}-${mes}-${dia}`,
    );

    if (!agendamentos) {
      agendamentos = await this.agendamentosRepositorio.encontrarDisponibilidadeNoDia(
        {
          id_prestador: prestador_id,
          dia,
          mes,
          ano,
        },
      );

      await this.cacheProvider.salvar(
        `agendamentos-prestador:${prestador_id}:${ano}-${mes}-${dia}`,
        agendamentos,
      );
    }

    return agendamentos;
  }
}

export default ListarAgendamentosDoPrestadorService;
