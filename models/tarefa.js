let mongoose = require("mongoose");
const Aluno = require("../models/aluno.js");

let tarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  concluida: Boolean,
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Aluno,
  },
  disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disciplina" }],
});

// O relacionamento é de muitos para um, pois várias tarefas podem ser associadas a um aluno.
// O relacionamento é de muitos para muitos, pois várias disciplinas podem estar associadas a uma tarefa, e uma disciplina pode ter várias tarefas.

module.exports = mongoose.model("Tarefa", tarefaSchema);