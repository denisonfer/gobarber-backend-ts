import { Router } from 'express';

import EsqueciSenhaController from '../controllers/EsqueciSenhaControllers';
import ResetarSenhacontroller from '../controllers/ResetarSenhaControllers';

const senhaRotas = Router();
const esqueciSenhaController = new EsqueciSenhaController();
const resetarSenhaController = new ResetarSenhacontroller();

senhaRotas.post('/esqueci', esqueciSenhaController.create);
senhaRotas.post('/resetar', resetarSenhaController.create);

export default senhaRotas;
