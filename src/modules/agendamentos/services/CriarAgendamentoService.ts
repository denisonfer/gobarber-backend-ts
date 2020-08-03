import { inject, injectable } from 'tsyringe';
import { startOfHour, isBefore, getHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Agendamento from '../infra/typeorm/entities/Agendamento';
import IAgendamentosRepositorio from '../repositories/IAgendamentosRepositorio';

interface IRequest {
  prestador_id: string;
  usuario_id: string;
  data: Date;
}

@injectable()
class CriarAgendamentoService {
  constructor(
    @inject('AgendamentosRepositorio')
    private agendamentosRepositorio: IAgendamentosRepositorio,
  ) { }

  public async execute({
    prestador_id,
    usuario_id,
    data,
  }: IRequest): Promise<Agendamento> {
    const dataAgendamento = startOfHour(data);

    if (isBefore(dataAgendamento, Date.now())) {
      throw new AppError('Não é possível criar agendamento em data passada!');
    }

    if (usuario_id === prestador_id) {
      throw new AppError('Não é possível criar agendamento consigo mesmo');
    }

    if (getHours(dataAgendamento) < 8 || getHours(dataAgendamento) > 17) {
      throw new AppError(
        'Não é possível criar agendamento antes das 08h e depois das 17h',
      );
    }

    const buscaAgendamentoComMesmaData = await this.agendamentosRepositorio.encontrarPorData(
      dataAgendamento,
    );

    if (buscaAgendamentoComMesmaData) {
      throw new AppError('Já existe um agendamento nesta data');
    }

    const novoAgendamento = await this.agendamentosRepositorio.create({
      prestador_id,
      usuario_id,
      data: dataAgendamento,
    });

    return novoAgendamento;
  }
}

export default CriarAgendamentoService;
