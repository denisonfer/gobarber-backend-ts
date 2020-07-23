import FakeUsuariosRepositorio from "../repositories/fakes/FakeUsuariosRepositorio";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "./AuthenticateUserService";
import CriarUsuarioService from "./CriarUsuarioService";
import AppError from "@shared/errors/AppError";

describe('AutenticarUsuario', () => {
  it('Deve ser capaz de autenticar um usuário já existente', async () => {
    const fakeUsuariosRepositorio = new FakeUsuariosRepositorio();
    const fakeHashProvider = new FakeHashProvider();
    const criarUsuario = new CriarUsuarioService(fakeUsuariosRepositorio, fakeHashProvider);
    const autenticarUsuario = new AuthenticateUserService(fakeUsuariosRepositorio, fakeHashProvider);


    const usuario = await criarUsuario.execute({
      nome: 'denison Ferreira',
      email: 'denisonTeste@gmail.com',
      senha: '123456'
    });


    const response = await autenticarUsuario.execute({
      email: 'denisonTeste@gmail.com',
      senha: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.usuario).toEqual(usuario);

  });

  it('Não deve ser capaz de autenticar um usuário que não exista', async () => {
    const fakeUsuariosRepositorio = new FakeUsuariosRepositorio();
    const fakeHashProvider = new FakeHashProvider();
    const autenticarUsuario = new AuthenticateUserService(fakeUsuariosRepositorio, fakeHashProvider);


    expect(autenticarUsuario.execute({
      email: 'denisonTeste@gmail.com',
      senha: '123456',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('Não deve ser capaz de autenticar um usuário com senha incorreta', async () => {
    const fakeUsuariosRepositorio = new FakeUsuariosRepositorio();
    const fakeHashProvider = new FakeHashProvider();
    const criarUsuario = new CriarUsuarioService(fakeUsuariosRepositorio, fakeHashProvider);
    const autenticarUsuario = new AuthenticateUserService(fakeUsuariosRepositorio, fakeHashProvider);


    await criarUsuario.execute({
      nome: 'denison Ferreira',
      email: 'denisonTeste@gmail.com',
      senha: '123456'
    });

    expect(autenticarUsuario.execute({
      email: 'denisonTeste@gmail.com',
      senha: '1234567',
    })).rejects.toBeInstanceOf(AppError);

  });


})
