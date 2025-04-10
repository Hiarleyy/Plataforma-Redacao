const { v4: uuid } = require("uuid");

class Video {
  constructor(videos) {
    this.id = uuid();
    this.titulo = videos.titulo;
    this.url = videos.url;
    this.ordem = videos.ordem;
    this.modulo_id = videos.modulo_id;
  }
}

module.exports = Video;
