const { v4: uuid } = require("uuid");

class Usuario {
  constructor(usuario) {
    this.id = uuid();
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.tipoUsuario = usuario.tipo_usuario?.toUpperCase() ?? "STANDARD";
    this.turmaId = usuario.turma_id ?? null;
    this.dataCriacao = new Date();
    this.dataAtualizacao = new Date();
  }
}

module.exports = Usuario;