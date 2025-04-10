const { v4: uuid } = require("uuid");

class Frequencia {
  constructor(frequencia) {
    this.id = uuid();
    this.usuario_id = frequencia.usuario_id;
    this.turma_id = frequencia.turma_id;
    this.status = frequencia.status;
    this.justificativa = frequencia.justificativa;
    this.data = frequencia.data; 
  }
}

module.exports = Frequencia;
