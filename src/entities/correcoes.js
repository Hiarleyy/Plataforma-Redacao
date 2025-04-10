const { v4: uuid } = require("uuid");

class Correcao {
  constructor(correcao) {
    this.id = uuid();
    this.nota = correcao.nota;
    this.caminho = correcao.caminho;
    this.data = correcao.data;
    this.competencias_id = correcao.competencias_id;
    this.redacao_id = correcao.redacao_id;
}
}

module.exports = Correcao;
