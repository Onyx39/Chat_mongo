const express = require("express")


const viewRouter = express.Router()

viewRouter.get('/', function(req, res){
    res.render('index')
})

viewRouter.get('/inscription', function(req, res){
    res.render('inscription')
})

module.exports = viewRouter