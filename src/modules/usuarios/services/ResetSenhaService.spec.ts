import AppError from '@shared/errors/AppError';

import FakeUsuarioRepositorio from '../repositories/fakes/FakeUsuariosRepositorio'
import FakeTokenUsuarioRepositorio from '../repositories/fakes/FakeTokenUsuarioRepositorio';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import ResetSenhaService from './ResetSenhaService';

let fakeUsuarioRepositorio: FakeUsuarioRepositorio;
let fakeTokenUsuarioRepositorio: FakeTokenUsuarioRepositorio;
let fakeHashProvider: FakeHashProvider;
let resetSenhaService: ResetSenhaService;

describe('ResetarSenha', () => {
  beforeEach(() => {
    fakeUsuarioRepositorio = new FakeUsuarioRepositorio();
    fakeTokenUsuarioRepositorio = new FakeTokenUsuarioRepositorio()
    fakeHashProvider = new FakeHashProvider();

    resetSenhaService = new ResetSenhaService(
      fakeUsuarioRepositorio,
      fakeTokenUsuarioRepositorio,
      fakeHashProvider);
  });

  it('Deve ser capaz de resetar senha do usuário', async () => {

    const usuario = await fakeUsuarioRepositorio.create({
      nome: 'Denison',
      email: 'denison@gmail.com',
      senha: '123456'
    });

    const { token } = await fakeTokenUsuarioRepositorio.gerarToken(usuario.id)

    const gerarHash = jest.spyOn(fakeHashProvider, 'gerarHash');

    await resetSenhaService.execute({
      token,
      senha: '123123'
    });


    const usuarioAtualizado = await fakeUsuarioRepositorio.encontrarPorID(usuario.id);

    expect(gerarHash).toHaveBeenCalledWith('123123');
    expect(usuarioAtualizado?.senha).toBe('123123');
  });

  it('Não deve ser capaz de resetar senha, se não existir token', async () => {

    await expect(resetSenhaService.execute({
      token: 'null',
      senha: '123456'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('Não deve ser capaz de resetar senha, se não existir usuário', async () => {
    const { token } = await fakeTokenUsuarioRepositorio.gerarToken('null');

    await expect(resetSenhaService.execute({
      token,
      senha: '123456'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('Não deve ser capaz de resetar senha, após 2h da solicitação', async () => {
    const usuario = await fakeUsuarioRepositorio.create({
      nome: 'Denison',
      email: 'denison@gmail.com',
      senha: '123456'
    });

    const { token } = await fakeTokenUsuarioRepositorio.gerarToken(usuario.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customData = new Date();

      return customData.setHours(customData.getHours() + 3);
    });

    await expect(resetSenhaService.execute({
      token,
      senha: '123123'
    })).rejects.toBeInstanceOf(AppError)
  });

})
