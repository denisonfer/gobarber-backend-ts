import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAgendamentosRepositorio from '@modules/agendamentos/repositories/IAgendamentosRepositorio';
import ICriarAgendamentoDTO from '@modules/agendamentos/dtos/ICriarAgendamentoDTO';
import Agendamento from '@modules/agendamentos/infra/typeorm/entities/Agendamento';
import IEncontrarDisponibilidadeNoMesDTO from '@modules/agendamentos/dtos/IEncontrarDisponibilidadeNoMesDTO';
import IEncontrarDisponibilidadeNoDiaDTO from '@modules/agendamentos/dtos/IEncontrarDisponibilidadeNoDiaDTO';

class FakeAgendamentosRepository implements IAgendamentosRepositorio {
  private agendamentos: Agendamento[] = [];

  public async create({
    prestador_id,
    usuario_id,
    data,
  }: ICriarAgendamentoDTO): Promise<Agendamento> {
    const agendamento = new Agendamento();

    Object.assign(agendamento, { id: uuid(), prestador_id, usuario_id, data });

    this.agendamentos.push(agendamento);

    return agendamento;
  }

  public async encontrarPorData(data: Date): Promise<Agendamento | undefined> {
    const buscarAgendamento = this.agendamentos.find(agendamento =>
      isEqual(agendamento.data, data),
    );

    return buscarAgendamento;
  }

  public async encontrarDisponibilidadeNoDia({
    id_prestador,
    dia,
    mes,
    ano,
  }: IEncontrarDisponibilidadeNoDiaDTO): Promise<Agendamento[]> {
    const buscarAgendamento = this.agendamentos.filter(
      agendamento =>
        agendamento.prestador_id === id_prestador &&
        getDate(agendamento.data) === dia &&
        getMonth(agendamento.data) + 1 === mes &&
        getYear(agendamento.data) === ano,
    );

    return buscarAgendamento;
  }

  public async encontrarDisponibilidadeNoMes({
    id_prestador,
    mes,
    ano,
  }: IEncontrarDisponibilidadeNoMesDTO): Promise<Agendamento[]> {
    const buscarAgendamento = this.agendamentos.filter(
      agendamento =>
        agendamento.prestador_id === id_prestador &&
        getMonth(agendamento.data) + 1 === mes &&
        getYear(agendamento.data) === ano,
    );

    return buscarAgendamento;
  }
}

export default FakeAgendamentosRepository;
