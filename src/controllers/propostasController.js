const propostasRepository = require("../repositories/propostasRepository");
const { criarPropostaSchema } = require("../schemas/propostaSchema");
const HttpError = require("../error/HttpError");
const deletarPropostaRedacao = require("../utils/deletarPropostaRedacao");
const propostasModel = require("../models/propostasModel");
const propostasController = {
  
  index: async (req, res, next) => {
    try {
      resposta = await propostasModel.retornarPropostas()
      res.status(200).json({ data: resposta.propostas });
    } catch (error) {
      next(error)
    }
  },

  create: async (req, res, next) => {
    try {
      console.log("try")
      const { tema } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "Arquivo não enviado." });
      }
      console.log("req.file")
      const resposta = await propostasModel.criarProposta({
        tema,
        caminho: req.file.filename,
      });
      console.log("resposta")
      res.status(201).json({ message: "proposta salva com sucesso!", data: resposta });
    } catch (error) {
      next(error)
    }
  },




  // continuar a partir daqui
  deletarProposta: async (req, res, next) => {
    try {
      const { id } = req.params;
      const proposta = await propostasRepository.retorneUmaProposta(id);
      if (!proposta) throw new HttpError(404, "Proposta não encontrada");

      deletarPropostaRedacao(proposta.caminho);
      await propostasRepository.deletarUmaProposta(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = propostasController;
