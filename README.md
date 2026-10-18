# ✂️ MVC Barbearia

Projeto de estudo que implementa o padrão **MVC** (Model, View, Controller) com **Node.js**, **Express** e **MongoDB Atlas**. A aplicação tem uma API REST de clientes (CRUD), login simples e páginas HTML que consomem essa API.

> Todos os dados usados no projeto são **fictícios**.

## 👨‍💻 Desenvolvido por

**Lucas** — estudante de Análise e Desenvolvimento de Sistemas (Uninassau, Campina Grande - PB).

- GitHub: [github.com/lucaspy2215](https://github.com/lucaspy2215)
- LinkedIn: [linkedin.com/in/lucas-rocha-de-farias-88b837364](https://linkedin.com/in/lucas-rocha-de-farias-88b837364)

## 🧰 Tecnologias

- Node.js (v24, com `--watch` e `--env-file`)
- Express
- Mongoose + MongoDB Atlas
- HTML + Tailwind CSS (via CDN) + JavaScript puro (`fetch`)

## 📁 Estrutura de pastas

```
MVC/
├─ index.js                  # servidor Express e rotas
├─ db.js                     # conexão com o MongoDB
├─ .env                      # suas variáveis reais (não vai para o Git)
├─ .env.example              # modelo do .env, sem valores reais
├─ package.json
└─ src/
   ├─ models/
   │  └─ User.js             # Model: estrutura do cliente
   ├─ controllers/
   │  └─ userController.js   # Controller: regras de cada rota
   └─ views/
      ├─ index.html          # página central: lista de clientes
      ├─ login.html          # tela de login
      ├─ cadastro.html       # tela de cadastro de cliente
      └─ bemvindo.html       # tela exibida após o login
```

## 🧩 Como o MVC foi montado

| Camada | Arquivo | Responsabilidade |
|--------|---------|------------------|
| **Model** | `src/models/User.js` | Define o schema do cliente (`name`, `email`, `password`) e conversa com o MongoDB via Mongoose. |
| **View** | `src/views/*.html` | O que o usuário vê. As páginas chamam a API com `fetch` e desenham os dados na tela. |
| **Controller** | `src/controllers/userController.js` | Recebe a requisição, usa o Model, valida os dados e devolve a resposta em JSON. |

O arquivo `index.js` liga tudo: registra as rotas, aponta cada uma para uma função do Controller e serve a pasta `src/views` com `express.static`.

### Fluxo de uma requisição

```
Navegador (View)  →  Rota (index.js)  →  Controller  →  Model  →  MongoDB Atlas
        ↑                                                              │
        └───────────────────────── resposta JSON ←─────────────────────┘
```

Exemplo: ao abrir a página central, o HTML executa `fetch('/usuarios')`, a rota chama `pegarUsuario`, o Controller pede os clientes ao Model e devolve a lista em JSON, e a View transforma essa lista em cards na tela.

> Observação: aqui a View é HTML estático que consome a API, uma adaptação comum do MVC para aplicações com API REST. No MVC clássico, o servidor renderiza a View (por exemplo, com EJS).

## 🚀 Como rodar

### 1. Pré-requisitos

- [Node.js](https://nodejs.org) v20.6 ou superior (o projeto foi feito na v24)
- Uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/atlas) com um cluster criado

### 2. Instalar

```bash
git clone https://github.com/lucaspy2215/MVC-Iniciante.git
cd MVC-Iniciante
npm install
```

### 3. Configurar o `.env`

O repositório traz um arquivo de exemplo, o `.env.example`. Copie-o com o nome `.env`:

```bash
# Linux/Mac
cp .env.example .env

# Windows (PowerShell)
copy .env.example .env
```

Depois abra o `.env` e troque o conteúdo pela URL de conexão do **seu** cluster:

```env
MONGO_URL=mongodb+srv://SEU_USUARIO:SUA_SENHA@seu-cluster.mongodb.net/Barbearia
```

O nome da variável deve ser o mesmo lido em `db.js`. O banco deste projeto não é compartilhado: cada pessoa cria o próprio cluster gratuito no Atlas, e o arquivo `.env` nunca deve ser enviado ao GitHub.

No Atlas, libere o seu IP em **Security → Network Access → Add IP Address**. Sem isso a conexão é recusada.

### 4. Iniciar o servidor

```bash
npm run dev
```

Esse script executa `node --watch --env-file=.env index.js`, e o servidor reinicia sozinho a cada alteração. Ao subir, o terminal mostra:

```
Servidor rodando em http://localhost:3000
Conexão com o MongoDB estabelecida com sucesso!
```

## 🖥️ Páginas

| Endereço | Descrição |
|----------|-----------|
| `http://localhost:3000/` | Página central com a lista de clientes |
| `http://localhost:3000/login.html` | Login |
| `http://localhost:3000/cadastro.html` | Cadastro de novo cliente |
| `http://localhost:3000/bemvindo.html` | Mensagem de boas-vindas após o login |

**Fluxo:** `login.html` → (login correto) → `bemvindo.html` → botão "Ver clientes" → `/`.
Quem não tem conta usa o link "Criar conta" no login e, depois do cadastro, volta para a página central.

### 🧪 Como testar o login

Como o seu banco começa vazio, ainda não existe nenhum cliente para entrar. Siga estes passos:

1. Abra `http://localhost:3000/cadastro.html` e cadastre um cliente (por exemplo, `teste@email.com` com a senha `123456`).
2. Abra `http://localhost:3000/login.html` e entre com o mesmo email e senha.
3. Você verá a tela de boas-vindas com o nome do cliente cadastrado.

Erre a senha de propósito para ver a mensagem "Email ou senha inválidos".

## 🔌 Rotas da API

| Método | Rota | Descrição | Corpo (JSON) |
|--------|------|-----------|--------------|
| `GET` | `/usuarios` | Lista todos os clientes (sem a senha) | — |
| `GET` | `/usuarios/:id` | Busca um cliente pelo id | — |
| `POST` | `/usuarios` | Cria um cliente | `name`, `email`, `password` |
| `PUT` | `/usuarios/:id` | Atualiza um cliente | campos a alterar |
| `DELETE` | `/usuarios/:id` | Remove um cliente | — |
| `POST` | `/login` | Confere email e senha | `email`, `password` |

### Respostas principais

- `POST /usuarios` sem `name`, `email` ou `password` → **400** com uma mensagem de erro.
- `GET /usuarios/:id` com id inexistente → **404**.
- `POST /login` com email ou senha incorretos → **401** (`"Email ou senha inválidos"`).
- `POST /login` correto → **200** com `{ "name": "..." }`.
- Erros inesperados → **500** com a mensagem do erro.

### Exemplos

Criar um cliente:

```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"name":"Italo Matheus","email":"italo@email.com","password":"123456"}'
```

Fazer login:

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"italo@email.com","password":"123456"}'
```

Você também pode testar as rotas pelo Postman ou Insomnia.

## ⚠️ Limitações conhecidas

Este é um projeto de estudo, e por isso:

- As senhas são salvas em **texto puro**. Em um projeto real, use hash (`bcrypt`).
- O login **não gera token** (sem JWT ou sessão). As rotas e a página de clientes ficam abertas.
- Não há validação avançada de email ou força de senha.

## 🔜 Próximos passos

- [ ] Hash de senha com `bcrypt`
- [ ] Autenticação com JWT e rotas protegidas
- [ ] Botões de editar e excluir cliente na tela
- [ ] Campos da barbearia no model (serviço, barbeiro, horário)

## 📄 Licença

Projeto de estudo, de uso livre para aprendizado.