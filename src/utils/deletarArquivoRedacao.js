const fs = require("fs")
const path = require("path")

const deletarArquivoRedacao = (nomeArquivo) => {
  const caminhoArquivo = path.join(__dirname, "..", "uploads", "redacoes", nomeArquivo)

  if (fs.existsSync(caminhoArquivo)) {
    return fs.unlinkSync(caminhoArquivo)
  }

  console.warn("Arquivo não encontrado:", caminhoArquivo)
}

module.exports = deletarArquivoRedacao