const prisma = require("../database/db");
const Turma = require("../entities/Turma");

const usuariosRepository = {
  // Retorna todos os usuários do bando de dados
  retorneTodasAsTurmas: async () => {
    const turmas = await prisma.turma.findMany({
      select: {
        id: true,
        nome: true,
        dataCriacao: true,
      },
    })

    return turmas
  },

  // Retorna um usuário específico pelo id
  retorneUmaTurmaPorId: async (id) => {
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

   // Retorna um usuário específico pelo email
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

  // Rota de criar um novo usuário
  crieNovaTurma: async (data) => {
    const Turma = new Turma(data)

    const novaTurma = await prisma.Turma.create({
      data: Turma,
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