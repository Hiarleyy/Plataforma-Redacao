const redacoesModel = require("../models/redacoes-model")
const path = require("path")
const fs = require("fs")

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

  // POST /redacoes/:usuarioId/upload
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
  },

  // GET /redacoes/download/:id
  download: async (req, res, next) => {
    try {
      const { id } = req.params
      const redacao = await redacoesModel.retornarRedacao(id)

      const filePath = path.join(__dirname, "..", "uploads", "redacoes", redacao.usuarioId, redacao.caminho)

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Arquivo não encontrado." })
      }

      res.download(filePath, `${redacao.titulo}.pdf`, (err) => {
        if (err) {
          res.status(500).json({ message: "Erro ao fazer download do arquivo." })
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = redacoesController
