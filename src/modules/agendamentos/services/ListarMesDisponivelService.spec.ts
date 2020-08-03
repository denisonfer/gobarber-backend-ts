import AppError from '@shared/errors/AppError';
import FakeAgendamentosRepositorio from '../repositories/fakes/FakeAgendamentosRepositorio';
import ListarMesDisponivelService from './ListarMesDisponivelService';

let fakeAgendamentosRepositorio: FakeAgendamentosRepositorio;
let listarMesDiponivel: ListarMesDisponivelService;

describe('ListarMesDisponivel', () => {
  beforeEach(() => {
    fakeAgendamentosRepositorio = new FakeAgendamentosRepositorio();
    listarMesDiponivel = new ListarMesDisponivelService(
      fakeAgendamentosRepositorio,
    );
  });

  it('Deve ser capaz de exibir os prestadores disponiveis no mes', async () => {
    await fakeAgendamentosRepositorio.create({
      prestador_id: 'usuario',
      usuario_id: 'usuario',
      data: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAgendamentosRepositorio.create({
      prestador_id: 'usuario',
      usuario_id: 'usuario',
      data: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeAgendamentosRepositorio.create({
      prestador_id: 'usuario',
      usuario_id: 'usuario',
      data: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAgendamentosRepositorio.create({
      prestador_id: 'usuario',
      usuario_id: 'usuario',
      data: new Date(2020, 4, 20, 11, 0, 0),
    });

    await fakeAgendamentosRepositorio.create({
      prestador_id: 'usuario',
      usuario_id: 'usuario',
      data: new Date(2020, 4, 20, 12, 0, 0),
    });

    await fakeAgendamentosRepositorio.create({
      prestador_id: 'usuario',
      usuario_id: 'usuario',
      data: new Date(2020, 4, 20, 13, 0, 0),
    });

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

    await fakeAgendamentosRepositorio.create({
      prestador_id: 'usuario',
      usuario_id: 'usuario',
      data: new Date(2020, 4, 20, 16, 0, 0),
    });

    await fakeAgendamentosRepositorio.create({
      prestador_id: 'usuario',
      usuario_id: 'usuario',
      data: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAgendamentosRepositorio.create({
      prestador_id: 'usuario',
      usuario_id: 'usuario',
      data: new Date(2020, 4, 21, 8, 0, 0),
    });

    const disponivel = await listarMesDiponivel.execute({
      id_usuario: 'usuario',
      ano: 2020,
      mes: 5,
    });

    expect(disponivel).toEqual(
      expect.arrayContaining([
        { dia: 19, disponivel: true },
        { dia: 20, disponivel: false },
        { dia: 21, disponivel: true },
        { dia: 22, disponivel: true },
      ]),
    );
  });
});
