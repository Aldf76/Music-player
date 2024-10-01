const mongodb = require('mongoose');
// Importa o mongoose, que é utilizado para conectar e interagir com o banco de dados MongoDB.

mongodb.set("strictQuery", true);
// Configura o mongoose para usar a verificação estrita de consultas. Isso é uma recomendação de boas práticas para evitar erros em futuras versões.

require('dotenv').config();
// Carrega as variáveis de ambiente do arquivo .env, como o nome de usuário e a senha para conectar ao banco de dados.

const connectToDatabase = async () => {
    // Define uma função assíncrona que faz a conexão com o banco de dados MongoDB.

    try {
        console.log('Tentando conectar ao banco de dados...');
        console.log('Username:', process.env.MONGODB_USERNAME);
        console.log('Password:', process.env.MONGODB_PASSWORD);
        // Exibe no console o processo de conexão, incluindo o nome de usuário e a senha (geralmente você não deve exibir a senha em logs).

        await mongodb.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.b0wg2.mongodb.net/seuBancoDeDados?retryWrites=true&w=majority&appName=Cluster0`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        // Faz a conexão com o MongoDB usando as credenciais fornecidas nas variáveis de ambiente. Usa os parâmetros 'useNewUrlParser' e 'useUnifiedTopology' para evitar problemas de compatibilidade.

        console.log('Conexão realizada com sucesso!');
        // Exibe uma mensagem de sucesso no console caso a conexão seja bem-sucedida.

    } catch (error) {
        console.log('Erro ao conectar com banco:', error);
        // Caso haja um erro durante a conexão, exibe uma mensagem de erro no console.
    }

    // O trecho comentado abaixo é uma abordagem anterior para lidar com a conexão e erros:
    // .then(() => console.log('Mongo bd Conectato!')).catch((error) => console.error(error));
};

module.exports = connectToDatabase;
// Exporta a função 'connectToDatabase' para que ela possa ser usada em outras partes da aplicação, como no arquivo 'index.js'.

/**
 Este módulo tem a função crítica de conectar a aplicação ao banco de dados MongoDB. 
 Ele usa as credenciais fornecidas no arquivo .env para garantir segurança e flexibilidade.
  A função assíncrona connectToDatabase tenta estabelecer a conexão e exibe no console mensagens de sucesso ou erro, dependendo do resultado. 
 Se o banco de dados não for acessível, a aplicação não poderá realizar operações de CRUD (criação, leitura, atualização, exclusão), afetando diretamente o funcionamento geral da aplicação.
 */
