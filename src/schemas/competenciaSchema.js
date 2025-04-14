const { z } = require("zod");

const criarCompetenciaSchema = z.object({
<<<<<<< HEAD
  competencia01: z.number().int().min(0).max(200),
  competencia02: z.number().int().min(0).max(200),
  competencia03: z.number().int().min(0).max(200),
  competencia04: z.number().int().min(0).max(200),
  competencia05: z.number().int().min(0).max(200),
}).strict();
=======
  competencia01: z.int().min(0).max(200),
  competencia02: z.int().min(0).max(200),
  competencia03: z.int().min(0).max(200),
  competencia04: z.int().min(0).max(200),
  competencia05: z.int().min(0).max(200),
}).strict()
>>>>>>> 836ffd12049605042262f393327dc0e6de16da97

module.exports = {
  criarCompetenciaSchema
};
