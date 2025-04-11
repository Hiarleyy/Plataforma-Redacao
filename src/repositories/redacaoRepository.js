const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");



 app.post("/upload",function(req,res){

    const storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null,"src/uploads")
        },
        filename: function(req,file,cb){
            cb(null,Date.now()+".pdf");
        }

    })
    const upload = multer({storage}).single("file");


    upload(req,res,function(err){
        if(err){
            return res.status(500).send({message: "Erro ao fazer upload"})
        }
        else if(err instanceof multer.MulterError){
            return res.status(500).send(err)
        }
        console.log(req.file.filename)
        res.status(200).send({message: "Upload feito com sucesso"})
    })

 })


 app.listen(3005,()=>{

    console.log("Servidor rodando na porta 3005")
 })