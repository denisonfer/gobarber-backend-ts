import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from "date-fns";

import IAgendamentosRepositorio from '../repositories/IAgendamentosRepositorio';

interface IRequestDTO {
  id_usuario: string;
  mes: number;
  ano: number;
}

type IResponse = Array<{
  dia: number;
  disponivel: boolean;
}>

@injectable()
class ListarMesDisponivelService {
  constructor(
    @inject('AgendamentosRepositorio')
    private agendamentosRepositorio: IAgendamentosRepositorio
  ) { }

  public async execute({ id_usuario, mes, ano }: IRequestDTO): Promise<IResponse> {
    const agendamentos =
      await this.agendamentosRepositorio.encontrarDisponibilidadeNoMes({
        id_prestador: id_usuario,
        ano,
        mes
      });

    const diasNoMes = getDaysInMonth(new Date(ano, mes - 1))

    const cadaDiaNoMes = Array.from(
      { length: diasNoMes },
      (value, index) => index + 1
    );

    const disponibilidade = cadaDiaNoMes.map(dia => {
      const agendamentosNoDia = agendamentos.filter(agendamento => {
        return getDate(agendamento.data) === dia
      })

      return {
        dia: dia,
        disponivel: agendamentosNoDia.length < 10
      }
    })

    return disponibilidade;

  }
}

export default ListarMesDisponivelService;
