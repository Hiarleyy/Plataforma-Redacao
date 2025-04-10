const { v4: uuid } = require("uuid");

class Pagamento {
  constructor(pagamento) {
    this.id = uuid();
    this.usuarioId = pagamento.usuarioId,
    this.dataVencimento = pagamento.dataVencimento,
    this.dataPagamento = pagamento.dataPagamento,
    this.valor = pagamento.valor
  }
}

module.exports = Pagamento;