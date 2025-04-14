const turmaRepository = require("../repositories/turmaRepository")
const HttpError = require("../error/HttpError")

const turmaModel = {
  retornarTurmas: async () => {
    const turmas = await turmaRepository.retorneTodasAsTurmas()
    return turmas
  },

  retornarTurma: async (id) => {
    const turma = await turmaRepository.retorneUmaTurmaPorId(id)
    
  },

  criarTurma: async (data) => {
    // Verificando se já existe alguma turma com esse nome
    const nomeExiste = await turmaRepository.retorneUmaTurmaPeloNome(data.nome)
    if (nomeExiste) throw new HttpError(409, "Já existe uma turma com esse nome.")

    const turma = await turmaRepository.crieNovaTurma(data)
    return turma
  }
}

module.exports = turmaModel