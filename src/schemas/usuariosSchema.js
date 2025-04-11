const { z } = require("zod")

const criarUsuarioSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  tipoUsuario: z.enum(["ADMIN", "STANDARD"]).default("STANDARD"),
  turmaId: z.string().uuid()
}).strict()

const atualizarUsuarioSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email().optional(),
  tipoUsuario: z.enum(["ADMIN", "STANDARD"]).default("STANDARD"),
  turmaId: z.string().uuid().optional()
}).strict()

module.exports = {
  criarUsuarioSchema,
  atualizarUsuarioSchema
}