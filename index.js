import express from 'express';
import {mongoose} from 'mongoose';
import {User} from './src/models/User.js';
import {rotaInicial, pegarUsuario, criarUsuario} from './src/controllers/userController.js';

const app = express();
app.use(express.json());
mongo()

const PORT = 3000;