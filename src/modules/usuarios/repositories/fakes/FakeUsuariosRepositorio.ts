import { uuid } from "uuidv4";

import ICriarUsuarioDTO from "@modules/usuarios/dtos/ICriarUsuarioDTO";
import IUsuariosRepositorio from "@modules/usuarios/repositories/IUsuariosRepositorio";
import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import IEncontrarTodosPrestadoresDTO from "@modules/usuarios/dtos/IEncontrarTodosPrestadoresDTO";


class FakeUsuariosRepositorio implements IUsuariosRepositorio {
  private usuarios: Usuario[] = []

  public async encontrarTodosPrestadores({ id_except }: IEncontrarTodosPrestadoresDTO): Promise<Usuario[]> {
    let usuarios = this.usuarios

    if (id_except) {
      usuarios = this.usuarios.filter(usuario => usuario.id !== id_except)
    }

    return usuarios

  }


  public async encontrarPorID(id: string): Promise<Usuario | undefined> {
    const usuario = this.usuarios.find(usuario => usuario.id === id);

    return usuario

  }

  public async encontrarPorEmail(email: string): Promise<Usuario | undefined> {
    const usuario = this.usuarios.find(usuario => usuario.email === email);

    return usuario
  }

  public async create({ nome, email, senha }: ICriarUsuarioDTO): Promise<Usuario> {
    const usuario = new Usuario();

    Object.assign(usuario, { id: uuid(), nome, email, senha });

    this.usuarios.push(usuario);

    return usuario;

  }

  public async save(usuario: Usuario): Promise<Usuario> {
    const index = this.usuarios.findIndex(item => item.id === usuario.id);

    this.usuarios[index] = usuario;

    return usuario;
  }



}

export default FakeUsuariosRepositorio;
