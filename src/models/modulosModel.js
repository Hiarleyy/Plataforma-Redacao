const modulosRepository = require("../repositories/modulosRepository")
const videosRepository = require("../repositories/videosRepository")
const getPlaylistVideos = require("../utils/getPlaylistVideos")
const HttpError = require("../error/HttpError")

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
  }
}

module.exports = modulosModel