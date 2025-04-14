const propostasRepository = require("../repositories/propostasRepository");
const { criarPropostaSchema } = require("../schemas/propostaSchema");
const HttpError = require("../error/HttpError");
const deletarPropostaRedacao = require("../utils/deletarPropostaRedacao");

const propostasController = {
  listarPropostas: async (req, res, next) => {
    try {
      const propostas = await propostasRepository.retorneTodasAsPropostas();
      res.json(propostas);
    } catch (error) {
      next(error);
    }
  },

  buscarProposta: async (req, res, next) => {
    try {
      const { id } = req.params;
      const proposta = await propostasRepository.retorneUmaProposta(id);
      if (!proposta) throw new HttpError(404, "Proposta não encontrada");
      res.json(proposta);
    } catch (error) {
      next(error);
    }
  },

  criarProposta: async (req, res, next) => {
    try {
      const corpo = criarPropostaSchema.safeParse({
        usuarioId: req.body.usuarioId,
        tema: req.body.tema,
        caminho: req.file?.path
      });

      if (!corpo.success) {
        throw new HttpError(400, "Erro de validação: Verifique se os dados enviados estão corretos.");
      }

      const todasPropostas = await propostasRepository.retorneTodasAsPropostas();
      if (todasPropostas.length >= 20) {
        const maisAntiga = await propostasRepository.retornePropostaMaisAntiga();
        deletarPropostaRedacao(maisAntiga.caminho);
        await propostasRepository.deletarUmaProposta(maisAntiga.id);
      }

      const novaProposta = await propostasRepository.crieNovaProposta(corpo.data);
      res.status(201).json(novaProposta);
    } catch (error) {
      next(error);
    }
  },

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
