const aluno = require('../models/aluno') // Importei o model de aluno

const criarAluno = async (req, res) => {

  const { nome, idade } = req.body

  try {

    const novoAluno = new aluno({
      nome,
      idade,
    })

    await novoAluno.save()

    res.status(201).json({
      message: "Aluno criado com sucesso!",
      aluno: novoAluno,
    })

  } catch (error) {

    console.error('Erro ao criar aluno:', error)
    res.status(500).json({ msg: "Erro ao criar aluno", error})

  }
}

const obterTodosAlunos = async (req, res) => {

  try {

    const alunos = await Aluno.find().populate('perfil')

    res.status(200).json(alunos)

  } catch (error) {

    res.status(500).json({ msg: "Erro ao buscar alunos", error})

  }
}

const deletarAluno = async (req, res) => {

  try {

    const { id } = req.params

    const alunoRemovido = await Aluno.findByIdAndDelete(id)
    
    if (!alunoRemovido) {
      return res.status(404).json({ message: "Aluno não encontrado!" })
    }

    res.status(200).json({ message: "Aluno removido com sucesso!" })

  } catch (error) {

    res.status(500).json({ msg: "Erro ao deletar aluno", error})
  
  }
}

const editarAluno = async (req, res) => {

  try {

    const { id } = req.params
    const { nome, idade } = req.body

    const aluno = await Aluno.findByIdAndUpdate(id, { nome, idade })

    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado!" })
    }

    res.status(200).json({
      message: "Aluno atualizado com sucesso!",
      aluno,
    })

  } catch (error) {

    res.status(500).json({ msg: "Erro ao editar aluno", error})

  }
}

module.exports = { criarAluno, obterTodosAlunos, deletarAluno, editarAluno }
