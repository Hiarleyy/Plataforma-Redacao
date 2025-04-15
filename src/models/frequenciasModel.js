const frequenciasRepository = require("../repositories/frequenciaRepository")
const {criarFrequenciaSchema, atualizarFrequenciaSchema } = require("../schemas/frequenciaSchema")
const HttpError = require("../error/HttpError")
const usuariosRepository = require("../repositories/usuariosRepository")
const turmaRepository = require("../repositories/turmaRepository")


const frequenciasModel = {

    criarFrequencia: async (data) => {
        const corpo = criarFrequenciaSchema.safeParse(data)
        if (!corpo.success) {
            throw new HttpError(400, "Erro de validação: Verifique se os dados enviados está corretos.")
        }

        // Verificando se o aluno existe
        const alunoExiste = await usuariosRepository.retorneUmUsuarioPeloId(corpo.data.usuarioId)
        if (!alunoExiste) throw new HttpError(404, "Esse aluno nao existe.")
        
        // Verificando se a turma existe
        const turmaExiste = await turmaRepository.retorneUmaTurmaPeloId(corpo.data.turmaId)
        if (!turmaExiste) throw new HttpError(404, "Essa turma nao existe.")

        return await frequenciasRepository.crieNovaFrequencia(corpo.data)
    }, 
    retornarFrequencia: async (id) =>{
        const frequencia = await frequenciasRepository.retornarUmaFrequenciaPeloId(id)
        if (!frequencia){
            throw new HttpError(404, "Frequência não encontrada")
        }
        return frequencia
    },
    retornarFrequencias: async (usuarioId = false) => {

        if(!usuarioId) return await frequenciasRepository.retorneTodasAsFrequencias()

        return await frequenciasRepository.retorneTodasAsFrequencias(usuarioId)
    },
    atualizarFrequencia: async(id, data) =>{
        const corpo = atualizarFrequenciaSchema.safeParse(data)
        if (!corpo.success) {
            throw new HttpError(400, "Erro de validação: Verifique se os dados enviados está corretos.")
        }
        // verificar se a frequencia existe
        const frequenciaExistente = await frequenciasRepository.retornarUmaFrequenciaPeloId(id)
        if(!frequenciaExistente) throw new HttpError (404, "Essa frequência não existe!")
        
        const updateFrequencia = await frequenciasRepository.updateFrequencia(id, corpo.data)
        return updateFrequencia
        
    },
    deletarFrequencia: async (id) => {

        const frequenciaExistente = await frequenciasRepository.retornarUmaFrequenciaPeloId(id)
        if(!frequenciaExistente) throw new HttpError (404, "Essa frequência nao existe!")
        
        const frequenciaDeletada = await frequenciasRepository.deletarUmaFrequencia(id)
    return frequenciaDeletada
    }
}

module.exports = frequenciasModel