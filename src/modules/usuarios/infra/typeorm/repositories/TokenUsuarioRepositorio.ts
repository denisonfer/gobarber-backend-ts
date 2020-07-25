import { Repository, getRepository } from "typeorm";

import ITokenUsuarioRepositorio from "@modules/usuarios/repositories/ITokenUsuarioRepositorio";
import TokenUsuario from "@modules/usuarios/infra/typeorm/entities/TokenUsuario";

class TokenUsuarioRepositorio implements ITokenUsuarioRepositorio {
  private ormRepositorio: Repository<TokenUsuario>;

  constructor() {
    this.ormRepositorio = getRepository(TokenUsuario)
  }

  public async gerarToken(id_usuario: string): Promise<TokenUsuario> {
    const token = this.ormRepositorio.create({
      id_usuario
    });

    await this.ormRepositorio.save(token)

    return token;

  }

  public async encontrarPorToken(token: string): Promise<TokenUsuario | undefined> {
    const tokenUsuario = await this.ormRepositorio.findOne({
      where: { token }
    })

    return tokenUsuario;
  }

}

export default TokenUsuarioRepositorio;
