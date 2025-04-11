const express = require("express")
const usuariosController = require("./controllers/usuariosController")
const turmaController = require("./controllers/turmaController")
const pagamentosController = require("./controllers/pagamentosController")
const modulosController = require("./controllers/modulosController")

const router = express.Router()

// Rota de teste
router.get("/teste", (req, res) => {
  res.status(200).json({ message: "Se você está lendo essa mensagem, é porque a api está funcionando." })
})

// Rotas relacionadas a usuários
router.get("/usuarios", usuariosController.index)
router.post("/usuarios", usuariosController.create)

// Rotas relacionadas a turmas
router.get("/turmas", turmaController.index)
router.post("/turmas", turmaController.create)

// Rotas relacionadas a pagamentos
router.get("/pagamentos", pagamentosController.index ) 
router.post('/pagamentos', pagamentosController.create)
router.put('/pagamentos/:id',pagamentosController.update )

// Rotas relacionadas a modulos
router.get("/modulos", modulosController.index)
router.get("/modulos/:id", modulosController.show)
router.post("/modulos", modulosController.create)

module.exports = router