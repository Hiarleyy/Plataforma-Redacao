const { z } = require("zod")

const criarRedacaoSchema = z.object({
    titulo: z.string(),
    caminho: z.string(),
    status: z.string(),
    usuarioId: string().uuid(),

}).strict()

module.exports = {
  criarRedacaoSchema

}