const modulosRepository = require("../repositories/modulosRepository")
const videosRepository = require("../repositories/videosRepository")
const getPlaylistVideos = require("../utils/getPlaylistVideos")
const HttpError = require("../error/HttpError")

const modulosModel = {
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
  }
}

module.exports = modulosModel