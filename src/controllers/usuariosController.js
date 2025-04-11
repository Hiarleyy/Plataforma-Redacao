const usuariosModel = require("../models/usuariosModel")

const usuariosController = {
  // GET /usuarios
  index: async (req, res, next) => {
    try {
      const resposta = await usuariosModel.retornarUsuarios()
      res.status(200).json({ data: resposta })
    } catch (error) {
      next(error)
    }
  },

  // GET /usuarios/:id
  show: async (req, res, next) => {
    try {
      const { id } = req.params
      const resposta = await usuariosModel.retornarUmUsuario(id)
      res.status(200).json({ data: resposta })
    } catch (error) {
      next(error)
    }
  },

  // POST /usuarios
  create: async (req, res, next) => {
    try {
      const corpoDaRequisicao = req.body
      const resposta = await usuariosModel.criarUsuario(corpoDaRequisicao)
      res.status(200).json({ message: "usuário criado com sucesso.", data: resposta })
    } catch (error) {
      next(error)
    }
  },

  // PUT /usuarios/:id
  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const corpoDaRequisicao = req.body
      const resposta = await usuariosModel.atualizarUsuario(id, corpoDaRequisicao)
      res.status(200).json({ message: "usuário atualizado com sucesso.", data: resposta })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = usuariosController