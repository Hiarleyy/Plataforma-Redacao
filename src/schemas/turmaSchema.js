const { z } = require("zod")

const criarTurmaSchema = z.object({
  nome: z.string(),
}).strict()

module.exports = {
  criarTurmaSchema
}