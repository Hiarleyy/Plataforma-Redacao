const express = require("express")
const cors = require("cors")
const routes = require("./routes")
const path = require("path");
const errorMiddleware = require("./middlewares/error-middleware")

const app = express()

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json())
app.use(routes)
app.use(errorMiddleware)

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", routes); // agora POST /upload funciona

const PORT = process.env.PORT || 3000

const start = () => {
  const server = app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
  })

  server.on("error", () => console.error(`Erro ao iniciar o servidor: ${error.message}`))
}

start()