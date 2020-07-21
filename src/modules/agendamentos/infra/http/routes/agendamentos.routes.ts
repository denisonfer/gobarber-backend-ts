import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AgendamentosRepositorio from '@modules/agendamentos/repositories/AgendamentosRepositorio';
import CriarAgendamentoService from '@modules/agendamentos/services/CriarAgendamentoService';

import ensureAuthenticaded from '@modules/usuarios/infra/http/middlewares/ensureAuthenticaded';

const agendamentosRotas = Router();

agendamentosRotas.use(ensureAuthenticaded);

agendamentosRotas.get('/', async (req, res) => {
  const agendamentosRepositorio = getCustomRepository(AgendamentosRepositorio);

  const agendamentos = await agendamentosRepositorio.find();

  return res.json(agendamentos);
});

agendamentosRotas.post('/', async (req, res) => {
  const { prestador_id, data } = req.body;

  const parsedDate = parseISO(data);

  const criarAgendamento = new CriarAgendamentoService();

  const novoAgendamento = await criarAgendamento.execute({
    data: parsedDate,
    prestador_id,
  });

  return res.json(novoAgendamento);
});

export default agendamentosRotas;
