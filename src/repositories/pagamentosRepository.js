
const prisma = require("../database/db");
const Pagamento = require("../entities/Pagamento");

const pagamentosRepository = {
  // retorna todos os pagamentos
  retorneTodosOsPagamentos: async () => {
    const pagamentos = await prisma.pagamento.findMany({
      select: {
        id: true,
        usuarioId: true,
        dataVencimento: true,
        dataPagamento: true,
        valor: true,
      },
    });
    return pagamentos;
  },
  createPagamento: async (usuarioId, dataVencimento, dataPagamento, valor) => {
    const pagamento = new Pagamento(usuarioId, dataVencimento, dataPagamento, valor);
    
    const novoPagamento = await prisma.pagamento.create({
      data: pagamento,
      select: {
        id: true,
        usuarioId: true,
        dataVencimento: true,
        dataVencimento: true,
        valor: true,
      },
    });
    return novoPagamento;
  },
};

module.exports = pagamentosRepository;