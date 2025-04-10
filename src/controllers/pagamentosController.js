
const SchemaPagamento = require("../entities/Pagamento");
const pagamentoModel = require("../models/pagamentosModel");
const HttpError = require("../error/HttpError");
const pagamentosRepository = require("../repositories/pagamentosRepository");

const pagamentosController = {
  // GET /pagamentos - obter os dados da tabela pagamentos
  index: async (req, res, next) => {
    try {
      const resposta = await pagamentoModel.retornaPagamentos();
      res.status(200).json({ data: resposta });
    } catch (erro) {
      next(erro);
    }
  }, // ajustando
  create: async (req, res, next) => {
    try {
      const body = SchemaPagamento.safeParse(req.body);
      if (!body.sucess) 
        throw new HttpError(400,"Erro de validação: Todos os campos são obrigatório.");
      
      const { usuarioId, dataVencimento, dataPagamento, valor } = body.data
      const novoPagamento = await pagamentosRepository.createPagamento( usuarioId, dataVencimento, dataPagamento, valor)
      return res.status(201).json({ message: "Novo pagamento efetuado com sucesso", data: novoPagamento})
    } 
    catch(erro){
      next(erro)
    }

    }
  }

module.exports = pagamentosController;