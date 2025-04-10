const { v4: uuid } = require("uuid");

class Redacao {
  constructor(redacao) {
    this.id = uuid();
    this.titulo = redacao.titulo;
    this.caminho = redacao.caminho;
    this.data = redacao.data;
    this.status = redacao.status;
    this.usuarioId = redacao.usuarioId; 
  }
}

module.exports = Redacao;
