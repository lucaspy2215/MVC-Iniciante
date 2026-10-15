import mongoose from 'mongoose';

export async function mongo() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'mvc' });
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
  }
}