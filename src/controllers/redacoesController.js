const redacoesModel = require("../models/redacoesModel")

const redacoesController = {
  // GET /redacoes
  index: async (req, res, next) => {
    try {
      const { usuarioId } = req.query;

      let resposta

      if (!usuarioId) {
        resposta = await redacoesModel.retornarRedacoes()
        res.status(200).json({ data: resposta.redacoes });
      }

      resposta = await redacoesModel.retornarRedacoes(usuarioId)
      res.status(200).json({ data: resposta.redacoes });
    } catch (error) {
      next(error)
    }
  },

  // POST /redacoes
  create: async (req, res, next) => {
    try {
      const { titulo, usuarioId } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "Arquivo não enviado." });
      }

      const resposta = await redacoesModel.criarRedacao({
        titulo,
        caminho: req.file.filename,
        usuarioId,
      });

      res.status(201).json({ message: "Redação salva com sucesso!", data: resposta });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = redacoesController
