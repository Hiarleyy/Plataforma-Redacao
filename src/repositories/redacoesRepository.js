const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

async function criarRedacao({ titulo, caminho, usuarioId }) {
  return await prisma.redacao.create({
    data: {
      id: uuidv4(),
      titulo,
      caminho,
      usuarioId,
    },
  });
}

async function listarRedacoes() {
  return await prisma.redacao.findMany();
}

module.exports = {
  criarRedacao,
  listarRedacoes,
};
