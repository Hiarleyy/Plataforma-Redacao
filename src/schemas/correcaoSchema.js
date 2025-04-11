const { z } = require("zod")

const criarCompetenciaSchema = z.object({
    nota: z.int(),
    caminho: z.string(),
    feedback: z.string(),
    competenciaId: string().uuid(),
    redacaoId: string().uuid(),
}).strict()

module.exports = {
  criarCompetenciaSchema
}