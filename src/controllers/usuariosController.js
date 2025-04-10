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

  // POST /usuarios
  create: async (req, res, next) => {
    try {
      const corpoDaRequisicao = req.body
      const resposta = await usuariosModel.criarUsuario(corpoDaRequisicao)
      res.status(200).json({ message: "usuário criado com sucesso.", data: resposta })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = usuariosController