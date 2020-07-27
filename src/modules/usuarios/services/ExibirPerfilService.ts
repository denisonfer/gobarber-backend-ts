import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import IUsuariosRepositorio from '@modules/usuarios/repositories/IUsuariosRepositorio';

interface IRequestDTO {
  id_usuario: string;
}

@injectable()
class ExibirPerfilService {
  constructor(
    @inject('UsuariosRepositorio')
    private usuariosRepositorio: IUsuariosRepositorio,
  ) {}

  public async execute({ id_usuario }: IRequestDTO): Promise<Usuario> {
    const usuario = await this.usuariosRepositorio.encontrarPorID(id_usuario);

    if (!usuario) {
      throw new AppError('Usuário não localizado');
    }

    return usuario;
  }
}

export default ExibirPerfilService;
