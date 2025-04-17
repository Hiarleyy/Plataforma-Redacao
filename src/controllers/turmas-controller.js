const turmasModel = require("../models/turmas-model")

const turmasController = {
  // GET /turmas
  index: async (req, res, next) => {
    try {
      const resposta = await turmasModel.retornarTurmas()
      res.status(200).json({ data: resposta })
    } catch (error) {
      next(error)
    }
  },

  // GET /turmas/:id
  show: async (id) => {
    try {
      const { id } = req.params
      const resposta = await turmasModel.retornarTurma(id)
      res.status(200).json({ data: resposta })
    } catch (error) {
      next(error)
    }
  },

  // POST /turmas
  create: async (req, res, next) => {
    try {
      const corpoDaRequisicao = req.body
      const resposta = await turmasModel.criarTurma(corpoDaRequisicao)
      res.status(200).json({ message: "turma criada com sucesso.", data: resposta })
    } catch (error) {
      next(error)
    }
  },

  // PUT /turmas/:id
  update: async (req, res, next) =>{
    try{
      const {id} = req.params
      const corpoDaRequisicao = req.body
      const resposta = await turmasModel.atualizarTurma(id, corpoDaRequisicao)
      res.status(200).json({ message: "turma atualizada com sucesso.", data: resposta })
    } catch(error){
      next (error)
    }
  },

  // DELETE /turmas/:id
  delete: async (req, res, next) =>{
    try{
      const {id} = req.params
      const resposta = await turmasModel.deletarTurma(id)
      res.status(200).json({ message: "turma deletada com sucesso.", data: resposta })
    } catch(error){
      next (error)
    }
  }
}

module.exports = turmasController