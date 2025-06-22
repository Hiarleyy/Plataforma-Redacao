const express = require("express")
const cors = require("cors")
const https = require("https")
const fs = require("fs")
const routes = require("./routes")
const path = require("path");
const errorMiddleware = require("./middlewares/error-middleware")

const app = express()

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", routes);
app.use(errorMiddleware);

const PORT = process.env.PORT
const HOST = process.env.HOST 

// Configuração SSL
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'private.key')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.crt'))
};

const start = () => {
  const server = https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Servidor rodando em: https://${HOST}:${PORT}`)
  })

  server.on("error", (error) => console.error(`Erro ao iniciar o servidor: ${error.message}`))
}

start()