const express = require("express");
const Router = express.Router();
// const bcrypt = require("bcrypt");
const PersonObj = require('./PersonObject');
const returns = require('../defaultReturns');
const authenticate = require('../../middlewares/authenticate');
const { user } = require("pg/lib/defaults");

////// BUSCA TODOS  NO BANCO DE DADOS //////
Router.get('/persons', authenticate, async (req, res, next) => {
    var data = [];
    try{
        const person = new PersonObj();
        data = await person.Search.All();
        res.status(200);
        res.json({
            message: returns('get', data),
            data: data
        });
    } catch(e){
        next(e)
    }
});
////// BUSCA PELO ID //////
Router.get('/persons/:idPerson', authenticate, async (req, res, next) => {
    var data;
    try{
        const idPerson = parseInt(req.params.idPerson);
        const person = new PersonObj();
        person.Validation.Id(req.params);
        data = await person.Search.Id(idPerson);
        res.status(200);
        res.json({
            message: returns('get', data),
            data: data
        });
    } catch(e){
        next(e);
    }
});


////// CRIAR  //////
Router.post('/persons', authenticate, async (req, res, next) => {
    var data;
    const {name, cpf, socialName, country, atived} = req.body;
    try {
        const person = new PersonObj();
        person.Validation.Fields(req.body);
        data = await person.Create.New(name, cpf, socialName, country, atived);
        res.status(200);
        res.json({
            message: returns('post'),
            data: data
        });
    } catch (e) {
        next(e);
    }
});

////// Editar  //////
Router.put('/persons/:idPerson', authenticate, async (req, res, next) => {
    var data;
    const {name, cpf, socialName, country, atived} = req.body;
    try {
        const idPerson = parseInt(req.params.idPerson);
        const person = new PersonObj();

        person.Validation.Id(req.params);
        person.Validation.Fields(req.body);

        await person.Update.Item(idPerson, name, cpf, socialName, country, atived);
        data = await person.Search.Id(idPerson);
        res.status(200);
        res.json({
            message: returns('update'),
            data: data
        });
    } catch (e) {
        next(e);
    }
});



module.exports = Router;