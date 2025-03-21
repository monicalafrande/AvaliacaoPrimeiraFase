const Turma = require('../models/turma')
const Aluno = require('../models/aluno')
const Professor = require('../models/professor')

const criarTurma = async (req, res) => {
  try {

    const { nome, alunosIds, professorId } = req.body

    const novaTurma = new Turma({
      nome,
      alunos: alunosIds,      
      professor: professorId, 
    })

    await novaTurma.save()

    res.status(201).json({
      message: "Turma criada com sucesso!",
      turma: novaTurma,
    })

  } catch (error) {

    res.status(500).json({ msg: "Erro ao criar turma", error})
  
  }
}

const obterTodasTurmas = async (req, res) => {
  try {

    const turmas = await Turma.find()
      .populate('alunos')     
      .populate('professor')  

    res.status(200).json(turmas)

  } catch (error) {

    res.status(500).json({ msg: "Erro ao buscar turmas", error})

  }
}

const deletarTurma = async (req, res) => {
  try {

    const { id } = req.params

    const turma = await Turma.findById(id)

    if (!turma) {
      return res.status(404).json({ message: "Turma não encontrada!" })
    }

    await Turma.deleteOne({ _id: id })

    res.status(200).json({ message: "Turma removida com sucesso!" })

  } catch (error) {

    res.status(500).json({ msg: "Erro ao deletar turma", error})

  }
}

const editarTurma = async (req, res) => {
  try {

    const { id } = req.params
    const { nome, alunosIds, professorId } = req.body

    let turma = await Turma.findByIdAndUpdate(
      id,
      { nome, alunos: alunosIds, professor: professorId } 
    )

    if (!turma) {
      return res.status(404).json({ message: "Turma não encontrada!" })
    }

    res.status(200).json({
      message: "Turma atualizada com sucesso!",
      turma,
    })

  } catch (error) {

    res.status(500).json({ msg: "Erro ao atualizar turma", error })
  }
}

module.exports = {
  criarTurma,
  obterTodasTurmas,
  deletarTurma,
  editarTurma
} // Exportei as funções

