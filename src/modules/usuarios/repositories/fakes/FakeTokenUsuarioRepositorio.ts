import { uuid } from "uuidv4";

import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import ITokenUsuarioRepositorio from "../ITokenUsuarioRepositorio";
import TokenUsuario from "@modules/usuarios/infra/typeorm/entities/TokenUsuario";


class FakeTokenUsuarioRepositorio implements ITokenUsuarioRepositorio {
  private tokensUsuarios: TokenUsuario[] = []

  public async gerarToken(id_usuario: string): Promise<TokenUsuario> {
    const tokenUsuario = new TokenUsuario();

    Object.assign(tokenUsuario, {
      id: uuid(), token: uuid(),
      id_usuario,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.tokensUsuarios.push(tokenUsuario)

    return tokenUsuario

  }

  public async encontrarPorToken(token: string): Promise<TokenUsuario | undefined> {
    const tokenUsuario = this.tokensUsuarios.find(buscaToken => buscaToken.token === token)

    return tokenUsuario;
  }

}

export default FakeTokenUsuarioRepositorio;
