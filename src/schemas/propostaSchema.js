const { z } = require("zod")

const criarPropostaSchema = z.object({
    tema: z.string(),
    caminho: z.string(),
    data: z.string().datetime(),
}).strict()

module.exports = {
  criarPropostaSchema

}