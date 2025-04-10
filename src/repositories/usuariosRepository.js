const prisma = require("../database/db")

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
    });

    return usuarios;
  },

}

module.exports = usuariosRepository