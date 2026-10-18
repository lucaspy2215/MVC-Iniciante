import express from 'express';
import { mongo } from './db.js';
import {
  rotaInicial, pegarUsuario, pegarUsuarioPorId,
  criarUsuario, atualizarUsuario, deletarUsuario,
} from './src/controllers/userController.js';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.static(path.resolve('src/views')));

mongo();

app.get('/', (req, res) => res.sendFile(path.resolve('src/views/index.html')));
app.get('/usuarios', pegarUsuario);
app.get('/usuarios/:id', pegarUsuarioPorId);
app.post('/usuarios', criarUsuario);
app.put('/usuarios/:id', atualizarUsuario);
app.delete('/usuarios/:id', deletarUsuario);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
app.use(express.static(path.resolve('src/views')));