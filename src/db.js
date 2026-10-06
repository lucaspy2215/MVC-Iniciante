import mogoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/mydatabase';

export async function mongo() {
    try {
        await mogoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexão com o MongoDB estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
}


