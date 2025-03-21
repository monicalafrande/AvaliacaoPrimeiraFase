const express = require('express'); // Importei o express
const bodyParser = require("body-parser"); // Importei o body-parser
const mongoose = require('./database/db'); // Importei o mongoose

const alunoRoutes = require('./routes/alunoRoutes') // Importei as rotas de aluno
const disciplinaRoutes = require('./routes/disciplinaRoutes') // Importei as rotas de disciplina
const perfilRoutes = require('./routes/perfilRoutes') // Importei as rotas de perfil
const professorRoutes = require('./routes/professorRoutes') // Importei as rotas de professor
const tarefaRoutes = require('./routes/tarefaRoutes') // Importei as rotas de tarefa
const turmaRoutes = require('./routes/turmaRoutes') // Importei as rotas de turma
const autenticacaoRoutes = require('./routes/autenticacaoRoutes') // Importei as rotas de autenticação

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', alunoRoutes) // Adicionei as rotas de aluno
app.use('/api', disciplinaRoutes) // Adicionei as rotas de disciplina
app.use('/api', perfilRoutes) // Adicionei as rotas de perfil
app.use('/api', professorRoutes) // Adicionei as rotas de professor
app.use('/api', tarefaRoutes) // Adicionei as rotas de tarefa
app.use('/api', turmaRoutes) // Adicionei as rotas de turma
app.use('/api', autenticacaoRoutes) // Adicionei as rotas de autenticação

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});

