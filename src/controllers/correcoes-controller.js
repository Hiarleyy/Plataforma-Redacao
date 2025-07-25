const correcoesModel = require("../models/correcoes-model")
const path = require("path")
const fs = require("fs")
const { update } = require("./usuarios-controller")

const correcoesController = {
  // GET /correcoes
  index: async (req, res, next) => {
    try {
      const resposta = await correcoesModel.retornarCorrecoes()
      res.status(200).json({ data: resposta })
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
        return res.status(400).json({ error: "Arquivo não enviado." })
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
      });

      res.status(201).json({ message: "Correção salva com sucesso!", data: resposta })
    } catch (error) {
      next(error)
    }
  },

  // GET /correcoes/download/:id
  download: async (req, res, next) => {
    try {
      const { id } = req.params
      
      // Validação básica do UUID
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: "ID da correção inválido." })
      }

      const correcao = await correcoesModel.retornarCorrecao(id)

      if (!correcao) {
        return res.status(404).json({ message: "Correção não encontrada." })
      }

      const filePath = path.join(__dirname, "..", "uploads", "correcoes", correcao.redacao.usuarioId, correcao.caminho)

      console.log("Tentando acessar arquivo em:", filePath)
      console.log("Dados da correção:", JSON.stringify(correcao, null, 2))

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ 
          message: "Arquivo não encontrado.",
          path: filePath,
          correcao: correcao
        })
      }

      // Definir headers apropriados para PDF
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `attachment; filename="${correcao.redacao.titulo}_correcao.pdf"`)

      res.download(filePath, `${correcao.redacao.titulo}_correcao.pdf`, (err) => {
        if (err) {
          console.error("Erro no download:", err)
          if (!res.headersSent) {
            res.status(500).json({ message: "Erro ao fazer download do arquivo." })
          }
        }
      })
    } catch (error) {
      console.error("Erro no download de correção:", error)
      next(error)
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const corpoDaRequisicao = req.body
      const resposta = await correcoesModel.atualizarCorrecao(id, corpoDaRequisicao)
      res.status(200).json({ message: "Correção atualizada com sucesso.", data: resposta })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = correcoesController