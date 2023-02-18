const express = require("express")


const viewRouter = express.Router()

viewRouter.get('/', function(req, res){
    res.render('index')
})

module.exports = viewRouter