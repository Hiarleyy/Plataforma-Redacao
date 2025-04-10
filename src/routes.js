const express = require("express")
const usuariosController = require("./controllers/usuariosController")

const router = express.Router()

// Rota de teste
router.get("/teste", (req, res) => {
  res.status(200).json({ message: "Se você está lendo essa mensagem, é porque a api está funcionando." })
})

// Rotas relacionadas a usuários
router.get("/usuarios", usuariosController.index)

module.exports = router