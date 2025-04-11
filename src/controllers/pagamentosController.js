const pagamentosModel = require("../models/pagamentosModel")

const pagamentosController = {
  // GET /pagamentos 
  index: async (req, res, next) => {
    try {
      const resposta = await pagamentosModel.retornarPagamentos()
      res.status(200).json({ data: resposta })
    } catch (erro) {
      next(erro);
    }
  }, 

  // POST /pagamentos
  create: async (req, res, next) => {
    try {
      const corpoDaRequisicao = req.body
      const novoPagamento = await pagamentosModel.criarPagamento(corpoDaRequisicao)
      return res.status(200).json({ message: "novo pagamento efetuado com sucesso.", data: novoPagamento})
    } 
    catch(error){
      next(error)
    }
  },
  update: async(req, res, next) => {
    try {
      const corpoDaRequisicao = req.body
      const resposta = await pagamentosModel.updatePagamento(corpoDaRequisicao)
      console.log(corpoDaRequisicao)
      res.status(200).json({ message: "usuário atualizado com sucesso.", data: resposta })
    } catch(erro){

    }
  }
}

module.exports = pagamentosController