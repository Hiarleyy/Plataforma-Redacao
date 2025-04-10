
const pagamentosRepository = require("../repositories/pagamentosRepository")


const pagamentosModel = {
    retornaPagamentos: async() =>{
        const pagamentos = await pagamentosRepository.retorneTodosOsPagamentos()
        return pagamentos
    }

}
module.exports = pagamentosModel
