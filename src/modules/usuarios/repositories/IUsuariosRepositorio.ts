import Usuario from "../infra/typeorm/entities/Usuario";
import ICriarUsuarioDTO from "../dtos/ICriarUsuarioDTO";

export default interface IUsuariosRepositorio {
  encontrarPorEmail(email: string): Promise<Usuario | undefined>;
  encontrarPorID(id: string): Promise<Usuario | undefined>;
  create({ nome, email, senha }: ICriarUsuarioDTO): Promise<Usuario>;
  save(usuario: Usuario): Promise<Usuario>;
}
