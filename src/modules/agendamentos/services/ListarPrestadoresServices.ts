import { injectable, inject } from 'tsyringe';

import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import IUsuariosRepositorio from '@modules/usuarios/repositories/IUsuariosRepositorio';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequestDTO {
  id_usuario: string;
}

@injectable()
class ListarPrestadoresService {
  constructor(
    @inject('UsuariosRepositorio')
    private usuariosRepositorio: IUsuariosRepositorio,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ id_usuario }: IRequestDTO): Promise<Usuario[]> {
    let usuarios = await this.cacheProvider.buscar<Usuario[]>(
      `lista-prestadores:${id_usuario}`,
    );

    if (!usuarios) {
      usuarios = await this.usuariosRepositorio.encontrarTodosPrestadores({
        id_except: id_usuario,
      });

      console.log('A query no banco foi feita!');

      await this.cacheProvider.salvar(
        `lista-prestadores:${id_usuario}`,
        usuarios,
      );
    }

    return usuarios;
  }
}

export default ListarPrestadoresService;
