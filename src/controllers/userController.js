import { User } from '../models/User.js';

export const rotaInicial = (req, res) => res.json('Bem-vindo à API de Usuários!');

export const pegarUsuario = async (req, res) => {
  try {
    res.json(await User.find().select('-password'));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const pegarUsuarioPorId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const criarUsuario = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Todas as informações são obrigatórias.' });

  try {
    res.status(201).json(await User.create({ name, email, password }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletarUsuario = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json({ message: 'Usuário removido.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    res.json({ name: user.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};