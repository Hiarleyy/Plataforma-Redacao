const redacaoRepository = require("../repositories/redacoesRepository");

async function uploadRedacao(req, res) {
  try {
    const { titulo, usuarioId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Arquivo não enviado." });
    }

    if (!titulo || !usuarioId) {
      return res.status(400).json({ error: "Título e usuárioId são obrigatórios." });
    }

    const novaRedacao = await redacaoRepository.criarRedacao({
      titulo,
      caminho: req.file.filename,
      usuarioId,
    });

    res.status(201).json({ message: "Redação salva com sucesso!", redacao: novaRedacao });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar a redação." });
  }
}

async function listarRedacoes(req, res) {
  try {
    const redacoes = await redacaoRepository.listarRedacoes();
    res.status(200).json(redacoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar redações." });
  }
}

module.exports = {
  uploadRedacao,
  listarRedacoes,
};
