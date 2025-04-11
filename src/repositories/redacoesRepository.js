const prisma = require("../database/db");
const { v4: uuidv4 } = require("uuid");
const Redacao = require("../entities/Redacao");


const redacoesRepository = {
    // Retorna todas as redações do banco de dados
    listarRedacoes: async () => {
        const redacoes = await prisma.redacao.findMany();
        return redacoes;
    },
    
    // Cria uma nova redação
    criarRedacao: async (data) => {
        const redacao = new Redacao(data);
        const novaRedacao = await prisma.redacao.create({data: redacao});
        return novaRedacao;
    },



}

module.exports = redacoesRepository
