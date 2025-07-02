const { z } = require("zod")

const criarUsuarioSchema = z.object({
  nome: z.string(),
  email:z.string(),
  password: z.string().optional(),
  tipoUsuario: z.enum(["ADMIN", "STANDARD"]).default("STANDARD"),
  turmaId: z.string().uuid()
}).strict()

const atualizarUsuarioSchema = z.object({
  nome: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  caminho: z.string().optional(),
  tipoUsuario: z.enum(["ADMIN", "STANDARD"]).optional(),
  turmaId: z.string().uuid().optional()
}).strict()
module.exports = {
  criarUsuarioSchema,
  atualizarUsuarioSchema
}