const competenciasRepository = require("../repositories/competenciasRepository")
const HttpError = require("../error/HttpError")
const { criarCompetenciaSchema } = require("../schemas/competenciaSchema")

const competenciasModel = {
  retornarCompetencias: async () => {
    const competencias = await competenciasRepository.retornarCompetencias()
    return competencias
  },

  retornarUmaCompetencia: async (id) => {
    const competencias = await competenciasRepository.retornarCompetenciasPorId(id)
    if (!competencias) throw new HttpError(404, "esse usuário não existe.")
    return competencias
  },

  criarNovasCompetencias: async (data) => {
    const corpo = criarCompetenciaSchema.safeParse(data)
    if (!corpo.success) {
      throw new HttpError(400, "Formato inválido das competências", corpo.error)
    }
    const competencia = await competenciasRepository.criarNovasCompetencias(corpo.data)
    return competencia
    
  },
  deletarCompetencias: async (id) => {
     // Verificando se o usuário existe
     const competenciasExiste= await competenciasRepository.retornarCompetenciasPorId(id)
     if (!competenciasExiste) throw new HttpError(404, "esse usuário não existe.")

    const competenciaDeletada = await competenciasRepository.deleteUmaCompetencia(id)
    return competenciaDeletada
  }
}

module.exports = competenciasModel