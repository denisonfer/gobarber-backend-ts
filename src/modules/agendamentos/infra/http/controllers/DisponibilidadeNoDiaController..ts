import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListarDiaDisponivelPrestadorService from '@modules/agendamentos/services/ListarDiaDisponivelPrestadorService';

class DisponibilidadeNoDiaController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { dia, mes, ano } = req.body;

    const listarController = container.resolve(
      ListarDiaDisponivelPrestadorService,
    );

    const disponibilidade = await listarController.execute({
      id_usuario: req.params.id_prestador,
      dia,
      mes,
      ano,
    });

    return res.json(disponibilidade);
  }
}

export default DisponibilidadeNoDiaController;
