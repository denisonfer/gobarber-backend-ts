import { getRepository, Repository } from "typeorm";

import Usuario from "../entities/Usuario";

import ICriarUsuarioDTO from "@modules/usuarios/dtos/ICriarUsuarioDTO";
import IUsuariosRepositorio from "@modules/usuarios/repositories/IUsuariosRepositorio";


class UsuariosRepositorio implements IUsuariosRepositorio {
  private ormRepositorio: Repository<Usuario>;

  constructor() {
    this.ormRepositorio = getRepository(Usuario)
  }

  public async encontrarPorID(id: string): Promise<Usuario | undefined> {
    const usuario = await this.ormRepositorio.findOne(id)

    return usuario;
  }

  public async encontrarPorEmail(email: string): Promise<Usuario | undefined> {
    const usuario = await this.ormRepositorio.findOne({ where: { email } })

    return usuario;
  }

  public async create({ nome, email, senha }: ICriarUsuarioDTO): Promise<Usuario> {

    const novoUsuario = this.ormRepositorio.create({
      nome, email, senha
    })

    return novoUsuario;
  }

  public async save(usuario: Usuario): Promise<Usuario> {
    return this.ormRepositorio.save(usuario)
  }



}

export default UsuariosRepositorio;
