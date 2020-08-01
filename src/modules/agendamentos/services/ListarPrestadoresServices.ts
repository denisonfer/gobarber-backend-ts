import { injectable, inject } from 'tsyringe';

import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import IUsuariosRepositorio from '@modules/usuarios/repositories/IUsuariosRepositorio';

interface IRequestDTO {
  id_usuario: string;
}

@injectable()
class ListarPrestadoresService {
  constructor(
    @inject('UsuariosRepositorio')
    private usuariosRepositorio: IUsuariosRepositorio,
  ) { }

  public async execute({ id_usuario }: IRequestDTO): Promise<Usuario[]> {
    const usuario = await this.usuariosRepositorio.encontrarTodosPrestadores({
      id_except: id_usuario
    });

    return usuario;
  }
}

export default ListarPrestadoresService;
