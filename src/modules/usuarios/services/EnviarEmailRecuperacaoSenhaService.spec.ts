import FakeUsuarioRepositorio from '../repositories/fakes/FakeUsuariosRepositorio'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

import EnviarEmailRecuperacaoSenhaService from './EnviarEmailRecuperacaoSenhaService';
import FakeTokenUsuarioRepositorio from '../repositories/fakes/FakeTokenUsuarioRepositorio';

let fakeUsuarioRepositorio: FakeUsuarioRepositorio;
let fakeMailProvider: FakeMailProvider;
let fakeTokenUsuarioRepositorio: FakeTokenUsuarioRepositorio;
let enviarEmailRecuperacaoSenha: EnviarEmailRecuperacaoSenhaService;

describe('EnviarEmailRecuperacaoSenha', () => {
  beforeEach(() => {
    fakeUsuarioRepositorio = new FakeUsuarioRepositorio();
    fakeMailProvider = new FakeMailProvider();
    fakeTokenUsuarioRepositorio = new FakeTokenUsuarioRepositorio()
    enviarEmailRecuperacaoSenha = new EnviarEmailRecuperacaoSenhaService(fakeUsuarioRepositorio, fakeMailProvider, fakeTokenUsuarioRepositorio);

  });

  it('Deve ser capaz de recuperar a senha ultilizando um email', async () => {
    const enviarEmail = jest.spyOn(fakeMailProvider, 'enviarEmail')

    await fakeUsuarioRepositorio.create({
      nome: 'Denison',
      email: 'denison@gmail.com',
      senha: '123456'
    })

    await enviarEmailRecuperacaoSenha.execute({
      email: 'denison@gmail.com'
    });

    expect(enviarEmail).toHaveBeenCalled()
  });

  it('Não deve ser capaz de recuperar a senha de um usuário que não existe', async () => {
    expect(enviarEmailRecuperacaoSenha.execute({
      email: 'denison@gmail.com'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('Deve ser capaz de gerar um token de usuário', async () => {
    const gerarToken = jest.spyOn(fakeTokenUsuarioRepositorio, 'gerarToken');

    const usuario = await fakeUsuarioRepositorio.create({
      nome: 'Denison',
      email: 'denison@gmail.com',
      senha: '123456'
    })

    await enviarEmailRecuperacaoSenha.execute({
      email: 'denison@gmail.com'
    });

    expect(gerarToken).toHaveBeenCalledWith(usuario.id)
  });


})
