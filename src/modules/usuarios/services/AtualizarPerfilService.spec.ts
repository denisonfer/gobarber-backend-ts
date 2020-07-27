import AppError from '@shared/errors/AppError';
import FakeUsuarioRepositorio from '../repositories/fakes/FakeUsuariosRepositorio';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AtualizarPerfilService from './AtualizarPerfilService';

let fakeUsuarioRepositorio: FakeUsuarioRepositorio;
let fakeHashProvider: FakeHashProvider;
let atualizarPerfil: AtualizarPerfilService;

describe('AtualizarPerfil', () => {
  beforeEach(() => {
    fakeUsuarioRepositorio = new FakeUsuarioRepositorio();
    fakeHashProvider = new FakeHashProvider();

    atualizarPerfil = new AtualizarPerfilService(
      fakeUsuarioRepositorio,
      fakeHashProvider,
    );
  });

  it('Deve ser capaz de atualizar o perfil', async () => {
    const usuario = await fakeUsuarioRepositorio.create({
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: '123456789',
    });

    const usuarioAtualizado = await atualizarPerfil.execute({
      id_usuario: usuario.id,
      nome: 'Fulano Editado',
      email: 'fulanoEditado@gmail.com',
    });

    expect(usuarioAtualizado.nome).toBe('Fulano Editado');
    expect(usuarioAtualizado.email).toBe('fulanoEditado@gmail.com');
  });

  it('Não deve ser capaz de atualizar o perfil, de um usuário inexistente', async () => {
    await expect(
      atualizarPerfil.execute({
        id_usuario: 'não tem',
        nome: 'Fulano Editado',
        email: 'fulanoEditado@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar o email, se o mesmo já estiver sendo ultilizado ', async () => {
    await fakeUsuarioRepositorio.create({
      nome: 'Sicrano',
      email: 'sicrano@gmail.com',
      senha: '123456789',
    });
    const usuario = await fakeUsuarioRepositorio.create({
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: '123456789',
    });

    await expect(
      atualizarPerfil.execute({
        id_usuario: usuario.id,
        nome: 'Fulano Editado',
        email: 'sicrano@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Deve ser capaz de atualizar sua senha', async () => {
    const usuario = await fakeUsuarioRepositorio.create({
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: '123456',
    });

    const usuarioAtualizado = await atualizarPerfil.execute({
      id_usuario: usuario.id,
      nome: 'Fulano Editado',
      email: 'fulanoEditado@gmail.com',
      senha_antiga: '123456',
      senha: '123123',
    });

    expect(usuarioAtualizado.senha).toBe('123123');
  });

  it('Não deve ser capaz de atualizar sua senha, sem informar senha antiga', async () => {
    const usuario = await fakeUsuarioRepositorio.create({
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: '123456789',
    });

    await expect(
      atualizarPerfil.execute({
        id_usuario: usuario.id,
        nome: 'Fulano Editado',
        email: 'fulanoEditado@gmail.com',
        senha: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar sua senha, com senha antiga incorreta', async () => {
    const usuario = await fakeUsuarioRepositorio.create({
      nome: 'Fulano',
      email: 'fulano@gmail.com',
      senha: '123456789',
    });

    await expect(
      atualizarPerfil.execute({
        id_usuario: usuario.id,
        nome: 'Fulano Editado',
        email: 'fulanoEditado@gmail.com',
        senha_antiga: '12345',
        senha: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
