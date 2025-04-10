const pagamentosModel = require("../models/pagamentosModel");

const pagamentosController = {
  // GET /pagamentos 
  index: async (req, res, next) => {
    try {
      const resposta = await pagamentosModel.retornarPagamentos();
      res.status(200).json({ data: resposta });
    } catch (erro) {
      next(erro);
    }
  }, 

  // POST /pagamentos
  create: async (req, res, next) => {
    try {
      const corpoDaRequisicao = req.body
      const novoPagamento = await pagamentosModel.criarPagamento(corpoDaRequisicao)
      return res.status(201).json({ message: "novo pagamento efetuado com sucesso.", data: novoPagamento})
    } 
    catch(error){
      next(error)
    }
  }
}

module.exports = pagamentosController