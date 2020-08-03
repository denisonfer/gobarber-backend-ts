import FakeAgendamentosRepositorio from '../repositories/fakes/FakeAgendamentosRepositorio';
import ListarDiaDisponivelPrestadorService from './ListarDiaDisponivelPrestadorService';

let fakeAgendamentosRepositorio: FakeAgendamentosRepositorio;
let listarDisponibilidadeNoDia: ListarDiaDisponivelPrestadorService;

describe('ListarDisponibilidadeNoDia', () => {
  beforeEach(() => {
    fakeAgendamentosRepositorio = new FakeAgendamentosRepositorio();
    listarDisponibilidadeNoDia = new ListarDiaDisponivelPrestadorService(
      fakeAgendamentosRepositorio,
    );
  });

  it('Deve ser capaz de exibir os horas disponiveis no dia', async () => {
    await fakeAgendamentosRepositorio.create({
      prestador_id: 'usuario',
      usuario_id: 'usuario',
      data: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAgendamentosRepositorio.create({
      prestador_id: 'usuario',
      usuario_id: 'usuario',
      data: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const disponibilidadeNoDia = await listarDisponibilidadeNoDia.execute({
      id_usuario: 'usuario',
      dia: 20,
      mes: 5,
      ano: 2020,
    });

    expect(disponibilidadeNoDia).toEqual(
      expect.arrayContaining([
        { hora: 8, disponivel: false },
        { hora: 9, disponivel: false },
        { hora: 10, disponivel: false },
        { hora: 13, disponivel: true },
        { hora: 14, disponivel: false },
        { hora: 15, disponivel: false },
        { hora: 16, disponivel: true },
      ]),
    );
  });
});
