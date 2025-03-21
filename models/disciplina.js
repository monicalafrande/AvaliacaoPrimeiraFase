let mongoose = require("mongoose");
const Tarefa = require("./tarefa.js");

let disciplinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  dataInicio: { type: Date, default: Date.now },
  dataFim: { type: Date },
  tarefas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tarefa" }],
});

// Uma disciplina tem várias tarefas, por isso usamos o tipo Array de ObjectIds e referenciamos o modelo Tarefa

module.exports = mongoose.model("Disciplina", disciplinaSchema);