const mongoose = require('mongoose');


const musicSchema = new mongoose.Schema({ 

    
    name: {
        type: String,
        require: true,
        
    },
    
    author: {
        type: String,
        require: true,
    
    },
    
    linkImage: {
        type: String,
        require: true,
        
    },
    
    linkMusic: {
        type: String,
        require: true,
        
    }
});

module.exports = mongoose.model("Music", musicSchema);
// Exporta o modelo 'Music', baseado no 'musicSchema'. Agora, este modelo pode ser usado para criar, ler, atualizar ou deletar documentos da coleção 'Music' no MongoDB.

/**
- O arquivo do modelo define a estrutura dos dados para a coleção de músicas no banco de dados MongoDB. 
- Ele garante que cada música cadastrada terá as propriedades necessárias, como o nome da música, o autor, o link da imagem e o link da música em si, todos obrigatórios. 
- Esse esquema é essencial para garantir a consistência dos dados e a correta interação entre o servidor e o banco de dados.
- O modelo 'Music' é usado em outras partes da aplicação para realizar operações de CRUD (criação, leitura, atualização e exclusão) no banco de dados.

- ele é chamado no arquivo index.js
 */