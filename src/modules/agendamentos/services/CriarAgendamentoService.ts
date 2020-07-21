import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Agendamento from '../infra/typeorm/entities/Agendamento';
import IAgendamentosRepositorio from "../repositories/IAgendamentosRepositorio";

interface IRequest {
  prestador_id: string;
  data: Date;
}

class CriarAgendamentoService {
  constructor(
    private agendamentosRepositorio: IAgendamentosRepositorio
  ) {

  }

  public async execute({ prestador_id, data }: IRequest): Promise<Agendamento> {

    const dataAgendamento = startOfHour(data);

    const buscaAgendamentoComMesmaData = await this.agendamentosRepositorio.encontrarPorData(
      dataAgendamento,
    );

    if (buscaAgendamentoComMesmaData) {
      throw new AppError('This appointment is already booked');
    }

    const novoAgendamento = await this.agendamentosRepositorio.create({
      prestador_id,
      data: dataAgendamento,
    });


    return novoAgendamento;
  }
}

export default CriarAgendamentoService;
