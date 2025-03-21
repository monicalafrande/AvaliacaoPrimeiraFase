let mongoose = require("mongoose");

let professorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true },
  disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disciplina" }],
});

// Um professor tem várias disciplinas, por isso usamos o tipo Array de ObjectIds e referenciamos o modelo Disciplina

module.exports = mongoose.model("Professor", professorSchema);