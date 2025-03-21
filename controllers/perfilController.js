const Perfil = require("../models/perfil.js"); // Importei o model Perfil

const criarPerfil = async (req, res) => {
  try {
    const { matricula, telefone, endereco, alunoId } = req.body;

    const novoPerfil = new Perfil({
      matricula,
      telefone,
      endereco,
      aluno: alunoId,
    });

    await novoPerfil.save();

    await Aluno.updateOne(
      { _id: alunoId },
      { $set: { perfil: novoPerfil._id } }
    );

    res.json({
      message: "Perfil criado com sucesso!",
      perfil: novoPerfil,
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar perfil", error });
  }
};

const obterTodosPerfis = async (req, res) => {
  try {
    const perfis = await Perfil.find().populate("aluno");
    res.json(perfis);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar perfis", error });
  }
};

const deletarPerfil = async (req, res) => {
  const { id } = req.params;

  await Perfil.deleteOne({ _id: id });
  res.json({ message: "Perfil removido com sucesso!" });
};

const editarPerfil = async (req, res) => {
  const { id } = req.params;
  const { matricula, telefone, endereco, alunoId } = req.body;

  let perfil = await Perfil.findByIdAndUpdate(id, {
    matricula,
    telefone,
    endereco,
    aluno: alunoId,
  });
  res.status(200).json({
    message: "Perfil atualizado com sucesso!",
    perfil,
  });
};

module.exports = { criarPerfil, obterTodosPerfis, deletarPerfil, editarPerfil }; // Exportei as funções
