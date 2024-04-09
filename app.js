// Importa os módulos necessários
const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./models/post") // Supõe-se que este seja o modelo de dados para as postagens


// Inicia o servidor na porta 8081
app.listen(8081, function(){
    console.log("Servidor ativo!")
})


// Configura o motor de template Handlebars
app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")


// Configura o middleware para analisar solicitações com dados de formulário
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// Rota para renderizar a primeira página
app.get("/", function(req, res){
    res.render("primeira_pagina")
})


// Rota para cadastrar uma nova postagem
app.post("/cadastrar", function(req, res){
    // Cria uma nova postagem com os dados fornecidos e redireciona para a primeira página
    post.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }).then(function(){
        res.redirect("/")
    }).catch(function(erro){
        res.send("Falha ao cadastrar os dados: " + erro)
    })
})


// Rota para renderizar a página de consulta de postagens
app.get("/consulta", function(req, res){
    // Consulta todas as postagens no banco de dados e renderiza a página de consulta com os dados obtidos
    post.findAll().then(function(post){
        res.render("consulta", {post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})


// Rota para excluir uma postagem com o ID fornecido
app.get("/excluir/:id", function(req, res){
    // Exclui a postagem com o ID fornecido e redireciona para a primeira página
    post.destroy({where: {'id': req.params.id}}).then(function(){
        res.render("primeira_pagina")
    }).catch(function(erro){
        console.log("Erro ao excluir ou encontrar os dados do banco: " + erro)
    })
})


// Rota para renderizar a página de edição de uma postagem específica
app.get("/editar/:id", function(req, res){
    // Consulta a postagem com o ID fornecido e renderiza a página de edição com os dados obtidos
    post.findAll({where: {'id': req.params.id}}).then(function(post){
        res.render("editar", {post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})


// Rota para atualizar os dados de uma postagem existente
app.post("/atualizar", function(req, res){
    // Atualiza os dados da postagem com o ID fornecido e redireciona para a página de consulta
    post.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    },{
        where: {
            id: req.body.id
        }
    }).then(function(){
        res.redirect("/consulta")
    })
})