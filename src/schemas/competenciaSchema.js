const { z } = require("zod");

const criarCompetenciaSchema = z.object({
  competencia01: z.number().int().min(0).max(200),
  competencia02: z.number().int().min(0).max(200),
  competencia03: z.number().int().min(0).max(200),
  competencia04: z.number().int().min(0).max(200),
  competencia05: z.number().int().min(0).max(200),
}).strict();

module.exports = {
  criarCompetenciaSchema
};
