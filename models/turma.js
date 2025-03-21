let mongoose = require("mongoose");

let turmaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  alunos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Aluno" }],
  professor: { type: mongoose.Schema.Types.ObjectId, ref: "Professor" }
});

// Uma turma pode ter vários alunos e apenas um professor.

module.exports = mongoose.model("Turma", turmaSchema);