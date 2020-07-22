import FakeAgendamentosRepositorio from "../repositories/fakes/FakeAgendamentosRepositorio";
import CriarAgendamentoService from "./CriarAgendamentoService";
import AppError from "@shared/errors/AppError";

describe('CriarAgendamento', () => {
  it('Deve ser capaz de criar um novo agendamento', async () => {
    const fakeAgendamentoRepositorio = new FakeAgendamentosRepositorio();
    const criarAgendamento = new CriarAgendamentoService(fakeAgendamentoRepositorio);

    const agendamento = await criarAgendamento.execute({
      data: new Date(),
      prestador_id: '123123'
    });

    expect(agendamento).toHaveProperty('id');
    expect(agendamento.prestador_id).toBe('123123');
  });

  it('Não deve ser capaz de criar 2 agendamentos no mesmo horário', async () => {
    const fakeAgendamentoRepositorio = new FakeAgendamentosRepositorio();
    const criarAgendamento = new CriarAgendamentoService(fakeAgendamentoRepositorio);

    const dataAgendamento = new Date(2020, 4, 10, 11);

    await criarAgendamento.execute({
      data: dataAgendamento,
      prestador_id: '123123'
    });

    expect(criarAgendamento.execute({
      data: dataAgendamento,
      prestador_id: '123123'
    })).rejects.toBeInstanceOf(AppError)

  })
})
