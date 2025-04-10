const pagamentosRepository = require("../repositories/pagamentosRepository")

const pagamentosModel = {
  retornarPagamentos: async() =>{
    const pagamentos = await pagamentosRepository.retorneTodosOsPagamentos()
    return pagamentos
  },

  criarPagamento: async (data) => {}
}

module.exports = pagamentosModel
