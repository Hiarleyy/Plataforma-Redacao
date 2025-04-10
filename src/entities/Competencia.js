const { v4: uuid } = require("uuid");

class Competencia {
  constructor(competencia) {
    this.id = uuid();
    this.competencia01 = competencia.competencia01;
    this.competencia02 = competencia.competencia02;
    this.competencia03 = competencia.competencia03;
    this.competencia04 = competencia.competencia04;
    this.competencia05 = competencia.competencia05;
  }
}

module.exports = Competencia;
