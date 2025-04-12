const fs = require("fs")
const path = require("path")

const deletarArquivoRedacao = (nomeArquivo) => {
  console.log("entrou na função")
  const caminhoArquivo = path.join(__dirname, "..", "uploads", "redacoes", nomeArquivo)

  if (fs.existsSync(caminhoArquivo)) {
    console.log("chegou aqui")
    return fs.unlinkSync(caminhoArquivo)
  }

  console.warn("Arquivo não encontrado:", caminhoArquivo)
}

module.exports = deletarArquivoRedacao