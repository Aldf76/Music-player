const mongodb = require('mongoose');

mongodb.set("strictQuery", true);

require('dotenv').config();


const connectToDatabase = async () => {


    try {
        console.log('Tentando conectar ao banco de dados...');
        console.log('Username:', process.env.MONGODB_USERNAME);
        console.log('Password:', process.env.MONGODB_PASSWORD);


        await mongodb.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.b0wg2.mongodb.net/seuBancoDeDados?retryWrites=true&w=majority&appName=Cluster0`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        

        console.log('Conexão realizada com sucesso!');
  

    } catch (error) {
        console.log('Erro ao conectar com banco:', error);
       
    }


};

module.exports = connectToDatabase;
// Exporta a função 'connectToDatabase' para que ela possa ser usada em outras partes da aplicação, como no arquivo 'index.js'.

/**
 Este módulo tem a função crítica de conectar a aplicação ao banco de dados MongoDB. 
 Ele usa as credenciais fornecidas no arquivo .env para garantir segurança e flexibilidade.
  A função assíncrona connectToDatabase tenta estabelecer a conexão e exibe no console mensagens de sucesso ou erro, dependendo do resultado. 
 Se o banco de dados não for acessível, a aplicação não poderá realizar operações de CRUD (criação, leitura, atualização, exclusão), afetando diretamente o funcionamento geral da aplicação.
 */
