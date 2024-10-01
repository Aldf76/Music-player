require('dotenv').config();


const port = process.env.PORT || 3000;

const express = require('express');


const path = require('path');


const app = express();


const connectToDatabase = require('./database/db');


connectToDatabase();


const Music = require('./model/Music');


let music = null;


let musicDel = null;


app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded());


app.get("/", async (req, res) => {
    const playlist = await Music.find();


    console.log(playlist);


    res.render("index", { playlist });

});

app.get("/admin", async (req, res) => {
    const playlist = await Music.find();
   

    res.render("admin", { playlist, music: null, musicDel: null });

});

app.post("/create", async (req, res) => {
    const music = req.body;
  

    await Music.create(music);


    res.redirect("/");

});

app.get("/by/:id/:action", async (req, res) => {
    const { id, action } = req.params;
   

    music = await Music.findById({ _id: id });
   

    const playlist = await Music.find();
    

    if (action == "edit") {
        res.render("admin", { playlist, music, musicDel: null });
        
    } else {
        res.render("admin", { playlist, music: null, musicDel: music });
       
    }
});

app.post("/update/:id", async (req, res) => {
    const newMusic = req.body;
    
    await Music.updateOne({ _id: req.params.id }, newMusic);
    

    res.redirect("/admin");
    
});

app.get("/delete/:id", async (req, res) => {
    await Music.deleteOne({ _id: req.params.id });
   

    res.redirect("/admin");
    
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
// Inicia o servidor na porta especificada e exibe uma mensagem no console com o link de acesso.

/**
A função principal do arquivo index.js é configurar o servidor e as rotas principais da aplicação. 

Ele lida com a lógica de CRUD (Criar, Ler, Atualizar e Deletar) das músicas em uma playlist, interage com o banco de dados MongoDB e renderiza as páginas correspondentes através de EJS.

O arquivo também configura a conexão com o banco de dados, define as variáveis de ambiente e gerencia arquivos estáticos da aplicação. 

Ele é o ponto central de controle, recebendo requisições, processando dados e enviando respostas aos usuários, tanto para a interface de usuário quanto para o painel de administração.
 */