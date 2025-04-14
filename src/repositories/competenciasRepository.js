const prisma = require("../database/db")
const Competencia = require("../entities/Competencia")

const competenciasRepository = {
  // Retorna todas as competencias do banco de dados
  retornarCompetencias: async () => {
    const competencias = await prisma.Competencia.findMany({
      select: {
        id: true,
        competencia01: true,
        competencia02: true,
        competencia03: true,
        competencia04: true,
        competencia05: true,
      }
    })

    return competencias
  },

  // Retorna as competencias pelo id
  retornarCompetenciasPorId: async (id) => {
    const competencias = await prisma.Competencia.findUnique({ 
        where: { id }, 
        select: { 
        competencia01: true,
        competencia02: true,
        competencia03: true,
        competencia04: true,
        competencia05: true,
        } 
    })

    return competencias
  },

  // Crie nova competencia
  criarNovasCompetencias: async (data) => {
    const competencia = new Competencia(data)
    const novaCompetencia = await prisma.Competencia.create({ data: competencia })
    return novaCompetencia
  },

  // Delete um modulo
  deleteUmaCompetencia: async (id) => {
    const competenciaDeletada = await prisma.Competencia.delete(
      { where: { id }, select: { id: true, nome: true } }
    )

    return competenciaDeletada
  }
}

module.exports = competenciasRepository