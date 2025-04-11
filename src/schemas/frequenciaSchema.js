const { z } = require("zod")

const criarFrequenciaSchema = z.object({
    usuarioId: string().uuid(),
    turmaId: string().uuid(),
    status: z.enum(["presente", "ausente"]),
    justificativa: z.string().optional(),

}).strict()

module.exports = {
  criarFrequenciaSchema

}