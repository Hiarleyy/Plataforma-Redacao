const { z } = require("zod")

const criarPagamentoSchema = z.object({
    usuarioId: string().uuid(),
    valor: z.number().positive(),
    dataVencimento: z.date(),
}).strict()

module.exports = {
  criarPagamentoSchema

}