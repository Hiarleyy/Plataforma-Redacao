const { z } = require("zod")

const criarCompetenciaSchema = z.object({
    competencia01: z.int().min(0).max(200),
    competencia02: z.int().min(0).max(200),
    competencia03: z.int().min(0).max(200),
    competencia04: z.int().min(0).max(200),
    competencia05: z.int().min(0).max(200),
}).strict()

module.exports = {
  criarCompetenciaSchema
}