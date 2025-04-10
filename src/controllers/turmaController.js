const turmaModel = require("../models/turmaModel")

const turmaController = {
  // GET /turmas
  index: async (req, res, next) => {
    try {
      const resposta = await turmaModel.retornarTurmas()
      res.status(200).json({ data: resposta })
    } catch (error) {
      next(error)
    }
  },

  // POST /turmas
  create: async (req, res, next) => {
    try {
      const corpoDaRequisicao = req.body
      const resposta = await turmaModel.criarTurma(corpoDaRequisicao)
      res.status(200).json({ message: "turma criada com sucesso.", data: resposta })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = turmaController