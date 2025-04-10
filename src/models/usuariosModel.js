const usuariosRepository = require("../repositories/usuariosRepository")
const HttpError = require("../error/HttpError")

const usuariosModel = {
  retornarUsuarios: async () => {
    const usuarios = await usuariosRepository.retorneTodosOsUsuarios()
    return usuarios
  },

  criarUsuario: async (data) => {
    // Verificando se o email já foi cadastrado
    const emailExiste = await usuariosRepository.retorneUmUsuarioPeloEmail(data.email)
    if (emailExiste) throw new HttpError(409, "Esse email já foi cadastrado no sistema.")

    const usuario = await usuariosRepository.crieNovoUsuario(data)
    return usuario
  }
}

module.exports = usuariosModel