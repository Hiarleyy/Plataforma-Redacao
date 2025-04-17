const prisma = require("../database/db")
const Video = require("../entities/Video")

const videosRepository = {
  // Crie um novo vídeo
  crieNovoVideo: async (data) => {
    const video = new Video(data)
    const novoVideo = await prisma.video.create({ data: video })
    return novoVideo
  }
}

module.exports = videosRepository