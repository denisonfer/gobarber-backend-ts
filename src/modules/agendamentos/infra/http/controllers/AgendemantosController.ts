import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CriarAgendamentoService from '@modules/agendamentos/services/CriarAgendamentoService';

export default class AgendamentosControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const { prestador_id, data } = req.body;

    const criarAgendamento = container.resolve(CriarAgendamentoService);

    const novoAgendamento = await criarAgendamento.execute({
      data,
      usuario_id: req.usuario.id,
      prestador_id,
    });

    return res.json(novoAgendamento);
  }
}
