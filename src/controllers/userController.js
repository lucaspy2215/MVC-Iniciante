


export const rotaInicial = (req, res) => {
    res.json('Bem-vindo à API de Usuários!');
}

export const pegarUsuario = (req, res) => {
    const usuarios = await User.find()

    res.json(usuarios)
}

export const criarUsuario = async (req, res) => {
    const { name, email, password } = req.body

    try {
        if (!name || !email || !password) {
            res.json({ message: "Todas as informações são obrigatórias." })
            return
        }

        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        })

        res.json(newUser)
    } catch (error) {
        console.log('Erro ao adicionar o usuário')
        return
    }
}
