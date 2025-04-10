const { z } = require("zod")

const criarUsuarioSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  tipoUsuario: z.enum(["ADMIN", "STANDARD"]).default("STANDARD"),
  turmaId: z.string().uuid()
}).strict()

module.exports = {
  criarUsuarioSchema
}