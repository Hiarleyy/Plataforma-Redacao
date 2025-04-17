const prisma = require("../database/db")
const Correcao = require("../entities/Correcao")

const correcoesRepository = {
  // Retorna todas as correções do banco de dados
  retorneTodasAsCorrecoes: async () => {
    const correcoes = await prisma.correcao.findMany()
    return correcoes
  },

  // Retorna uma correção específica
  retornaUmaCorrecao: async (id) => {
    const correcao = await prisma.correcao.findUnique({ where: { id } })
    return correcao
  },

  // Retorna o id do usuário que fez a redação 
  retornarUsuarioDaCorrecao: async (id) => {
    const usuarioId = await prisma.correcao.findMany({
      where: { id },
      select: {
        redacao: {
          select: {
            usuarioId: true,

          },
        },
      },
    });

    return usuarioId
  },
    
  // Cria uma nova correção
  crieNovaCorreção: async (data) => {
    const correcao = new Correcao(data);
    const novaCorrecao = await prisma.correcao.create({data: correcao});
    return novaCorrecao;
  },

  // Deletar uma correção
  deletarUmaCorrecao: async (id) => {
    const correcaoDeletada = await prisma.correcao.delete({ 
      where: { id }, select: { id: true } 
    })

    return correcaoDeletada
  },
  retornarCorrecoesAluno: async (id) => {
    // retornar todas as correcoes do aluno e todas as suas informacoes
    const correcoes = await prisma.correcao.findMany({ 
      where: { redacao: { usuarioId: id } },
     })
    
      
    return correcoes
  }
}

module.exports = correcoesRepository