
const { v4: uuid } = require("uuid");

class Pagamento {
  constructor(pagamento) {
    this.id = uuid();
    this.tipoDespensa = pagamento.tipoDespensa,
    this.dataPagamento = pagamento.dataPagamento,
    this.valor = pagamento.valor,
    this.status = pagamento.status
  }
}

module.exports = Pagamento;