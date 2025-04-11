const prisma = require("../database/db")
const Usuario = require("../entities/Usuario")

const usuariosRepository = {
  // Retorna todos os usuários do bando de dados
  retorneTodosOsUsuarios: async () => {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        tipoUsuario: true
      },
    })

    return usuarios
  },

  // Retorna um usuário específico pelo id
  retorneUmUsuarioPeloId: async (id) => {
    const usuario = await prisma.usuario.findUnique({ where: { id } })
    return usuario
  },

   // Retorna um usuário específico pelo email
   retorneUmUsuarioPeloEmail: async (email) => {
    const usuario = await prisma.usuario.findUnique({ where: { email } })
    return usuario
  },

  // Crie um novo usuário
  crieNovoUsuario: async (data) => {
    const usuario = new Usuario(data)
    const novoUsuario = await prisma.usuario.create({ data: usuario })
    return novoUsuario
  },

  // Atualize um usuário
  atualizeUmUsuario: async (id, data) => {
    const usuarioAtualizado = await prisma.usuario.update({
      data,
      where: { id }
    })

    return usuarioAtualizado
  },

  // Delete um usuário
  deleteUmUsuario: async (id) => {
    const usuarioDeletado = await prisma.modulo.delete(
      { where: { id }, select: { id: true, nome: true } }
    )

    return usuarioDeletado
  }
}

module.exports = usuariosRepository