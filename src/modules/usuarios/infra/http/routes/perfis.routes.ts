import { Router } from 'express';

import PerfilController from '../controllers/PerfilController';
import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';

const perfisRotas = Router();
const perfilController = new PerfilController();

perfisRotas.use(ensureAuthenticaded);

perfisRotas.get('/', perfilController.show);
perfisRotas.put('/', perfilController.update);

export default perfisRotas;
