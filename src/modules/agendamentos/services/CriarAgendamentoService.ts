import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Agendamento from '@modules/agendamentos/infra/typeorm/entities/Agendamento';
import AgendamentosRepositorio from '../repositories/AgendamentosRepositorio';

interface Request {
  prestador_id: string;
  data: Date;
}

class CriarAgendamentoService {
  public async execute({ prestador_id, data }: Request): Promise<Agendamento> {
    const agendamentosRepositorio = getCustomRepository(AgendamentosRepositorio);

    const dataAgendamento = startOfHour(data);

    const buscaAgendamentoComMesmaData = await agendamentosRepositorio.findByDate(
      dataAgendamento,
    );

    if (buscaAgendamentoComMesmaData) {
      throw new AppError('This appointment is already booked');
    }

    const novoAgendamento = agendamentosRepositorio.create({
      prestador_id,
      data: dataAgendamento,
    });

    await agendamentosRepositorio.save(novoAgendamento);

    return novoAgendamento;
  }
}

export default CriarAgendamentoService;
