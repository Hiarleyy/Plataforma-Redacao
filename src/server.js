const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json())

const PORT = process.env.PORT || 3000

const start = () => {
  const server = app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
  })

  server.on("error", () => console.error(`Erro ao iniciar o servidor: ${error.message}`))
}

start()