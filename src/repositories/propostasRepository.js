const prisma = require("../database/db");
const Proposta = require("../entities/Proposta");
const { v4: uuid } = require("uuid");

const propostasRepository = {
  // Retorna todas as propostas
  retorneTodasAsPropostas: async () => {
    const propostas = await prisma.proposta.findMany();
    return propostas;
  },

  // Retorna a proposta mais antiga (global)
  retornePropostaMaisAntiga: async () => {
    const proposta = await prisma.proposta.findFirst({
      orderBy: { data: "asc" }, // substitua 'data' pelo nome correto do campo de criação
    });
    return proposta;
  },

  // Retorna uma proposta específica pelo ID
  retorneUmaProposta: async (id) => {
    const proposta = await prisma.proposta.findUnique({
      where: { id },
    });
    return proposta;
  },

  // Cria uma nova proposta
  crieNovaProposta: async (data) => {
    const proposta = new Proposta(data);
    const novaProposta = await prisma.proposta.create({ data: proposta });
    return novaProposta;
  },

  // Deleta uma proposta pelo ID
  deletarUmaProposta: async (id) => {
    const propostaDeletada = await prisma.proposta.delete({
      where: { id },
      select: { id: true, tema: true },
    });
    return propostaDeletada;
  },

  // Conta o total de propostas (globais)
  contarPropostas: async () => {
    const count = await prisma.proposta.count();
    return count;
  },
};

module.exports = propostasRepository;
