const { v4: uuid } = require("uuid");

class Pagamento {
  constructor(pagamento) {
    this.id = uuid();
    this.usuarioId = pagamento.usuarioId,
    this.dataVencimento = pagamento.dataVencimento,
    this.valor = pagamento.valor
  }
}

module.exports = Pagamento;