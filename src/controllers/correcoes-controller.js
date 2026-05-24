const correcoesModel = require("../models/correcoes-model")
const path = require("path")
const fs = require("fs")

const correcoesController = {

  // GET /correcoes
  index: async (req, res, next) => {
    try {
      const resposta = await correcoesModel.retornarCorrecoes()

      return res.status(200).json({
        data: resposta
      })

    } catch (error) {
      next(error)
    }
  },

  // POST /correcoes
  create: async (req, res, next) => {
    try {

      const {
        competencia01,
        competencia02,
        competencia03,
        competencia04,
        competencia05,
        feedback,
        redacaoId
      } = req.body

      if (!req.file) {
        return res.status(400).json({
          error: "Arquivo não enviado."
        })
      }

      const resposta = await correcoesModel.criarCorrecao({
        competencia01: Number(competencia01),
        competencia02: Number(competencia02),
        competencia03: Number(competencia03),
        competencia04: Number(competencia04),
        competencia05: Number(competencia05),
        caminho: req.file.filename,
        feedback,
        redacaoId
      })

      return res.status(201).json({
        message: "Correção salva com sucesso!",
        data: resposta
      })

    } catch (error) {
      next(error)
    }
  },

  // GET /correcoes/download/:id
  download: async (req, res, next) => {
    try {

      const { id } = req.params

      const correcao = await correcoesModel.retornarCorrecao(id)

      if (!correcao) {
        return res.status(404).json({
          message: "Correção não encontrada."
        })
      }

      const filePath = path.join(
        __dirname,
        "..",
        "uploads",
        "correcoes",
        String(correcao.redacao.usuarioId),
        correcao.caminho
      )

      // Verifica se arquivo existe
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          message: "Arquivo não encontrado."
        })
      }

      // Sanitiza nome do arquivo
      const nomeSeguro = `${correcao.redacao.titulo}_correcao.pdf`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/[^\w.-]/g, "_") // remove caracteres inválidos
        .replace(/_+/g, "_") // remove múltiplos _
        .trim()

      return res.download(filePath, nomeSeguro, (err) => {

        if (err) {

          console.error("Erro no download de correção:", err)

          if (!res.headersSent) {
            return res.status(500).json({
              message: "Erro ao fazer download do arquivo."
            })
          }

        }

      })

    } catch (error) {

      console.error("Erro no download de correção:", error)

      next(error)
    }
  }

}

module.exports = correcoesController