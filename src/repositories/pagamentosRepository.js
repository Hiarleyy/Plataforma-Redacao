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
    const novoPagamento = await prisma.pagamento.create({data: pagamento});
    return novoPagamento
  },
  updatePagamento: async (id,bodyUpdated ) => {
    const updatePagamento = await prisma.pagamento.update({
      data: {
        usuarioId: bodyUpdated.usuarioId,
        valor: bodyUpdated.valor,
        dataVencimento:bodyUpdated.dataVencimento,
      },
      where: {
        id
      }
    })
    return updatePagamento
  }
};

module.exports = pagamentosRepository