import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListarMesDisponivelService from '@modules/agendamentos/services/ListarMesDisponivelService';

class DisponibilidadeNoMesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { mes, ano } = req.body;

    const listarDisponibilidadeNoMes = container.resolve(
      ListarMesDisponivelService,
    );

    const disponibilidade = await listarDisponibilidadeNoMes.execute({
      id_usuario: req.params.id_prestador,
      mes,
      ano,
    });

    return res.json(disponibilidade);
  }
}

export default DisponibilidadeNoMesController;
