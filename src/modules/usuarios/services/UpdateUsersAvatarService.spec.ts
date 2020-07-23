import FakeUsuariosRepositorio from '../repositories/fakes/FakeUsuariosRepositorio';

import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/storageProviders/fakes/FakeStorageAvatar';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('AtualizarAvatar', () => {
  it('Deve ser capaz de atualizar o avatar do usuário', async () => {
    const fakeUsuarioRepositorio = new FakeUsuariosRepositorio();
    const fakeStorageProvider = new FakeStorageProvider()
    const updateAvatar = new UpdateUserAvatarService(fakeUsuarioRepositorio, fakeStorageProvider)

    const usuario = await fakeUsuarioRepositorio.create({
      nome: 'Denison Ferreira',
      email: 'denison@gmail.com',
      senha: '123456'
    })

    await updateAvatar.execute({
      usuario_id: usuario.id,
      avatarFilename: 'avatar.jpg'
    });

    expect(usuario.avatar).toBe('avatar.jpg');
  });

  it('Não deve ser capaz de atualizar o avatar de um usuário inexistente', async () => {
    const fakeUsuarioRepositorio = new FakeUsuariosRepositorio();
    const fakeStorageProvider = new FakeStorageProvider()
    const updateAvatar = new UpdateUserAvatarService(fakeUsuarioRepositorio, fakeStorageProvider)


    expect(updateAvatar.execute({
      usuario_id: 'sem-usuario',
      avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Deve ser capaz de sobrescrever um avatar do usuário', async () => {
    const fakeUsuarioRepositorio = new FakeUsuariosRepositorio();
    const fakeStorageProvider = new FakeStorageProvider();
    const deletarArquivo = jest.spyOn(fakeStorageProvider, 'deletarArquivo')
    const updateAvatar = new UpdateUserAvatarService(fakeUsuarioRepositorio, fakeStorageProvider)

    const usuario = await fakeUsuarioRepositorio.create({
      nome: 'Denison Ferreira',
      email: 'denison@gmail.com',
      senha: '123456'
    })

    await updateAvatar.execute({
      usuario_id: usuario.id,
      avatarFilename: 'avatar.jpg'
    });

    await updateAvatar.execute({
      usuario_id: usuario.id,
      avatarFilename: 'avatar2.jpg'
    });

    expect(deletarArquivo).toHaveBeenCalledWith('avatar.jpg')
    expect(usuario.avatar).toBe('avatar2.jpg');
  });




})
