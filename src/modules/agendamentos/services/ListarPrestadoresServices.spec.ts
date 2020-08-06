import FakeUsuariosRepositorio from '@modules/usuarios/repositories/fakes/FakeUsuariosRepositorio';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListarPrestadoresService from './ListarPrestadoresServices';

let fakeUsuarioRepositorio: FakeUsuariosRepositorio;
let fakeCacheProvider: FakeCacheProvider;
let listarPrestores: ListarPrestadoresService;

describe('AtualizarPerfil', () => {
  beforeEach(() => {
    fakeUsuarioRepositorio = new FakeUsuariosRepositorio();
    fakeCacheProvider = new FakeCacheProvider();
    listarPrestores = new ListarPrestadoresService(
      fakeUsuarioRepositorio,
      fakeCacheProvider,
    );
  });

  it('Deve ser capaz de exibir todos os prestadores', async () => {
    const usuario1 = await fakeUsuarioRepositorio.create({
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: '123456789',
    });

    const usuario2 = await fakeUsuarioRepositorio.create({
      nome: 'Sicrano',
      email: 'sicrano@gmail.com',
      senha: '123456789',
    });

    const usuarioLogado = await fakeUsuarioRepositorio.create({
      nome: 'Beltrano',
      email: 'bbeltrano@gmail.com',
      senha: '123456789',
    });

    const prestadores = await listarPrestores.execute({
      id_usuario: usuarioLogado.id,
    });

    expect(prestadores).toEqual([usuario1, usuario2]);
  });
});
