import FakeUsuariosRepositorio from '../repositories/fakes/FakeUsuariosRepositorio';
import CriarUsuarioService from "../services/CriarUsuarioService";
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CriarUsuario', () => {
  it('Deve ser capaz de criar um novo usuário', async () => {
    const fakeUsuarioRepositorio = new FakeUsuariosRepositorio();
    const fakeHashProvider = new FakeHashProvider();
    const criarUsuario = new CriarUsuarioService(fakeUsuarioRepositorio, fakeHashProvider);

    const usuario = await criarUsuario.execute({
      nome: 'denison Ferreira',
      email: 'denisonTeste@gmail.com',
      senha: '123456'
    });

    expect(usuario).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar um novo usuário com email já existente', async () => {
    const fakeUsuarioRepositorio = new FakeUsuariosRepositorio();
    const fakeHashProvider = new FakeHashProvider();
    const criarUsuario = new CriarUsuarioService(fakeUsuarioRepositorio, fakeHashProvider);

    await criarUsuario.execute({
      nome: 'denison Ferreira',
      email: 'denisonTeste@gmail.com',
      senha: '123456'
    });

    expect(criarUsuario.execute({
      nome: 'denison Ferreira',
      email: 'denisonTeste@gmail.com',
      senha: '123456'
    })).rejects.toBeInstanceOf(AppError);
  })

})
