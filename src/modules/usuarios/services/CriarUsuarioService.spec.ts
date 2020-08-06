import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsuariosRepositorio from '../repositories/fakes/FakeUsuariosRepositorio';
import CriarUsuarioService from './CriarUsuarioService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CriarUsuario', () => {
  it('Deve ser capaz de criar um novo usuário', async () => {
    const fakeUsuarioRepositorio = new FakeUsuariosRepositorio();
    const fakeHashProvider = new FakeHashProvider();
    const fakeCacheProvider = new FakeCacheProvider();
    const criarUsuario = new CriarUsuarioService(
      fakeUsuarioRepositorio,
      fakeHashProvider,
      fakeCacheProvider,
    );

    const usuario = await criarUsuario.execute({
      nome: 'denison Ferreira',
      email: 'denisonTeste@gmail.com',
      senha: '123456',
    });

    expect(usuario).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar um novo usuário com email já existente', async () => {
    const fakeUsuarioRepositorio = new FakeUsuariosRepositorio();
    const fakeCacheProvider = new FakeCacheProvider();
    const fakeHashProvider = new FakeHashProvider();
    const criarUsuario = new CriarUsuarioService(
      fakeUsuarioRepositorio,
      fakeHashProvider,
      fakeCacheProvider,
    );

    await criarUsuario.execute({
      nome: 'denison Ferreira',
      email: 'denisonTeste@gmail.com',
      senha: '123456',
    });

    expect(
      criarUsuario.execute({
        nome: 'denison Ferreira',
        email: 'denisonTeste@gmail.com',
        senha: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
