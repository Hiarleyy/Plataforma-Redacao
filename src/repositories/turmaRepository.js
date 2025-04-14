const prisma = require("../database/db")
const Turma = require("../entities/Turma")

const turmaRepository = {
  // Retorna todas as turmas do bando de dados
  retorneTodasAsTurmas: async () => {
    const turmas = await prisma.turma.findMany({
      select: {
        id: true,
        nome: true,
        dataCriacao: true,
        usuarios: true
      },
    })

    return turmas
  },

  // Retorna uma turma específica pelo id
  retorneUmaTurmaPeloId: async (id) => {
    const turma = await prisma.turma.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        dataCriacao: true,
      }
    })

    return turma
  },

   // Retorna uma turma específica pelo nome
   retorneUmaTurmaPeloNome: async (nome) => {
    const turma = await prisma.turma.findUnique({
      where: { nome },
      select: {
        id: true,
        nome: true,
        dataCriacao: true,
      }
    })

    return turma
  },

  // Crie uma nova turma
  crieNovaTurma: async (data) => {
    const turma = new Turma(data)

    const novaTurma = await prisma.turma.create({
      data: turma,
      select: {
        id: true,
        nome: true,
        dataCriacao: true,
      },
    })

    return novaTurma
  },
}

module.exports = turmaRepository