const turmasRepository = require("../repositories/turmas-repository")
const HttpError = require("../error/http-error")
const { criarTurmaSchema, atualizarTurmaSchema } = require("../schemas/turmas-schema")

const turmasModel = {
  retornarTurmas: async () => {
    const turmas = await turmasRepository.retorneTodasAsTurmas()
    return turmas
  },

  retornarTurma: async (id) => {
    const turma = await turmasRepository.retorneUmaTurmaPeloId(id)
    if (!turma) throw new HttpError(404, "essa turma não existe.")
    return turma
  },

  criarTurma: async (data) => {
    // Vericando se o corpo da requisição respeita o formato de validação do zod
    const corpo = criarTurmaSchema.safeParse(data)
    
    if(!corpo){
      throw new HttpError(404, "Erro de validação: Verifique se os dados enviados estão corretos.")
    }

    // Verificando se já existe alguma turma com esse nome
    const nomeExiste = await turmasRepository.retorneUmaTurmaPeloNome(data.nome)
    if (nomeExiste) throw new HttpError(409, "Já existe uma turma com esse nome.")

    const turma = await turmasRepository.crieNovaTurma(data)
    return turma
  },

  atualizarTurma: async(id, data) =>{
    // Vericando se o corpo da requisição respeita o formato de validação do zod
    const corpo = atualizarTurmaSchema.safeParse(data)

    if(!corpo){
      throw new HttpError(404, "Erro de validação: Verifique se os dados enviados estão corretos.")
    }

    // Verificar se a turma existe
    await turmasModel.retornarTurma(id)

    const turmaAtualizada = turmasRepository.atualizarUmaTurma(id, corpo.data)
    return turmaAtualizada
  },

  deletarTurma: async (id) =>{
    // Verificar se a turma existe
    await turmasModel.retornarTurma(id)

    const deletarTurma = await turmasRepository.deletarUmaTurma(id)
    return deletarTurma
  }
}

module.exports = turmasModel