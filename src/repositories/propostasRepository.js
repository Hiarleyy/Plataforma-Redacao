const prisma = require("../database/db")
const Proposta = require("../entities/Proposta")
const { v4: uuid } = require("uuid")

const propostasRepository = {
  retorneTodasAsPropostas: async () => {
    // Retorna todas as redações de um usuário específico
    const propostas = await prisma.proposta.findMany();
    const quantidadedePropostas = await prisma.proposta.count()
    return { propostas, quantidadedePropostas };
  },
  // Retorna a redação mais antiga de um usário
  retornePropostaMaisAntiga: async () => {
    const proposta = await prisma.proposta.findFirst({orderBy: { data: "asc" }})  
    return proposta
  },
  retorneUmaProposta: async (id) =>{
    const proposta = await prisma.proposta.findUnique({where: { id }})
    return proposta
  },
  // Cria uma nova redação
  crieNovaProposta: async (data) => {
    const proposta = new Proposta(data);
    const novaProposta = await prisma.proposta.create({data: proposta})
    return novaProposta;
  },

  deletarUmaProposta: async (id) => {
    const propostaDeletada = await prisma.proposta.delete({ 
      where: { id }, select: { id: true, tema: true } 
    })

    return propostaDeletada
  }
}

module.exports = propostasRepository
