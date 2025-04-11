const prisma = require("../database/db")
const Pagamento = require("../entities/Pagamento")

const pagamentosRepository = {
  // Retorna todos os pagamentos do bando de dados
  retorneTodosOsPagamentos: async () => {
    const pagamentos = await prisma.pagamento.findMany()
    return pagamentos
  },

  // Crie um novo pagamento
  crieNovoPagamento: async (data) => {
    const pagamento = new Pagamento(data)
    
    const novoPagamento = await prisma.pagamento.create({
      data: pagamento,
      select: {
        id: true,
        usuarioId: true,
        dataVencimento: true,
        valor: true,
      },
    });

    return novoPagamento
  },
};

module.exports = pagamentosRepository