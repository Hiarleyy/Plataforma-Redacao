const usuariosRepository = require("../repositories/usuariosRepository")
const HttpError = require("../error/HttpError")
const { criarUsuarioSchema, atualizarUsuarioSchema } = require("../schemas/usuariosSchema")

const usuariosModel = {
  retornarUsuarios: async () => {
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
    const usuarioExiste = await usuariosRepository.retorneUmUsuarioPeloId(id)
    if (!usuarioExiste) throw new HttpError(404, "esse usuário não existe.")

    const usuarioAtualizado = await usuariosRepository.atualizeUmUsuario(id, corpo.data)
    return usuarioAtualizado
  },

  deletarUsuario: async (id) => {
     // Verificando se o usuário existe
     const usuarioExiste = await usuariosRepository.retorneUmUsuarioPeloId(id)
     if (!usuarioExiste) throw new HttpError(404, "esse usuário não existe.")

    const usuarioDeletado = await usuariosRepository.deleteUmUsuario(id)
    return usuarioDeletado
  }
}

module.exports = usuariosModel