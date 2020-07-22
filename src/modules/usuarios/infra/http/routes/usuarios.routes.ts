import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';


import ensureAuthenticaded from '@modules/usuarios/infra/http/middlewares/ensureAuthenticaded';

import UsuariosControllers from '../controllers/UsuariosControllers'
import AvatarUsuariosControllers from '../controllers/AvatarUsuariosControllers'

const usuariosRotas = Router();
const usuariosControllers = new UsuariosControllers();
const avatarUsuariosControllers = new AvatarUsuariosControllers();

const upload = multer(uploadConfig);

usuariosRotas.post('/', usuariosControllers.create);

usuariosRotas.patch(
  '/avatar',
  ensureAuthenticaded,
  upload.single('avatar'),
  avatarUsuariosControllers.update
);

export default usuariosRotas;
