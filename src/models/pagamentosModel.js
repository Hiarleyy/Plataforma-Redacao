const pagamentosRepository = require("../repositories/pagamentosRepository")
const usuariosRepository = require("../repositories/usuariosRepository")
const {criarPagamentoSchema, atualizarPagamentoSchema, deletarPagamentoSchema}  = require("../schemas/pagamentoSchema")
const HttpError = require("../error/HttpError")

const pagamentosModel = {
  retornarPagamentos: async() =>{
    const pagamentos = await pagamentosRepository.retorneTodosOsPagamentos()
    return pagamentos
  },

  criarPagamento: async (data) => {
    const corpo = criarPagamentoSchema.safeParse(data)
    if (!corpo.success){
      throw new HttpError(400, "Erro de validação: Verifique se os dados enviados estão corretos.");
    }
    // verificar se existe o IdUsuario
    const idUsuarioExistente = await usuariosRepository.retorneUmUsuarioPeloId(corpo.data.usuarioId)
    if(!idUsuarioExistente) throw new HttpError(409, "Esse usuário não está cadastrado no sistema.")

    const Novopagamento = await pagamentosRepository.crieNovoPagamento(corpo.data)
    return Novopagamento

  },

  atualizarPagamento: async(id, data) => {
    const corpo = atualizarPagamentoSchema.safeParse(data)
    if (!corpo.success) {
      throw new HttpError(400, "Erro de validação: Verifique se os dados enviados estão corretos.");
    } 
    // verificar pagamento se pagamento existe
    const pagamentoExistente = await pagamentosRepository.retorneUmPagamentoPeloId(id)
    if(!pagamentoExistente) throw new HttpError(404, "Esse pagamento nao existe.")
    
    const updatePagamento = await pagamentosRepository.updateUmPagamento(id, corpo.data)

    return updatePagamento
  },
  
  deletarPagamentos: async(id, data) => {
    const corpo = deletarPagamentoSchema.safeParse(data)
    if (!corpo.success) {
      throw new HttpError(400, "Erro de validação: Verifique se os dados enviados estão corretos.");
    }
    const pagamentoExistente = await pagamentosRepository.retorneUmPagamentoPeloId(id)
    if(!pagamentoExistente) throw new HttpError(404, "Esse pagamento não exite")
    
    const deletePagamento = await pagamentosRepository.deleteUmPagamento(id, corpo.data)
    return deletePagamento
  }
}

module.exports = pagamentosModel
