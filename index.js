require('dotenv').config();
// Carrega variáveis de ambiente do arquivo .env para a aplicação, como a PORT e outras configurações sensíveis.

const port = process.env.PORT || 3000;
// Define a porta na qual o servidor irá rodar. Pega do arquivo .env ou usa a porta 3000 por padrão.

//////////////////////////////////////////////////////

const express = require('express');
// Importa o framework Express, usado para configurar o servidor e manipular rotas.

const path = require('path');
// Importa o módulo path, que ajuda a trabalhar com diretórios e caminhos de arquivos de forma consistente.

const app = express();
// Inicializa o servidor Express.

/////////////////////////////////////////////////////

const connectToDatabase = require('./database/db');
// Importa a função que conecta ao banco de dados (definida no arquivo db.js).

connectToDatabase();
// Chama a função para conectar ao banco de dados.

/**
 Quando a aplicação é inicializada, essa função é executada para estabelecer a conexão com o MongoDB.
  Essa conexão é necessária para que o modelo Music (definido em Music.js) possa interagir com o banco de dados, permitindo a criação, leitura, edição e exclusão de músicas.
  O módulo de conexão atua como a camada de infraestrutura da aplicação, garantindo que o servidor tenha acesso ao banco de dados assim que o servidor for iniciado.
 */

///////////////////////////////////////////////////////

const Music = require('./model/Music');
// Importa o modelo 'Music', que será usado para interagir com a coleção no banco de dados (MongoDB no caso).

let music = null;
// Variável global para armazenar uma música selecionada, usada na edição.

let musicDel = null;
// Variável global para armazenar uma música a ser deletada.

///////////////////////////////////////////////////////

app.set("view engine", "ejs");
// Define o motor de templates como EJS, usado para renderizar páginas HTML dinâmicas.

app.use(express.static(path.join(__dirname, "public")));
// Serve arquivos estáticos (CSS, JS, imagens) da pasta "public".

app.use(express.urlencoded());
// Middleware que permite o servidor processar dados enviados via formulários no formato urlencoded (HTML forms).

////////////////////////////////////////////////////////

/*
app.get("/", (req, res) => {
    res.render("index");
})
*/
// Exemplo de rota anterior, não usada no momento, que renderizaria apenas a página 'index' sem dados.

app.get("/", async (req, res) => {
    const playlist = await Music.find();
    // Busca todas as músicas no banco de dados.

    console.log(playlist);
    // Exibe a lista de músicas no console (debugging).

    res.render("index", { playlist });
    // Renderiza a página 'index.ejs', passando a lista de músicas para ser exibida.
});

app.get("/admin", async (req, res) => {
    const playlist = await Music.find();
    // Busca todas as músicas no banco de dados.

    res.render("admin", { playlist, music: null, musicDel: null });
    // Renderiza a página 'admin.ejs' com a lista de músicas, e variáveis 'music' e 'musicDel' como null.
});

app.post("/create", async (req, res) => {
    const music = req.body;
    // Recebe os dados do formulário via POST e armazena em 'music'.

    await Music.create(music);
    // Cria um novo documento no banco de dados com os dados recebidos.

    res.redirect("/");
    // Redireciona de volta para a página principal após a criação da música.
});

app.get("/by/:id/:action", async (req, res) => {
    const { id, action } = req.params;
    // Extrai os parâmetros da URL: 'id' da música e 'action' (update ou delete).

    music = await Music.findById({ _id: id });
    // Busca uma música específica no banco de dados com base no ID.

    const playlist = await Music.find();
    // Busca todas as músicas no banco novamente.

    if (action == "edit") {
        res.render("admin", { playlist, music, musicDel: null });
        // Se a ação for "edit", renderiza o admin.ejs para edição, passando a música selecionada.
    } else {
        res.render("admin", { playlist, music: null, musicDel: music });
        // Se a ação for "delete", renderiza o admin.ejs para deletar, passando a música como 'musicDel'.
    }
});

app.post("/update/:id", async (req, res) => {
    const newMusic = req.body;
    // Recebe os dados atualizados da música via POST.

    await Music.updateOne({ _id: req.params.id }, newMusic);
    // Atualiza o documento da música no banco com os novos dados.

    res.redirect("/admin");
    // Redireciona para a página de administração após a atualização.
});

app.get("/delete/:id", async (req, res) => {
    await Music.deleteOne({ _id: req.params.id });
    // Deleta o documento da música no banco com base no ID.

    res.redirect("/admin");
    // Redireciona para a página de administração após a exclusão.
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
// Inicia o servidor na porta especificada e exibe uma mensagem no console com o link de acesso.

/**
A função principal do arquivo index.js é configurar o servidor e as rotas principais da aplicação. 

Ele lida com a lógica de CRUD (Criar, Ler, Atualizar e Deletar) das músicas em uma playlist, interage com o banco de dados MongoDB e renderiza as páginas correspondentes através de EJS.

O arquivo também configura a conexão com o banco de dados, define as variáveis de ambiente e gerencia arquivos estáticos da aplicação. 

Ele é o ponto central de controle, recebendo requisições, processando dados e enviando respostas aos usuários, tanto para a interface de usuário quanto para o painel de administração.
 */