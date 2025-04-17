const { z } = require("zod")

const criarPagamentoSchema = z.object({
    usuarioId: z.string().uuid(),
    valor: z.number().positive(),
    dataVencimento: z.string().optional(),
}).strict()

const atualizarPagamentoSchema = z.object({
  usuarioId: z.string().optional(),
  valor: z.number().positive().optional(),
  dataVencimento: z.string().optional(),
}).strict()

const deletarPagamentoSchema = z.object({
  usuarioId: z.string().optional(),
  valor: z.number().positive().optional(),
  dataVencimento: z.string().optional(),
}).strict()

module.exports = {
  criarPagamentoSchema, 
  atualizarPagamentoSchema,
  deletarPagamentoSchema
}