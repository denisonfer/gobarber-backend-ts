import AppError from '@shared/errors/AppError';
import FakeUsuarioRepositorio from '../repositories/fakes/FakeUsuariosRepositorio';
import ExibirPerfilService from './ExibirPerfilService';

let fakeUsuarioRepositorio: FakeUsuarioRepositorio;
let exibirPerfilService: ExibirPerfilService;

describe('AtualizarPerfil', () => {
  beforeEach(() => {
    fakeUsuarioRepositorio = new FakeUsuarioRepositorio();
    exibirPerfilService = new ExibirPerfilService(fakeUsuarioRepositorio);
  });

  it('Deve ser capaz de exibir o perfil', async () => {
    const usuario = await fakeUsuarioRepositorio.create({
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: '123456789',
    });

    const perfil = await exibirPerfilService.execute({
      id_usuario: usuario.id,
    });

    expect(perfil.nome).toBe('Fulano');
    expect(perfil.email).toBe('fulano@gmail.com');
  });

  it('Não deve ser capaz de exibir o perfil, de um usuário inexistente', async () => {
    await fakeUsuarioRepositorio.create({
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: '123456789',
    });

    await expect(
      exibirPerfilService.execute({
        id_usuario: 'eita não tem',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
