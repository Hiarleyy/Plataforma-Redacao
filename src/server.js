const express = require("express")
const cors = require("cors")
const https = require("https")
const http = require("http")
const fs = require("fs")
require('dotenv').config();
const routes = require("./routes")
const path = require("path");
const errorMiddleware = require("./middlewares/error-middleware")

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://localhost:3001"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", routes);
app.use(errorMiddleware);

const HTTPS_PORT = process.env.HTTPS_PORT 
const HTTP_PORT = process.env.HTTP_PORT 
const HOST = process.env.HOST 

//Configuração SSL
//const sslOptions = {
  //cert: fs.readFileSync(path.join(__dirname, 'ssl', 'fullchain.pem')),
  //key: fs.readFileSync(path.join(__dirname, 'ssl', 'privkey.pem'))
//};

const start = () => {
  // Servidor HTTP principal (sem redirecionamento)
  const httpServer = http.createServer(app).listen(HTTP_PORT, () => {
    console.log(`Servidor HTTP rodando em: http://${HOST}:${HTTP_PORT}`)
  })
}

start()