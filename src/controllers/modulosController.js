const modulosModel = require("../models/modulosModel")

const modulosController = {
  // GET /modulos
  index: async (req, res, next) => {
    try {
      const resposta = await modulosController.index()
      res.status(200).json({ data: resposta });
    } catch (erro) {
      next(erro);
    }
  },

  // GET /modulos/:id
  show: async (req, res, next) => {
    try {
      const { id } = req.params
      const modulo = await modulosModel.retornarUmModulo(id)
      res.status(200).json({ data: modulo })
    } catch (error) {
      next(error)
    }
  },

  // POST /modulos
}