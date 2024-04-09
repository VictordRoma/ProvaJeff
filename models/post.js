// Importa o módulo responsável pela configuração do banco de dados
const db = require("./banco")

// Define o modelo de dados para a entidade "Agendamentos" utilizando o Sequelize
const Agendamentos  = db.sequelize.define('agendamentos',{
    // Define o campo "name" como uma string
    nome: {type :db.Sequelize.STRING},
    // Define o campo "telefone" como uma string
    endereco: {type :db.Sequelize.STRING},
    // Define o campo "origem" como uma string
    bairro: {type :db.Sequelize.STRING},
    // Define o campo "data_contato" como uma data sem tempo
    cep: {type :db.Sequelize.STRING},
    // Define o campo "observacao" como um texto longo
    cidade: {type :db.Sequelize.TEXT},

    estado: {type :db.Sequelize.TEXT}
})

// A linha abaixo está comentada, normalmente usada durante o desenvolvimento para sincronizar os modelos com o banco de dados
//Agendamentos.sync({force:true})

// Exporta o modelo de dados "Agendamentos" para que possa ser usado em outros módulos
module.exports= Agendamentos;