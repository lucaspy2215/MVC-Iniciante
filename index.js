import express from 'express';
import { mongo } from './db.js';
import { User } from './src/models/User.js';
import {rotaInicial, pegarUsuario, criarUsuario} from './src/controllers/userController.js';

const app = express();
app.use(express.json());

mongo();
// mongoose.connect('mongodb://localhost:27017/myapp');


const PORT = 3000;