const usuariosRepository = require("../repositories/usuariosRepository")

const usuariosModel = {
  retornarUsuarios: async () => {
    const usuarios = await usuariosRepository.retorneTodosOsUsuarios()
    return usuarios
  }
}

module.exports = usuariosModel