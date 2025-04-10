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
}

module.exports = usuariosController