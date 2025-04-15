const express = require("express")
const usuariosController = require("./controllers/usuariosController")
const turmaController = require("./controllers/turmaController")
const pagamentosController = require("./controllers/pagamentosController")
const modulosController = require("./controllers/modulosController")
const redacoesController = require("./controllers/redacoesController")
const propostasController = require("./controllers/propostasController")
const uploadMiddleware = require("./middlewares/uploadMiddleware")
const uploadMiddlewarePropostas = require("./middlewares/uploadMiddlewarePropostas")
const frequenciasController =require("./controllers/frequenciasController")

const router = express.Router()

// Rota de teste
router.get("/teste", (req, res) => {
  res.status(200).json({ message: "Se você está lendo essa mensagem, é porque a api está funcionando." })
})

// Rotas relacionadas a usuários
router.get("/usuarios", usuariosController.index)
router.get("/usuarios/:id", usuariosController.show)
router.post("/usuarios", usuariosController.create)
router.put("/usuarios/:id", usuariosController.update)

// Rotas relacionadas a turmas
router.get("/turmas", turmaController.index)
router.post("/turmas", turmaController.create)

// Rotas relacionadas a pagamentos
router.get("/pagamentos", pagamentosController.index ) 
router.post('/pagamentos', pagamentosController.create)
router.put('/pagamentos/:id',pagamentosController.update)
router.delete('/pagamentos/:id', pagamentosController.delete)

// Rotas relacionadas a modulos
router.get("/modulos", modulosController.index)
router.get("/modulos/:id", modulosController.show)
router.post("/modulos", modulosController.create)

// Rotas relacionadas a redações
router.get("/redacoes", redacoesController.index)
router.post("/redacoes", uploadMiddleware.single("file"), redacoesController.create)
router.get("/redacoes/download/:id", redacoesController.download)

//Rotas relacionadas a propostas
router.get("/propostas", propostasController.index);
router.post("/propostas",uploadMiddlewarePropostas.single("file"),propostasController.create);


// Rotas relacionadas a frequencia
router.get("/frequencias", frequenciasController.index)
router.post("/frequencias", frequenciasController.create)
router.get("/frequencias/:id", frequenciasController.show)
router.put ("/frequencias/:id", frequenciasController.update)
router.delete("/frequencias/:id", frequenciasController.delete)

module.exports = router