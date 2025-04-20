const propostasRepository = require("../repositories/propostas-repository")
const HttpError = require("../error/http-error")
const { criarPropostaSchema } = require("../schemas/propostas-schema")
const deletarArquivo = require("../utils/deletar-arquivo")

const propostasModel = {
  // Buscando todas as propostas
  retornarPropostas: async () => {
    return await propostasRepository.retorneTodasAsPropostas()
  },

  retornarUmaProposta: async (id) => {
    const proposta = await propostasRepository.retorneUmaPropostaPeloId(id)
    if (!proposta) throw new HttpError(404, "Essa Proposta Não Existe.")
      return proposta
  },
  // Buscando uma Proposta
  retornarPropostaMaisAntiga: async () => {
    const proposta = await propostasRepository.retornePropostaMaisAntiga()
    if (!proposta) throw new HttpError(404, "Essa Proposta Não Existe.")
    return proposta
  },

  //Criando uma Proposta
  criarProposta: async (data) => {
    const corpo = criarPropostaSchema.safeParse(data);
  
    if (!corpo.success) {
      throw new HttpError(400, "Erro de validação: Verifique se os dados enviados estão corretos.");
    }
    
    const propostas = await propostasRepository.retorneTodasAsPropostas()
    
    if (propostas.quantidadedePropostas === 8 ) {
      const propostaMaisAntiga = await propostasRepository.retornePropostaMaisAntiga()
      deletarArquivo(["uploads", "propostas", propostaMaisAntiga.caminho])
      await propostasRepository.deletarUmaProposta(propostaMaisAntiga.id)
    }
    // Cria a nova proposta
    const novaProposta = await propostasRepository.crieNovaProposta(corpo.data);
    return novaProposta;
  },

  // Deletando Uma Proposta
  deletarUmaProposta: async (id) => {
    const propostaDeletada = await prisma.proposta.delete({ 
      where: { id }, select: { id: true, tema: true } 
    })

    return propostaDeletada
  }
}

module.exports = propostasModel