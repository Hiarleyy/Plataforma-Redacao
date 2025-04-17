
const prisma = require('../database/db')
const Frquencia = require("../entities/Frequencia")


const frequenciasRepository= {

    crieNovaFrequencia: async(data)=>{
        const frequencia = new Frquencia(data)
        const novaFrequencia = await prisma.frequencia.create({data: frequencia})
        return novaFrequencia
    },
    retornarUmaFrequenciaPeloId: async (id) => {
        const frequencia = await prisma.frequencia.findUnique({where: {id}})
        return frequencia
    },
    retorneTodasAsFrequencias: async(usuarioId = false) =>{
        let frequencias
        let quantidadeFrequencia

        if(!usuarioId){
            frequencias = await prisma.frequencia.findMany()
            quantidadeFrequencia = await prisma.frequencia.count()
            return {frequencias, quantidadeFrequencia}
        }

        frequencias = await prisma.frequencia.findMany({where: {usuarioId}})
        quantidadeFrequencia = await prisma.frequencia.count({where: {usuarioId}})
        return {frequencias, quantidadeFrequencia}

    },

    updateFrequencia: async(id, data) =>{
        const updateFrequencia = await prisma.frequencia.update({
            data, 
            where: {id}
        })
    return updateFrequencia
    },

    deletarUmaFrequencia: async(id) => {
        const frequenciaDeletada = await prisma.frequencia.delete({
            where: {id}
        })
    return frequenciaDeletada
    }

}

module.exports = frequenciasRepository
