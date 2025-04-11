const { z } = require("zod")

const criarPagamentoSchema = z.object({
    usuarioId: z.string().uuid(),
    valor: z.number().positive(),
    dataVencimento: z.date(),
}).strict()

module.exports = {
  criarPagamentoSchema

}