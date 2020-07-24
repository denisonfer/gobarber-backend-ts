import TokenUsuario from "../infra/typeorm/entities/TokenUsuario";

export default interface ITokenUsuarioRepositorio {
  gerarToken(id_usuario: string): Promise<TokenUsuario>;
  encontrarPorToken(token: string): Promise<TokenUsuario | undefined>;
}
