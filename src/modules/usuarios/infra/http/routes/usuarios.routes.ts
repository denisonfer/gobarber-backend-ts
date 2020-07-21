import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import CriarUsuarioService from '@modules/usuarios/services/CriarUsuarioService';
import UpdateUserAvatarService from '@modules/usuarios/services/UpdateUserAvatarService';
import UsuariosRepositorio from '@modules/usuarios/infra/typeorm/repositories/UsuariosRepositorio'

import ensureAuthenticaded from '@modules/usuarios/infra/http/middlewares/ensureAuthenticaded';

const usuariosRotas = Router();

const upload = multer(uploadConfig);

usuariosRotas.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;

  const usuariosRepositorio = new UsuariosRepositorio();
  const criarUsuario = new CriarUsuarioService(usuariosRepositorio);

  const user = await criarUsuario.execute({
    nome,
    email,
    senha,
  });

  delete user.senha;

  return res.json(user);
});

usuariosRotas.patch(
  '/avatar',
  ensureAuthenticaded,
  upload.single('avatar'),
  async (req, res) => {
    const usuariosRepositorio = new UsuariosRepositorio();
    const updateUserAvatar = new UpdateUserAvatarService(usuariosRepositorio);

    const usuario = await updateUserAvatar.execute({
      usuario_id: req.usuario.id,
      avatarFilename: req.file.filename,
    });

    delete usuario.senha;

    return res.json(usuario);
  },
);

export default usuariosRotas;
