import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticaded from '@modules/usuarios/infra/http/middlewares/ensureAuthenticaded';

import UsuariosControllers from '../controllers/UsuariosControllers';
import AvatarUsuariosControllers from '../controllers/AvatarUsuariosControllers';

const usuariosRotas = Router();
const usuariosControllers = new UsuariosControllers();
const avatarUsuariosControllers = new AvatarUsuariosControllers();

const upload = multer(uploadConfig);

usuariosRotas.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
    },
  }),
  usuariosControllers.create,
);

usuariosRotas.patch(
  '/avatar',
  ensureAuthenticaded,
  upload.single('avatar'),
  avatarUsuariosControllers.update,
);

export default usuariosRotas;
