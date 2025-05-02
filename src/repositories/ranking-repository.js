const prisma = require("../database/db")

const rankingRepository = {
  listarRankingDeAlunos: async () => {
    const ranking = await prisma.$queryRaw`
      SELECT 
        u.id,
        u.nome,
        t.nome AS turma,
        ROUND(AVG(c.nota), 2) AS media
      FROM "Usuario" u
      JOIN "Turma" t ON u."turmaId" = t.id
      JOIN "Redacao" r ON u.id = r."usuarioId"
      JOIN "Correcao" c ON r.id = c."redacaoId"
      WHERE r.status = 'CORRIGIDA'
      GROUP BY u.id, u.nome, t.nome
      ORDER BY media DESC;
    `;

    return ranking;
  }
}

module.exports = rankingRepository