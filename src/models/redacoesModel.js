const redacoesRepository = require("../repositories/redacoesRepository")
const { criarRedacaoSchema } = require("../schemas/redacoesSchema")
const deletarArquivoRedacao = require("../utils/deletarArquivoRedacao")
const usuariosModel = require("./usuariosModel")

const redacoesModel = {
  retornarRedacoes: async (usuarioId = false) => {
    // Buscando todas as redações
    if (!usuarioId) return await redacoesRepository.retorneTodasAsRedacoes()

    // Buscando as redações de um usuário específico
    return await redacoesRepository.retorneTodasAsRedacoes(usuarioId)
  },

  // Buscando uma redação
  retornarRedacao: async (id) => {
    const redacao = await redacoesRepository.retornaUmaRedacao(id)
    if (!redacao) throw new HttpError(404, "Essa redação não existe.")
    return redacao
  },

  // Criando uma redação
  criarRedacao: async (data) => {
    // Vericando se o corpo da requisição respeita o formato de validação do zod
    const corpo = criarRedacaoSchema.safeParse(data)
    
    if (!corpo.success) {
      throw new HttpError(400, "Erro de validação: Verifique se os dados enviados estão corretos.")
    } 

    // Verificando se o usuário existe
    const usuarioExiste = await usuariosModel.retornarUmUsuario(corpo.data.usuarioId)
    if (!usuarioExiste) throw new HttpError(404, "Esse usuário não existe.")

    // Se o usuário tiver 20 redações no total, deletamos a sua redação mais antiga
    const redacoes = await redacoesRepository.retorneTodasAsRedacoes(corpo.data.usuarioId)

    if (redacoes.quantidadeRedacoes === 20) {
      const redacaoMaisAntiga = await redacoesRepository.retorneRedacaoMaisAntiga(corpo.data.usuarioId)
      deletarArquivoRedacao(redacaoMaisAntiga.caminho)
      await redacoesRepository.deletarUmaRedacao(redacaoMaisAntiga.id)
    }

    // Salva a nova redação no bando de dados
    const redacao = await redacoesRepository.crieNovaRedacao(corpo.data)
    return redacao
  }
}

module.exports = redacoesModel