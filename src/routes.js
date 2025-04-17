const express = require("express")
const usuariosController = require("./controllers/usuarios-controller")
const turmaController = require("./controllers/turmas-controller")
const pagamentosController = require("./controllers/pagamentos-controller")
const modulosController = require("./controllers/modulos-controller")
const redacoesController = require("./controllers/redacoes-controller")
const propostasController = require("./controllers/propostas-controller")
const uploadRedacoes = require("./middlewares/upload-redacoes")
const uploadPropostas = require("./middlewares/upload-propostas")
const uploadCorrecoes = require("./middlewares/upload-correcoes")
const frequenciasController = require("./controllers/frequencias-controller")
const correcoesController = require("./controllers/correcoes-controller")

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
router.delete("/usuarios/:id", usuariosController.delete) // falta ajeitar

// Rotas relacionadas a turmas
router.get("/turmas", turmaController.index)
// - falta uma rota de retornar uma turma
// - falta uma rota de retornar os alunos de uma turma
router.post("/turmas", turmaController.create)
router.put("/turmas/:id", turmaController.update)
router.delete("/turmas/:id", turmaController.delete)

// Rotas relacionadas a pagamentos
router.get("/pagamentos", pagamentosController.index ) 
router.post('/pagamentos', pagamentosController.create)
router.put('/pagamentos/:id',pagamentosController.update)
router.delete('/pagamentos/:id', pagamentosController.delete)
router.get("/pagamentos/:id", pagamentosController.show) // retornar todos os pagamentos de um aluno

// Rotas relacionadas a modulos
router.get("/modulos", modulosController.index)
router.get("/modulos/:id", modulosController.show)
router.post("/modulos", modulosController.create)
router.delete("/modulos/:id", modulosController.delete)// falta ajeitar
router.put("/modulos/:id", modulosController.update)// falta ajeitar

// Rotas relacionadas a redações
router.get("/redacoes", redacoesController.index)
router.post("/redacoes", uploadRedacoes.single("file"), redacoesController.create)
router.get("/redacoes/download/:id", redacoesController.download)

//Rotas relacionadas a propostas
router.get("/propostas", propostasController.index);
router.post("/propostas",uploadPropostas.single("file"),propostasController.create)
// - falta uma rota de deletar uma proposta

// Rotas relacionadas a correções
router.get("/correcoes", correcoesController.index)
router.post("/correcoes", uploadCorrecoes.single("file"), correcoesController.create)
router.get("/correcoes/download/:id", correcoesController.download)
// - falta uma rota que retorna somente as correções de um aluno

// Rotas relacionadas a frequencia
router.get("/frequencias", frequenciasController.index) // todas as frequencias
router.post("/frequencias", frequenciasController.create)
router.get("/frequencias/:id", frequenciasController.show)// buscar uma frequencia especifica - idFrequencia
router.put ("/frequencias/:id", frequenciasController.update)
router.delete("/frequencias/:id", frequenciasController.delete)
router.get("/frequencias/aluno/:id", frequenciasController.showByAluno) // buscar todas as frequencias de um aluno

module.exports = router