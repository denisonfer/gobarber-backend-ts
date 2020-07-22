import { Request, Response } from "express";
import { parseISO } from 'date-fns';
import { container } from "tsyringe";

import CriarAgendamentoService from '@modules/agendamentos/services/CriarAgendamentoService';

export default class AgendamentosControllers {

  /*  public async show(req: Request, res: Response): Promise<Response>{

     const agendamentos = await agendamentosRepositorio.find();

     return res.json(agendamentos);
   } */

  public async create(req: Request, res: Response): Promise<Response> {
    const { prestador_id, data } = req.body;

    const parsedDate = parseISO(data);

    const criarAgendamento = container.resolve(CriarAgendamentoService);

    const novoAgendamento = await criarAgendamento.execute({
      data: parsedDate,
      prestador_id,
    });

    return res.json(novoAgendamento);
  }
}

