import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListarPrestadoresService from '@modules/agendamentos/services/ListarPrestadoresServices';

class PrestadoresController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listarPrestadores = container.resolve(ListarPrestadoresService);

    const prestadores = await listarPrestadores.execute({
      id_usuario: req.usuario.id,
    });

    return res.json(prestadores);
  }
}

export default PrestadoresController;
