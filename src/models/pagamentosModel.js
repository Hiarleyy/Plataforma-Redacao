const pagamentosRepository = require("../repositories/pagamentosRepository")
const usuariosRepository = require("../repositories/usuariosRepository")
const {criarPagamentoSchema}  = require("../schemas/pagamentoSchema")
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
  updatePagamento: async(data) => {
    const corpo = criarPagamentoSchema.safeParse(data)
    if (!corpo.success) {
      throw new HttpError(400, "Erro de validação: Verifique se os dados enviados estão corretos.");
    } 
    const idUsuarioExistente = await usuariosRepository.retorneUmUsuarioPeloId(corpo.data.usuarioId)
    if(!idUsuarioExistente) throw new HttpError(409, "Esse usuário não está cadastrado no sistema.")

    const updatePagamento = await pagamentosRepository.updatePagamento(corpo.data)
    return updatePagamento
  }
}

module.exports = pagamentosModel
