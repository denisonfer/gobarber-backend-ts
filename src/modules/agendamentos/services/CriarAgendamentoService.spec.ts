import AppError from '@shared/errors/AppError';
import FakeNotificacoesRepositorio from '@modules/notificacoes/repositories/fakes/FakeNotificacoesRepositorio';
import FakeAgendamentosRepositorio from '../repositories/fakes/FakeAgendamentosRepositorio';
import CriarAgendamentoService from './CriarAgendamentoService';

describe('CriarAgendamento', () => {
  it('Deve ser capaz de criar um novo agendamento', async () => {
    const fakeAgendamentoRepositorio = new FakeAgendamentosRepositorio();
    const fakeNotificacoesRepositorio = new FakeNotificacoesRepositorio();
    const criarAgendamento = new CriarAgendamentoService(
      fakeAgendamentoRepositorio,
      fakeNotificacoesRepositorio,
    );
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const agendamento = await criarAgendamento.execute({
      data: new Date(2020, 4, 10, 13),
      usuario_id: '123321',
      prestador_id: '123123',
    });

    expect(agendamento).toHaveProperty('id');
    expect(agendamento.prestador_id).toBe('123123');
  });

  it('Não deve ser capaz de criar 2 agendamentos no mesmo horário', async () => {
    const fakeAgendamentoRepositorio = new FakeAgendamentosRepositorio();
    const fakeNotificacoesRepositorio = new FakeNotificacoesRepositorio();
    const criarAgendamento = new CriarAgendamentoService(
      fakeAgendamentoRepositorio,
      fakeNotificacoesRepositorio,
    );
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const dataAgendamento = new Date(2020, 4, 10, 14);

    await criarAgendamento.execute({
      data: dataAgendamento,
      usuario_id: '123321',
      prestador_id: '123123',
    });

    await expect(
      criarAgendamento.execute({
        data: dataAgendamento,
        usuario_id: '123321',
        prestador_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de criar agendamentos em datas passadas', async () => {
    const fakeAgendamentoRepositorio = new FakeAgendamentosRepositorio();
    const fakeNotificacoesRepositorio = new FakeNotificacoesRepositorio();
    const criarAgendamento = new CriarAgendamentoService(
      fakeAgendamentoRepositorio,
      fakeNotificacoesRepositorio,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      criarAgendamento.execute({
        data: new Date(2020, 4, 10, 11),
        usuario_id: '123321',
        prestador_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de criar agendamentos com o prestador logado', async () => {
    const fakeAgendamentoRepositorio = new FakeAgendamentosRepositorio();
    const fakeNotificacoesRepositorio = new FakeNotificacoesRepositorio();
    const criarAgendamento = new CriarAgendamentoService(
      fakeAgendamentoRepositorio,
      fakeNotificacoesRepositorio,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      criarAgendamento.execute({
        data: new Date(2020, 4, 10, 11),
        usuario_id: '123321',
        prestador_id: '123321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de criar agendamentos antes das 08h e depois das 17h', async () => {
    const fakeAgendamentoRepositorio = new FakeAgendamentosRepositorio();
    const fakeNotificacoesRepositorio = new FakeNotificacoesRepositorio();
    const criarAgendamento = new CriarAgendamentoService(
      fakeAgendamentoRepositorio,
      fakeNotificacoesRepositorio,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      criarAgendamento.execute({
        data: new Date(2020, 4, 10, 7),
        usuario_id: '123321',
        prestador_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      criarAgendamento.execute({
        data: new Date(2020, 4, 10, 18),
        usuario_id: '123321',
        prestador_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
