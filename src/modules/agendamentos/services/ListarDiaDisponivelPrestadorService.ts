import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAgendamentosRepositorio from '../repositories/IAgendamentosRepositorio';

interface IRequestDTO {
  id_usuario: string;
  dia: number;
  mes: number;
  ano: number;
}

type IResponse = Array<{
  hora: number;
  disponivel: boolean;
}>;

@injectable()
class ListarDiaDisponivelPrestadorService {
  constructor(
    @inject('AgendamentosRepositorio')
    private agendamentosRepositorio: IAgendamentosRepositorio,
  ) { }

  public async execute({
    id_usuario,
    dia,
    mes,
    ano,
  }: IRequestDTO): Promise<IResponse> {
    const agendamentos = await this.agendamentosRepositorio.encontrarDisponibilidadeNoDia(
      {
        id_prestador: id_usuario,
        dia,
        mes,
        ano,
      },
    );

    const horaInicial = 8;

    const cadaHora = Array.from(
      {
        length: 10,
      },
      (_, index) => index + horaInicial,
    );

    const dataAtual = new Date(Date.now());

    const disponibilidade = cadaHora.map(hora => {
      const checkHora = agendamentos.find(
        agendamento => getHours(agendamento.data) === hora,
      );

      const dataComparacao = new Date(ano, mes - 1, dia, hora);

      return {
        hora,
        disponivel: !checkHora && isAfter(dataComparacao, dataAtual),
      };
    });

    return disponibilidade;
  }
}

export default ListarDiaDisponivelPrestadorService;
