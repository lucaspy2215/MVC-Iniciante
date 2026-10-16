import express from 'express';
import { mongo } from './db.js';
import {
  rotaInicial, pegarUsuario, pegarUsuarioPorId,
  criarUsuario, atualizarUsuario, deletarUsuario,
} from './src/controllers/userController.js';

const app = express();
app.use(express.json());

mongo();

app.get('/', rotaInicial);
app.get('/usuarios', pegarUsuario);
app.get('/usuarios/:id', pegarUsuarioPorId);
app.post('/usuarios', criarUsuario);
app.put('/usuarios/:id', atualizarUsuario);
app.delete('/usuarios/:id', deletarUsuario);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));