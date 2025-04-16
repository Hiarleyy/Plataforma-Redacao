const correcoesRepository = require("../repositories/correcoesRepository")
const redacoesRepository = require("../repositories/redacoesRepository")
const { criarCorrecaoSchema } = require("../schemas/correcaoSchema")
const redacoesModel = require("./redacoesModel")
const HttpError = require("../error/HttpError")

const correcoesModel = {
  retornarCorrecoes: async () => {
    const correcoes = await correcoesRepository.retorneTodasAsCorrecoes()
    return correcoes
  },

  // Buscando uma correção
  retornarCorrecao: async (id) => {
    const correcao = await correcoesRepository.retornaUmaCorrecao(id)
    if (!correcao) throw new HttpError(404, "Essa correção não existe.")
    return correcao
  },

  // Criando uma correção
  criarCorrecao: async (data) => {
    // Vericando se o corpo da requisição respeita o formato de validação do zod
    const corpo = criarCorrecaoSchema.safeParse(data)
    
    if (!corpo.success) {
      throw new HttpError(400, "Erro de validação: Verifique se os dados enviados estão corretos.")
    } 

    // Verificando se a redação existe
    const redacao = await redacoesModel.retornarRedacao(corpo.data.redacaoId)

    // Se o usuário tiver 20 correções no total, deletamos a sua correção mais antiga
    const usuarioId = redacao.usuarioId
    const correcoes = await redacoesModel.retornarRedacoes(usuarioId, true)

    if (correcoes.quantidadeRedacoes === 20) {
      const correcaoMaisAntiga = await redacoesRepository.retorneRedacaoMaisAntiga(usuarioId, true)
      deletarArquivoRedacao(correcaoMaisAntiga.correcao.caminho)
      await correcoesRepository.deletarUmaCorrecao(correcaoMaisAntiga.correcao.id)
    }

    // Marcando redação como corrigida
    await redacoesRepository.marcarRedacaoComoCorrigida(corpo.data.redacaoId)

    // Salva a nova correção no bando de dados
    const correcao = await correcoesRepository.crieNovaCorreção(corpo.data)
    return correcao
  }
}

module.exports = correcoesModel