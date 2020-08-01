import Usuario from "../infra/typeorm/entities/Usuario";
import ICriarUsuarioDTO from "../dtos/ICriarUsuarioDTO";
import IEncontrarTodosPrestadoresDTO from "../dtos/IEncontrarTodosPrestadoresDTO";

export default interface IUsuariosRepositorio {
  encontrarTodosPrestadores(data: IEncontrarTodosPrestadoresDTO): Promise<Usuario[]>;
  encontrarPorEmail(email: string): Promise<Usuario | undefined>;
  encontrarPorID(id: string): Promise<Usuario | undefined>;
  create({ nome, email, senha }: ICriarUsuarioDTO): Promise<Usuario>;
  save(usuario: Usuario): Promise<Usuario>;
}
