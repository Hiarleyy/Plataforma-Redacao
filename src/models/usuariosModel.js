const usuariosRepository = require("../repositories/usuariosRepository")
const HttpError = require("../error/HttpError")
const { criarUsuarioSchema } = require("../schemas/usuariosSchema")

const usuariosModel = {
  retornarUsuarios: async () => {
    const usuarios = await usuariosRepository.retorneTodosOsUsuarios()
    return usuarios
  },

  criarUsuario: async (data) => {
    // Vericando se o corpo da requisição respeita o formato de validação do zod
    const corpo = criarUsuarioSchema.safeParse(data)
    
    if (!corpo.success) {
      throw new HttpError(400, "Erro de validação: Verifique se os dados enviados estão corretos.");
    } 

    // Verificando se o email já foi cadastrado
    const emailExiste = await usuariosRepository.retorneUmUsuarioPeloEmail(corpo.data.email)
    if (emailExiste) throw new HttpError(409, "Esse email já foi cadastrado no sistema.")

    const usuario = await usuariosRepository.crieNovoUsuario(corpo.data)
    return usuario
  }
}

module.exports = usuariosModel