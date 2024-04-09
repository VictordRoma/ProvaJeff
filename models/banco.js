// Importa o módulo Sequelize para lidar com operações do banco de dados
const Sequelize  = require("sequelize")

// Cria uma nova instância do Sequelize com as configurações de conexão
const sequelize = new Sequelize("teste", "root", "", {
    host: "localhost", // Host do banco de dados (localhost neste caso)
    dialect: "mysql"   // Dialeto do banco de dados (MySQL neste caso)
})

// Exporta o objeto Sequelize e a conexão como um módulo para uso em outros arquivos
module.exports = {
    Sequelize: Sequelize, // Exporta a classe Sequelize
    sequelize: sequelize  // Exporta a instância do Sequelize (conexão)
}