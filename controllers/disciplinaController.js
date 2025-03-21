const Disciplina = require("../models/disciplina.js"); // Importei o model Disciplina

const criarDisciplina = async (req, res) => {
  try {

    const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body

    const novaDisciplina = new Disciplina({
      nome,
      descricao,
      dataInicio,
      dataFim,
      tarefas: tarefasIds,
    })

    await novaDisciplina.save()

    if (tarefasIds && tarefasIds.length > 0) {
      await Tarefa.updateMany(
        { _id: { $in: tarefasIds } },
        { $push: { disciplinas: novaDisciplina._id } }
      )
    }

    res.status(201).json({
      message: "Disciplina criada com sucesso!",
      disciplina: novaDisciplina,
    })

  } catch (error) {
    
    res.status(500).json({ msg: "Erro ao criar disciplina", error})
  
  }
}

const obterTodasDisciplinas = async (req, res) => {
  try {

    const disciplinas = await Disciplina.find().populate('tarefas')

    res.status(200).json(disciplinas)

  } catch (error) {

    res.status(500).json({ msg: "Erro ao buscar disciplinas", error})
  
  }
}

const deletarDisciplina = async (req, res) => {
  try {

    const { id } = req.params

    const disciplinaRemovida = await Disciplina.findByIdAndDelete(id)

    if (!disciplinaRemovida) {
      return res.status(404).json({ message: "Disciplina não encontrada!" })
    }

    res.status(200).json({ message: "Disciplina removida com sucesso!" })

  } catch (error) {

    res.status(500).json({ msg: "Erro ao deletar disciplina", error})
 
  }
}

const editarDisciplina = async (req, res) => {
  try {

    const { id } = req.params

    const { nome, descricao, dataInicio, dataFim, tarefasIds } = req.body

    const disciplina = await Disciplina.findByIdAndUpdate(
      id,
      { nome, descricao, dataInicio, dataFim, tarefas: tarefasIds }
    )

    if (!disciplina) {
      return res.status(404).json({ message: "Disciplina não encontrada!" })
    }

    res.status(200).json({
      message: "Disciplina atualizada com sucesso!",
      disciplina,
    })

  } catch (error) {

    res.status(500).json({ msg: "Erro ao editar disciplina", error })
  
  }
}

module.exports = { criarDisciplina, obterTodasDisciplinas, deletarDisciplina, editarDisciplina }
