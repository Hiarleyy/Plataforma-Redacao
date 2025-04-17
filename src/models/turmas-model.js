const turmaRepository = require("../repositories/turmas-repository")
const HttpError = require("../error/http-error")
const {atualizarTurmaSchema} = require("../schemas/turmas-schema")


const turmaModel = {
  retornarTurmas: async () => {
    const turmas = await turmaRepository.retorneTodasAsTurmas()
    return turmas
  },

  retornarTurma: async (id) => {
    const TurmaExistente = await turmaRepository.retorneUmaTurmaPeloId(id)
    if (!TurmaExistente){
      throw new HttpError (404, "Essa turma nao existe.")
    }
    const turma = await turmaRepository.retorneUmaTurmaPeloId(id)
    return turma
    
  },

  criarTurma: async (data) => {
    // Verificando se já existe alguma turma com esse nome
    const nomeExiste = await turmaRepository.retorneUmaTurmaPeloNome(data.nome)
    if (nomeExiste) throw new HttpError(409, "Já existe uma turma com esse nome.")

    const turma = await turmaRepository.crieNovaTurma(data)
    return turma
  },
  atualizarTurma: async(id, data) =>{
    const corpo = atualizarTurmaSchema.safeParse(data)
    if(!corpo){
      throw new HttpError(404, "Erro de validação: Verifique se os dados enviados estão corretos.")
    }
    // Verificar se a turma existe
    const TurmaExistente = await turmaRepository.retorneUmaTurmaPeloId(id)
    if (!TurmaExistente){
      throw new HttpError (404, "Essa turma nao existe.")
    }
    const updateTurma = turmaRepository.updateUmaTurma(id, corpo.data)
    return updateTurma

  },
  deletarTurma: async (id) =>{
    const deletarTurma = await turmaRepository.deletarUmaTurma(id)
    return deletarTurma
    
  }
}

module.exports = turmaModel