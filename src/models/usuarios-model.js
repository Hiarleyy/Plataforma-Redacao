const usuariosRepository = require("../repositories/usuarios-repository")
const HttpError = require("../error/http-error")
const { criarUsuarioSchema, atualizarUsuarioSchema } = require("../schemas/usuarios-schema")
const turmaModel = require("./turmas-model")

const usuariosModel = {
  retornarUsuarios: async (filter) => {
    if (filter) {
      const usuarios = await usuariosRepository.retorneAlunosPorNome(filter)
      return usuarios
    }
    
    const usuarios = await usuariosRepository.retorneTodosOsUsuarios()
    return usuarios
  },

  retornarUmUsuario: async (id) => {
    const usuario = await usuariosRepository.retorneUmUsuarioPeloId(id)
    if (!usuario) throw new HttpError(404, "esse usuário não existe.")
    return usuario
  },

  criarUsuario: async (data) => {
    // Vericando se o corpo da requisição respeita o formato de validação do zod
    const corpo = criarUsuarioSchema.safeParse(data)
    
    if (!corpo.success) {
      throw new HttpError(400, "Erro de validação: Verifique se os dados enviados estão corretos.")
    } 

    // Verificando se a turma existe
    await turmaModel.retornarTurma(corpo.data.turmaId)

    // Verificando se o email já foi cadastrado
    const emailExiste = await usuariosRepository.retorneUmUsuarioPeloEmail(corpo.data.email)
    if (emailExiste) throw new HttpError(409, "Esse email já foi cadastrado no sistema.")

    const usuario = await usuariosRepository.crieNovoUsuario(corpo.data)
    return usuario
  },

  atualizarUsuario: async (id, data) => {
    // Vericando se o corpo da requisição respeita o formato de validação do zod
    const corpo = atualizarUsuarioSchema.safeParse(data)
    
    if (!corpo.success) {
      throw new HttpError(400, "Erro de validação: Verifique se os dados enviados estão corretos.")
    } 

    // Verificando se o usuário existe
    await usuariosModel.retornarUmUsuario(id)

    const usuarioAtualizado = await usuariosRepository.atualizeUmUsuario(id, corpo.data)
    return usuarioAtualizado
  },

  deletarUsuario: async (id) => {
    // Verificando se o usuário existe
    await usuariosModel.retornarUmUsuario(id)

    const usuarioDeletado = await usuariosRepository.deleteUmUsuario(id)
    return usuarioDeletado
  }
}

module.exports = usuariosModel