const express = require("express")
const cors = require("cors")
const https = require("https")
const http = require("http")
const fs = require("fs")
const routes = require("./routes")
const path = require("path");
const errorMiddleware = require("./middlewares/error-middleware")

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173", // <- Adiciona o frontend Vite
    "http://localhost:3000",
    "https://localhost:3001"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", routes);
app.use(errorMiddleware);

const HTTPS_PORT = process.env.HTTPS_PORT || 3001
const HTTP_PORT = process.env.HTTP_PORT || 3000
const HOST = process.env.HOST || 'localhost'

// Configuração SSL
const sslOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'code.crt')),
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'code.key'))
};

const start = () => {
  // Servidor HTTP principal (sem redirecionamento)
  const httpServer = http.createServer(app).listen(HTTP_PORT, () => {
    console.log(`Servidor HTTP rodando em: http://${HOST}:${HTTP_PORT}`)
  })

  // Servidor HTTPS principal
  const httpsServer = https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
    console.log(`Servidor HTTPS rodando em: https://${HOST}:${HTTPS_PORT}`)
  })
  httpsServer.on("error", (error) => console.error(`Erro ao iniciar o servidor HTTPS: ${error.message}`))
  httpServer.on("error", (error) => console.error(`Erro ao iniciar o servidor HTTP: ${error.message}`))
}

start()