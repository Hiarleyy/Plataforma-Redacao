const prisma = require("../database/db")

const rankingRepository = {
  listarRankingDeAlunos: async () => {
    const ranking = await prisma.$queryRaw`
      SELECT 
        u.id,
        u.nome,
        ROUND(AVG(c.nota), 2) AS media
      FROM "Usuario" u
      JOIN "Redacao" r ON u.id = r."usuarioId"
      JOIN "Correcao" c ON r.id = c."redacaoId"
      WHERE r.status = 'CORRIGIDA'
      GROUP BY u.id, u.nome
      ORDER BY media DESC;
    `;

    return ranking;
  }
}

module.exports = rankingRepository