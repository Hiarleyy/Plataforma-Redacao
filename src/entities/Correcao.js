const { v4: uuid } = require("uuid");

class Correcao {
  constructor(correcao) {
    this.id = uuid();
    this.nota = correcao.nota;
    this.caminho = correcao.caminho;
    this.data = new Date();
    this.feedback = correcao.feedback
    this.competenciaId = correcao.competenciaId;
    this.redacaoId = correcao.redacaoId;
  }
}

module.exports = Correcao;
