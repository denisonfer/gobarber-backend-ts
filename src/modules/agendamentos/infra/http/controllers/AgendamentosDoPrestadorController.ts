import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListarAgendamentosDoPrestadorService from '@modules/agendamentos/services/ListarAgendamentosDoPrestadorService';

export default class AgendamentosDoPrestadorController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { dia, mes, ano } = req.body;

    const listarAgendamentosDoPrestador = container.resolve(
      ListarAgendamentosDoPrestadorService,
    );

    const agendamentos = await listarAgendamentosDoPrestador.execute({
      prestador_id: req.usuario.id,
      dia,
      mes,
      ano,
    });

    return res.json(agendamentos);
  }
}
