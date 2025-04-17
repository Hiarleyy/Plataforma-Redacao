const modulosRepository = require("../repositories/modulos-repository")
const videosRepository = require("../repositories/videos-repository")
const getPlaylistVideos = require("../utils/get-playlist-videos")
const HttpError = require("../error/http-error")

const modulosModel = {
  retornarModulos: async () => {
    const modulos = await modulosRepository.retorneTodosOsModulos()
    return modulos
  },

  retornarUmModulo: async (id) => {
    const modulo = await modulosRepository.retorneUmModuloPeloId(id)
    if (!modulo) throw new HttpError(404, "esse modulo não existe.")
    return modulo
  },

  criarModulo: async (data) => {
    // Adicionar a validação com o zod
    const modulo = await modulosRepository.crieNovoModulo(data)

    const videos = await getPlaylistVideos(data.playlistUrl)
    for (let i = 0; i < videos.length; i++) {
      await videosRepository.crieNovoVideo({
        titulo: videos[i].titulo,
        url: videos[i].url,
        ordem: videos[i].ordem,
        thumbnail: videos[i].thumbnail,
        moduloId: modulo.id
      })
    }
    return modulo
  }, 

  deletarModulo: async (id) => {
    const moduloDeletado = await modulosRepository.deleteUmModulo(id)
    return moduloDeletado
  },

  atualizarModulo: async (id, data) => {
    const modulo = await modulosRepository.retorneUmModuloPeloId(id)
    if (!modulo) throw new HttpError(404, "esse modulo não existe.")
      
    const moduloAtualizado = await modulosRepository.atualizeUmModulo(id, data)
    return moduloAtualizado
  }
}

module.exports = modulosModel