const { response } = require("express");
const frequenciaModel = require("../models/frequenciasModel");

const frequenciasController = {
  // retornar todas as frequencias ou uma frequencia espercifica

  create: async (req, res, next) => {
    try{
      corpoDaRequisicao = req.body
      const resposta = await frequenciaModel.criarFrequencia(corpoDaRequisicao)
      res.status(200).json({ message: "Frequencia criada com sucesso.", data: resposta })
    }
  catch(error){
    next(error)
  }
  },
  show: async (req, res, next) => {
    try{
      const { id } = req.params
      const resposta = await frequenciaModel.retornarFrequencia(id)
      res.status(200).json({ data: resposta })

    }
    catch(error){
      next(error)
    }
  },
  index: async(req, res, next ) => {
    try{
      const {usuarioId} = req.body
      let resposta

      if(!usuarioId){
        resposta = await frequenciaModel.retornarFrequencias()
        res.status(200).json({ data: resposta.frequencias })
      }
      resposta = await frequenciaModel.retornarFrequencias(usuarioId)
      res.status(200).json({ data: resposta.frequencias })
    }
  catch(error){
    next (error)
  }
  },
  update: async (req, res, next) =>{
    try{
      const {id} = req.params
      const corpoDaRequisicao = req.body

      resposta = await frequenciaModel.atualizarFrequencia(id, corpoDaRequisicao)
      res.status(200).json({ message: "Frequencia atualizada", data: resposta })

    }
    catch(error){
     next(error) 
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params
      const resposta = await frequenciaModel.deletarFrequencia(id)
      res.status(200).json({ message: "Frequencia deletada com sucesso.", data: resposta })
    } catch (error) {
      next(error)
    }
  }



};

module.exports = frequenciasController;
