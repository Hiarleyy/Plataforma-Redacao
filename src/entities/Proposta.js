
const { v4: uuid } = require("uuid");

class Proposta {
  constructor(proposta) {
    this.id = uuid();
    this.tema = proposta.tema,
    this.caminho = proposta.caminho,
    this.data = proposta.data
  }
}

module.exports = Proposta;