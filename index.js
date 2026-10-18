import express from 'express';
import { mongo } from './db.js';
import path from 'path';
import {pegarUsuario, pegarUsuarioPorId, criarUsuario, atualizarUsuario, deletarUsuario, login} from './src/controllers/userController.js';

const app = express();
app.use(express.json());
app.use(express.static(path.resolve('src/views')));

mongo();

app.get('/usuarios', pegarUsuario);
app.get('/usuarios/:id', pegarUsuarioPorId);
app.post('/usuarios', criarUsuario);
app.put('/usuarios/:id', atualizarUsuario);
app.delete('/usuarios/:id', deletarUsuario);
app.post('/login', login);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));