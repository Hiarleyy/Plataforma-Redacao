const prisma = require("../database/db")
const Correcao = require("../entities/Correcao")

const correcoesRepository = {
  // Retorna todas as correções do banco de dados
  retorneTodasAsCorrecoes: async (usuarioId = false) => {
    let redacoes
    let quantidadeRedacoes

    // Retorna todas as redações
    if (!usuarioId) {
      redacoes = await prisma.redacao.findMany()
      quantidadeRedacoes = await prisma.redacao.count()
      return { redacoes, quantidadeRedacoes }
    }

    // Retorna todas as redações de um usuário específico
    redacoes = await prisma.redacao.findMany({
      where: { usuarioId }
    });

    quantidadeRedacoes = await prisma.redacao.count({ where: { usuarioId } })
  
    return { redacoes, quantidadeRedacoes };
  },

  // Retorna uma correção específica
  retornaUmaRedacao: async (id) => {
    const redacao = await prisma.redacao.findUnique({ where: { id } })
    return redacao
  },
    
  // Cria uma nova correção
  crieNovaCorreção: async (data) => {
    const correcao = new Redacao(data);
    const novaRedacao = await prisma.redacao.create({data: redacao});
    return novaRedacao;
  },

  // Deleatar uma correção
  deletarUmaCorrecao: async (id) => {
    const correcaoDeletada = await prisma.correcao.delete({ 
      where: { id }, select: { id: true, titulo: true } 
    })

    return correcaoDeletada
  }
}

module.exports = redacoesRepository