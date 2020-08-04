import FakeAgendamentosRepositorio from '../repositories/fakes/FakeAgendamentosRepositorio';
import ListarAgendamentosDoPrestadorService from './ListarAgendamentosDoPrestadorService';

let fakeAgendamentosRepositorio: FakeAgendamentosRepositorio;
let listarAgendamentosDoPrestador: ListarAgendamentosDoPrestadorService;

describe('ListarAgendamentosPrestador', () => {
  beforeEach(() => {
    fakeAgendamentosRepositorio = new FakeAgendamentosRepositorio();
    listarAgendamentosDoPrestador = new ListarAgendamentosDoPrestadorService(
      fakeAgendamentosRepositorio,
    );
  });

  it('Deve ser capaz de exibir os agendamentos do dia do prestador', async () => {
    const agendamento1 = await fakeAgendamentosRepositorio.create({
      prestador_id: 'prestador',
      usuario_id: 'usuario',
      data: new Date(2020, 4, 20, 14, 0, 0),
    });

    const agendamento2 = await fakeAgendamentosRepositorio.create({
      prestador_id: 'prestador',
      usuario_id: 'usuario',
      data: new Date(2020, 4, 20, 15, 0, 0),
    });

    const agendamentos = await listarAgendamentosDoPrestador.execute({
      prestador_id: 'prestador',
      dia: 20,
      mes: 5,
      ano: 2020,
    });

    expect(agendamentos).toEqual([agendamento1, agendamento2]);
  });
});
