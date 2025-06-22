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
    "https://redacaoelite.sitionossolugar.com.br",
    "http://localhost:3000",
    "https://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", routes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 443
const HTTP_PORT = process.env.HTTP_PORT || 80
const HOST = process.env.HOST

// Configuração SSL
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'private.key')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.crt'))
};

const start = () => {
  // Servidor HTTP que redireciona para HTTPS
  const httpApp = express();
  httpApp.use((req, res) => {
    const httpsUrl = `https://${req.headers.host}${req.url}`;
    res.redirect(301, httpsUrl);
  });

  // Servidor HTTPS principal
  const httpsServer = https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Servidor HTTPS rodando em: https://${HOST}:${PORT}`)
  })

  const httpServer = http.createServer(httpApp).listen(HTTP_PORT, () => {
    console.log(`Servidor HTTP rodando em: http://${HOST}:${HTTP_PORT} (redirecionando para HTTPS)`)
  })

  httpsServer.on("error", (error) => console.error(`Erro ao iniciar o servidor HTTPS: ${error.message}`))
  httpServer.on("error", (error) => console.error(`Erro ao iniciar o servidor HTTP: ${error.message}`))
}

start()